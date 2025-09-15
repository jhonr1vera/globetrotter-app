"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  FlightTypeFetch,
  FlightTypeSchedule,
  Traveler,
  section,
} from "../app/types";
import DestinationComponent from "./DestinationComponent";
import DetailsComponent from "./DetailsComponent";
import ServicesComponent from "./ServicesComponent";
import SummaryComponent from "./SummaryComponent";
import { GeneralText } from "@/constants/text";

const documentTypes = ["V", "E", "J", "P"];

interface FlightBookingProps {
  initialFlightData: FlightTypeFetch[];
}

export default function FlightBooking({
  initialFlightData,
}: FlightBookingProps) {
  const [currentSection, setCurrentSection] = useState<section>("destination");
  const [flightData, setFlightData] =
    useState<FlightTypeFetch[]>(initialFlightData);
  
  const initialTraveler: Traveler = {
    completeName: "",
    dateBirth: "",
    documentationId: "",
    documentType: "V",
  };

  const [travelers, setTravelers] = useState<Traveler[]>([initialTraveler]);

  const [flight, setFlight] = useState<FlightTypeSchedule>({
    destination: "",
    class: "",
    priceUsd: 0,
    departureDate: "",
    returnDate: "",
    specialAssistance: false,
    specialAssistanceDetails: "",
    preferentialSeating: false,
    travelInsurance: false,
    travelersQuantity: 1,
    travelersData: [initialTraveler],
  });

  const destinations = useMemo(
    () =>
      new Set(flightData.map((flight: FlightTypeFetch) => flight.destination)),
    [flightData]
  );

  const filteredDestinations = useMemo(
    () =>
      flightData.filter(
        (flightFilter: FlightTypeFetch) =>
          flightFilter.destination === flight.destination
      ),
    [flightData, flight.destination]
  );

  const calculateFlightPrice = useCallback((): number | undefined => {
    const filteredFlight = filteredDestinations.find(
      (flightItem: FlightTypeFetch) => flightItem.class === flight.class
    );

    if (filteredFlight) {
      return filteredFlight.priceUSD * flight.travelersQuantity;
        // return filteredFlight.priceUSD
    }
    return undefined;
  }, [filteredDestinations, flight.class, flight.travelersQuantity]);

  const handleToggle = (service: keyof FlightTypeSchedule) => {
    setFlight({
      ...flight,
      [service]: !flight[service],
    });
  };

  const handleTravelerChange = (
    index: number,
    field: keyof Traveler,
    value: string
  ) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index] = {
      ...updatedTravelers[index],
      [field]: value,
    };
    setTravelers(updatedTravelers);
    setFlight({
      ...flight,
      travelersData: updatedTravelers,
    });
  };

  const handleTravelersQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value === "") {
      setFlight({ ...flight, travelersQuantity: 0 });
      setTravelers([]);
      return;
    }

    const quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 1 || quantity > 10) return;

    if (quantity > travelers.length) {
      const newTravelers = [...travelers];
      while (newTravelers.length < quantity) {
        newTravelers.push({
          completeName: "",
          dateBirth: "",
          documentationId: "",
          documentType: "V",
        });
      }
      setTravelers(newTravelers);
      setFlight({ 
        ...flight, 
        travelersQuantity: quantity,
        travelersData: newTravelers
      });
    } else if (quantity < travelers.length) {
      const reducedTravelers = travelers.slice(0, quantity);
      setTravelers(reducedTravelers);
      setFlight({ 
        ...flight, 
        travelersQuantity: quantity,
        travelersData: reducedTravelers
      });
    } else {
      setFlight({ ...flight, travelersQuantity: quantity });
    }
  };

  useEffect(() => {
    if (travelers.length === 0 && flight.travelersQuantity > 0) {
      const newTravelers = Array(flight.travelersQuantity)
        .fill(null)
        .map(() => ({
          completeName: "",
          dateBirth: "",
          documentationId: "",
          documentType: "V",
        }));
      setTravelers(newTravelers);
      setFlight({
        ...flight,
        travelersData: newTravelers
      });
    }
  }, [travelers.length, flight.travelersQuantity]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const validateTravelersData = () => {
    if (travelers.length === 0) return false;
    for (const traveler of travelers) {
      if (
        !traveler.completeName ||
        !traveler.dateBirth ||
        !traveler.documentationId
      ) {
        return false;
      }
    }
    return true;
  };

  const validateDestinationDetails = () => {
    return !(
      !flight.departureDate ||
      !flight.returnDate ||
      !flight.class ||
      !flight.destination
    );
  };

  const renderSection = () => {
    switch (currentSection) {
      case "destination":
        return (
          <DestinationComponent
            flight={flight}
            flightData={flightData}
            handleChange={handleChange}
            validateDestinationDetails={validateDestinationDetails}
            setCurrentSection={setCurrentSection}
            calculateFlightPrice={calculateFlightPrice}
          />
        );

      case "details":
        return (
          <DetailsComponent
            travelers={travelers}
            flight={flight}
            handleTravelerChange={handleTravelerChange}
            handleTravelersQuantityChange={handleTravelersQuantityChange}
            validateTravelersData={validateTravelersData}
            setCurrentSection={setCurrentSection}
            documentTypes={documentTypes}
          />
        );

      case "services":
        return (
          <ServicesComponent
            flight={flight}
            handleToggle={handleToggle}
            handleChange={handleChange}
            setCurrentSection={setCurrentSection}
          />
        );

      case "summary":
        return (
          <SummaryComponent
            flight={flight}
            calculateFlightPrice={calculateFlightPrice}
            setCurrentSection={setCurrentSection}
          />
        );
    }
  };

  return (
  <div className="font-sans flex flex-col min-h-screen">
    <main className="flex-1 flex flex-col items-center p-8 gap-10">
      <p className="text-2xl font-bold text-center">
        {GeneralText.title.mainTitle}
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="w-full flex justify-center">
        {renderSection()}
      </form>
    </main>

    <footer className="shrink-0 flex flex-col gap-2 items-center justify-center text-center py-6 text-gray-600">
      <p>{GeneralText.company.made} <strong className="text-gray-800">{GeneralText.company.madeBy}</strong></p>
      <p>{GeneralText.company.to} <strong className="text-gray-800">{GeneralText.company.nameTest}</strong> 🌄</p>
    </footer>
  </div>
);
}
