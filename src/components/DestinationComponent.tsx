"use client"
import { FlightTypeFetch, FlightTypeSchedule, section } from "../app/types";
import { GeneralText } from "@/constants/text";
import MessageModal from "./MessageModal";
import dayjs from "dayjs";
import { useState } from "react";

interface DestinationSectionProps {
  flight: FlightTypeSchedule;
  flightData: FlightTypeFetch[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  validateDestinationDetails: () => boolean;
  setCurrentSection: (section: section) => void;
  calculateFlightPrice: () => number | undefined;
}

export default function DestinationComponent({
  flight,
  flightData,
  handleChange,
  validateDestinationDetails,
  setCurrentSection,
  calculateFlightPrice
}: DestinationSectionProps) {
const [alertModalOpen, setAlertModalOpen] = useState(false)


const openAlertModal = () => {
   setAlertModalOpen(true)
}

const closeAlertModal = () => {
   setAlertModalOpen(false)
}

  const validateFieldsDetails = () => {

    if (
      flight.destination !== "Madrid" &&
      flight.destination !== "New York"  &&
      flight.destination !== "Buenos Aires"  
    ) {
      openAlertModal()
      return false
    }

    return true
  };

  const handleNextSection = () => {
    if (!validateDestinationDetails()) {
      alert("Por favor, completa todos los campos requeridos");
      return;
    }
    
    if (!validateFieldsDetails()) {
      return;
    }
    
    setCurrentSection("details");
  };

  const destinations = new Set(flightData.map((flight: FlightTypeFetch) => flight.destination));
  const filteredDestinations = flightData.filter(
    (flightFilter: FlightTypeFetch) => flightFilter.destination === flight.destination
  );

  return (
    <div className="flex flex-col gap-3 rounded-xl shadow-2xl py-10 px-7 w-80 md:w-150 border border-border">
      <div className="flex justify-center">
        <h1 className="text-xl font-bold text-center">{GeneralText.title.destinationTitle}</h1>
      </div>
      <div className="flex justify-center gap-3 items-end">
        <div className="rounded-full bg-primary h-10 w-10 justify-center items-center"><p className="flex justify-center items-center mt-2 font-bold text-white">1</p></div>
        <div className="rounded-full bg-secondary h-8 w-8 justify-center items-center"><p className="flex justify-center items-center mt-1 font-bold text-white">2</p></div>
        <div className="rounded-full bg-secondary h-8 w-8 justify-center items-center"><p className="flex justify-center items-center mt-1 font-bold text-white">3</p></div>
        <div className="rounded-full bg-secondary h-8 w-8 justify-center items-center"><p className="flex justify-center items-center mt-1 font-bold text-white">4</p></div>     
      </div>
      <div className="flex flex-col">
        <label htmlFor="destinationInput">{GeneralText.label.destination}</label>
        <input
          list="destinationList"
          id="destinationInput"
          name="destination"
          value={flight.destination}
          onChange={handleChange}
          className={`border-1 rounded-sm p-2`}
          placeholder={GeneralText.placeholder.selectDestination}
        />
        <datalist id="destinationList">
          {[...destinations].map((destination, index) => (
            <option key={index} value={destination} />
          ))}
        </datalist>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="departureDateId">{GeneralText.label.departureDate}</label>
          <input
            type="date"
            id="departureDateId"
            name="departureDate"
            className="border-1 rounded-sm p-2 border-border"
            onChange={handleChange}
            value={flight.departureDate}
            min={dayjs().format("YYYY-MM-DD")}
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="returnDateId">{GeneralText.label.returnDate}</label>
          <input
            type="date"
            id="returnDateId"
            name="returnDate"
            className="border-1 rounded-sm p-2 border-border"
            onChange={handleChange}
            value={flight.returnDate}
            min={dayjs().format("YYYY-MM-DD")}
          />
        </div>
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="flightClassId">{GeneralText.label.flightClass}</label>
        <select
          name="class"
          className="border-1 rounded-sm p-2 border-border"
          id="flightClassId"
          onChange={handleChange}
          value={flight.class}
        >
          {
  flight.destination !== "Madrid" && 
  flight.destination !== "New York" && 
  flight.destination !== "Buenos Aires" &&
  flight.destination !== ""
    ? <option value="">{GeneralText.validation.selectDestinationValid}</option>
    : <option value="">{GeneralText.placeholder.selectClass}</option>
}
          {flight.destination ? (
            filteredDestinations.map((flightItem: FlightTypeFetch, index) => (
              <option key={index} value={flightItem.class}>
                {flightItem.class}
              </option>
            ))
          ) : (
            <option value="">{GeneralText.placeholder.selectDestinationFirst}</option>
          )}
        </select>
      </div>
      
      <div>
        <label htmlFor="priceUsdId">{GeneralText.label.price}</label>
        <input
          type="text"
          name="priceUSD"
          id="priceUsdId"
          value={calculateFlightPrice() ? calculateFlightPrice() : "Aún no asignado"}
          disabled
          className="border-1 rounded-sm p-2 border-border w-full text-secondary"
        />
      </div>
      
      <div className="flex gap-5 justify-center mt-4">
        <button
          className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded-md disabled:bg-disabled"
          onClick={handleNextSection}
          disabled={!validateDestinationDetails()}
          
        >
          {GeneralText.buttons.next}
        </button>
      </div>
      {alertModalOpen && (
              <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(51,51,51,0.24)] z-50">
                    <MessageModal
                      buttonColor="bg-secondary"
                      buttonMessage={GeneralText.buttons.back}
                      message={GeneralText.validation.destination}
                      closeFunction={closeAlertModal}
                    />
              </div>
            )}
    </div>
  );
}