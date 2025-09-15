"use client";
import { useState } from "react";
import { FlightTypeSchedule, section, Traveler } from "../app/types"
import MessageModal from "./MessageModal";
import { GeneralText } from "@/constants/text";
import dayjs from "dayjs";

interface SummaryComponentProps {
  flight: FlightTypeSchedule;
  setCurrentSection: (section: section) => void;
  calculateFlightPrice?: () => number | undefined;
}

export default function SummaryComponent({ 
  flight, 
  setCurrentSection,
  calculateFlightPrice 
}: SummaryComponentProps) {
const [alertModalOpen, setAlertModalOpen] = useState(false)

const calculateAge = (birthDate: string) => {
    if (!birthDate) return "N/A";
    const today = dayjs();
    const birth = dayjs(birthDate);
    if (birth.isAfter(today)) return "Fecha no válida";
    const years = today.diff(birth, 'year');
    const months = today.diff(birth.add(years, 'year'), 'month');
    const days = today.diff(birth.add(years, 'year').add(months, 'month'), 'day');
    if (years > 0) {
      if (months > 0) {
        return `${years} ${years === 1 ? 'año' : 'años'} y ${months} ${months === 1 ? 'mes' : 'meses'}`;
      } else {
        return `${years} ${years === 1 ? 'año' : 'años'}`;
      }
    } else if (months > 0) {
      if (days > 0) {
        return `${months} ${months === 1 ? 'mes' : 'meses'} y ${days} ${days === 1 ? 'día' : 'días'}`;
      } else {
        return `${months} ${months === 1 ? 'mes' : 'meses'}`;
      }
    } else {
      return `${days} ${days === 1 ? 'día' : 'días'}`;
    }
  };

const openAlertModal = () => {
   setAlertModalOpen(true)
}

    return (
        <div className="flex flex-col gap-4 rounded-xl shadow-2xl py-6 px-7 w-80 md:w-150 max-h-[72vh] overflow-y-auto border border-border bg-white">
            <div className="flex justify-center">
              <h1 className="text-xl font-bold text-center ">{GeneralText.title.summaryTitle}</h1>
            </div>
            <div className="flex justify-center gap-3 mb-4 items-end">
              <div className="rounded-full bg-secondary h-8 w-8 flex justify-center items-center">
                <p className="font-bold text-white text-sm">1</p>
              </div>
              <div className="rounded-full bg-secondary h-8 w-8 flex justify-center items-center">
                <p className="font-bold text-white text-sm">2</p>
              </div>
              <div className="rounded-full bg-secondary h-8 w-8 flex justify-center items-center">
                <p className="font-bold text-white text-sm">3</p>
              </div>
              <div className="rounded-full bg-primary h-10 w-10 flex justify-center items-center">
                <p className="font-bold text-white text-sm">4</p>
              </div>     
            </div>
            
            <div className="space-y-3">
              <p ><span className="font-semibold">{GeneralText.label.destination}</span> {flight.destination}</p>
              <p ><span className="font-semibold">{GeneralText.label.departureDate}</span> {dayjs(flight.departureDate).format('DD/MM/YY')}</p>
              <p ><span className="font-semibold">{GeneralText.label.returnDate}</span> {dayjs(flight.returnDate).format('DD/MM/YY')}</p>
              <p ><span className="font-semibold">{GeneralText.label.travelersQuantityIndication}</span> {flight.travelersQuantity}</p>
              <p ><span className="font-semibold">{GeneralText.label.flightClass}</span> {flight.class}</p>
            </div>

            <div className="space-y-3">
              {flight.travelersData.map((traveler: Traveler, index) => {
                return (
                  <div key={index} className="border border-gray-200 p-4 text-sm md:text-base rounded-lg shadow-sm bg-gray-50">
                    <p className="font-medium  mb-2">{GeneralText.label.traveler} {index + 1}: <span className="font-normal">{traveler.completeName}</span></p>
                    <p>
                      <span className="font-medium">Edad:</span> 
                      {traveler.dateBirth && ` ${calculateAge(traveler.dateBirth)}`}
                    </p>
                    <p>
                      <span className="font-medium">{GeneralText.label.travelerDateBirth}</span> {dayjs(traveler.dateBirth).format('DD/MM/YY')}
                    </p>
                    <p ><span className="font-medium">{GeneralText.label.travelerDocumentId}</span> {traveler.documentType} - {traveler.documentationId}</p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 pt-2">
              <p >
                <span className="font-semibold">{GeneralText.label.insuranceIndication}</span>{" "}
                {flight.travelInsurance ? (
                  <span className="text-green-600">{GeneralText.status.apply}</span>
                ) : (
                  <span className="text-red-600">{GeneralText.status.dontApply}</span>
                )}
              </p>
              <p >
                <span className="font-semibold">{GeneralText.label.preferentialSeatingIndication}</span>{" "}
                {flight.preferentialSeating ? (
                  <span className="text-green-600">{GeneralText.status.apply}</span>
                ) : (
                  <span className="text-red-600">{GeneralText.status.dontApply}</span>
                )}
              </p>
              <p >
                <span className="font-semibold">{GeneralText.label.specialAssistanceIndication}</span>{" "}
                {flight.specialAssistance ? (
                  <span className="text-green-600">{GeneralText.status.apply}</span>
                ) : (
                  <span className="text-red-600">{GeneralText.status.dontApply}</span>
                )}
              </p>
            </div>

            {flight.specialAssistance && flight.specialAssistanceDetails && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p >
                  <span className="font-semibold">{GeneralText.label.specialAssistanceDetails}</span>{" "}
                  {flight.specialAssistanceDetails}
                </p>
              </div>
            )}
            
            {calculateFlightPrice && (
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <p className="font-bold text-lg ">
                  {GeneralText.label.flightCost}{" "}
                  <span className="text-primary">
                    {calculateFlightPrice() ?? GeneralText.status.notSpecified}
                  </span>
                </p>
              </div>
            )}
            
            <div className="flex gap-4 justify-center mt-4 w-full sticky bottom-0 bg-white py-4 translate-y-[25px] border-gray-200">
              <button
                className="bg-secondary hover:bg-secondary-hover text-white px-6 py-2 rounded-md transition-colors duration-200"
                onClick={() => setCurrentSection("services")}
              >
                {GeneralText.buttons.back}
              </button>
              <button
                className="bg-success hover:bg-success-hover text-white px-6 py-2 rounded-md transition-colors duration-200"
                onClick={openAlertModal}
              >
                {GeneralText.buttons.confirmation}
              </button>
            </div>
            
            {alertModalOpen && (
              <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(51,51,51,0.24)] z-50">
                <MessageModal
                  message={GeneralText.status.successFlight}
                  buttonColor="bg-red-500"
                  buttonMessage={GeneralText.buttons.exit}
                />
              </div>
            )}
          </div>
    )
}
