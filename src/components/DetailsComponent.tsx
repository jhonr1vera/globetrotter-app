import { GeneralText } from "@/constants/text";
import { Traveler, section } from "../app/types";
import TravelerForm from "./TravelerForm";

interface DetailsSectionProps {
  travelers: Traveler[];
  flight: {
    travelersQuantity: number;
  };
  handleTravelerChange: (index: number, field: keyof Traveler, value: string) => void;
  handleTravelersQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateTravelersData: () => boolean;
   setCurrentSection: (section: section) => void;
  documentTypes: string[];
}

export default function DetailsComponent({
  travelers,
  flight,
  handleTravelerChange,
  handleTravelersQuantityChange,
  validateTravelersData,
  setCurrentSection,
  documentTypes
}: DetailsSectionProps) {

  const handleStepperChange = (newValue: number) => {
    if (newValue < 1 || newValue > 10) return;
    
    const syntheticEvent = {
      target: {
        value: newValue.toString(),
        name: "travelersQuantity"
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleTravelersQuantityChange(syntheticEvent);
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl shadow-2xl py-10 px-4 max-h-[67vh] md:max-h-[72vh] overflow-y-auto w-80 md:w-150 border border-border">
      <div className="flex justify-center">
        <div >

        </div>
        <h1 className="text-xl font-bold text-center">{GeneralText.title.detailsTitle}</h1>
      </div>
      <div className="flex justify-center gap-3 items-end">
        <div className="rounded-full bg-secondary h-8 w-8 justify-center items-center"><p className="flex justify-center items-center mt-1 font-bold text-white">1</p></div>
        <div className="rounded-full bg-primary h-10 w-10 justify-center items-center"><p className="flex justify-center items-center mt-2 font-bold text-white">2</p></div>
        <div className="rounded-full bg-secondary h-8 w-8 justify-center items-center"><p className="flex justify-center items-center mt-1 font-bold text-white">3</p></div>
        <div className="rounded-full bg-secondary h-8 w-8 justify-center items-center"><p className="flex justify-center items-center mt-1 font-bold text-white">4</p></div>     
      </div>

      <div className="flex flex-col items-center gap-2 mb-4">
        <label htmlFor="travelersQuantity" className="font-medium">
          {GeneralText.label.travelersQuantity}
        </label>
        <div className="flex items-center gap-3">
          <button 
            className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-40"
            onClick={() => handleStepperChange(flight.travelersQuantity - 1)}
            disabled={flight.travelersQuantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            name="travelersQuantity"
            className="border-1 rounded-sm p-2 border-border w-20 text-center"
            min={1}
            max={10}
            value={flight.travelersQuantity === 0 ? "" : flight.travelersQuantity}
            onChange={handleTravelersQuantityChange}
          />
          <button 
            className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-40"
            onClick={() => handleStepperChange(flight.travelersQuantity + 1)}
            disabled={flight.travelersQuantity >= 10}
          >
            +
          </button>
        </div>
      </div>

      <div className="grid gap-5">
        {travelers.map((traveler, index) => (
          <TravelerForm
            key={index}
            traveler={traveler}
            index={index}
            handleTravelerChange={handleTravelerChange}
            documentTypes={documentTypes}
          />
        ))}
      </div>

      <div className="flex gap-5 justify-center mt-4 sticky bottom-0 bg-white translate-y-[70%] py-4 ">
        <button
          type="button"
          className="bg-secondary hover:bg-secondary-hover text-white px-4 py-1.5 rounded-md"
          onClick={() => setCurrentSection("destination")}
        >
          {GeneralText.buttons
          .back}
        </button>
        <button
          type="button"
          className="bg-primary hover:bg-primary-hover text-white px-4 disabled:bg-disabled py-1.5 rounded-md"
          onClick={() => setCurrentSection("services")}
          disabled={!validateTravelersData()}
        >
          {GeneralText.buttons
          .next}
        </button>
      </div>
    </div>
  );
}