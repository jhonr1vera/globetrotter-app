import { GeneralText } from "@/constants/text";
import { FlightTypeSchedule } from "../app/types";
import ToggleSwitch from "./ToggleSwitch";

interface ServicesComponentProps {
  flight: FlightTypeSchedule
  handleToggle: (service: 'travelInsurance' | 'preferentialSeating' | 'specialAssistance') => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setCurrentSection: (section: 'details' | 'summary') => void;
}

export default function ServicesComponent({
  flight,
  handleToggle,
  handleChange,
  setCurrentSection
}: ServicesComponentProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl shadow-2xl py-10 px-7 w-80 md:w-150 border border-border">
      <div className="flex justify-center">
        <h1 className="text-xl font-bold text-center">{GeneralText.title.servicesTitle}</h1>
      </div>
      <div className="flex justify-center gap-3 items-end">
        <div className="rounded-full bg-secondary h-8 w-8 justify-center items-center"><p className="flex justify-center items-center mt-1 font-bold text-white">1</p></div>
        <div className="rounded-full bg-secondary h-8 w-8 justify-center items-center"><p className="flex justify-center items-center mt-1 font-bold text-white">2</p></div>
        <div className="rounded-full bg-primary h-10 w-10 justify-center items-center"><p className="flex justify-center items-center mt-2 font-bold text-white">3</p></div>
        <div className="rounded-full bg-secondary h-8 w-8 justify-center items-center"><p className="flex justify-center items-center mt-1 font-bold text-white">4</p></div>     
      </div>
      
      <ToggleSwitch
        id="travelInsuranceId"
        checked={flight.travelInsurance}
        onChange={() => handleToggle("travelInsurance")}
        label={GeneralText.label.insurance}
        customWidth="w-12"
      />
      
      <ToggleSwitch
        id="preferentialSeatingId"
        checked={flight.preferentialSeating}
        onChange={() => handleToggle("preferentialSeating")}
        label={GeneralText.label.preferentialSeating}
        customWidth="w-16"
      />
      
      <ToggleSwitch
        id="specialAssistanceId"
        checked={flight.specialAssistance}
        onChange={() => handleToggle("specialAssistance")}
        label={GeneralText.label.specialAssistance}
        customWidth="w-11.5"
      />
      
      {flight.specialAssistance && (
        <textarea
          className="border border-border p-3 min-h-13 rounded-md resize-y align-top w-full"
          placeholder={GeneralText.placeholder.specialAssistance}
          rows={3}
          name="specialAssistanceDetails"
          onChange={handleChange}
          value={flight.specialAssistanceDetails}
          wrap="hard"
        />
      )}
      
      <div className="flex gap-5 justify-center mt-4">
        <button
          className="bg-secondary hover:bg-secondary-hover text-white px-4 py-1.5 rounded-md"
          onClick={() => setCurrentSection("details")}
        >
          {GeneralText.buttons.back}
        </button>
        <button
          className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded-md"
          onClick={() => setCurrentSection("summary")}
        >
          {GeneralText.buttons.next}
        </button>
      </div>
    </div>
  );
}