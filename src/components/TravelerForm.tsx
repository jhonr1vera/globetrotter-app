import dayjs from "dayjs";
import { Traveler } from "../app/types";
import { GeneralText } from "@/constants/text";

interface TravelerFormProps {
  traveler: Traveler;
  index: number;
  handleTravelerChange: (index: number, field: keyof Traveler, value: string) => void;
  documentTypes: string[];
}

export default function TravelerForm({
  traveler,
  index,
  handleTravelerChange,
  documentTypes
}: TravelerFormProps) {

  const maxDate = dayjs().subtract(5, 'year').format("YYYY-MM-DD");
  
  return (
    <div className="flex flex-col p-5 border border-border rounded-md gap-3">
      <h3 className="font-semibold text-lg">Viajero {index + 1}</h3>

      <div className="flex flex-col">
        <label
          htmlFor={`travelerName-${index}`}
          className="text-sm mb-1"
        >
          {GeneralText.label.travelerName}
        </label>
        <input
          type="text"
          id={`travelerName-${index}`}
          className="border-1 rounded-sm p-2 border-border w-full"
          placeholder="Ingrese el nombre completo"
          value={traveler.completeName}
          onChange={(e) =>
            handleTravelerChange(
              index,
              "completeName",
              e.target.value
            )
          }
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor={`travelerBirth-${index}`}
          className="text-sm mb-1"
        >
          {GeneralText.label.travelerDateBirth}
        </label>
        <input
          type="date"
          id={`travelerBirth-${index}`}
          className="border-1 rounded-sm p-2 border-border w-full"
          value={traveler.dateBirth}
          max={maxDate}
          onChange={(e) =>
            handleTravelerChange(index, "dateBirth", e.target.value)
          }
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor={`travelerDoc-${index}`}
          className="text-sm mb-1"
        >
         {GeneralText.label.travelerDocumentId}
        </label>
        <div className="flex gap-0.5">
          <select 
            name="documentType" 
            id={`documentType-${index}`}
            value={traveler.documentType || "V"}
            className="border border-border rounded-sm w-12" 
            onChange={(e) =>
              handleTravelerChange(
                index,
                "documentType",
                e.target.value
              )}
          >
            {documentTypes.map((type: string, idx) => {
              return (
                <option key={idx} value={type}>{type}</option>
              );
            })}
          </select>
          <input
            type="number"
            id={`travelerDoc-${index}`}
            className="border-1 rounded-sm p-2 border-border w-full"
            placeholder="00000000"
            value={traveler.documentationId}
            onChange={(e) =>
              handleTravelerChange(
                index,
                "documentationId",
                e.target.value
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
