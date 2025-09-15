type FlightTypeFetch = {
  destination: string;
  class: string;
  priceUSD: number;
};

type Traveler = {
  completeName: string;
  dateBirth: string;
  documentationId: string;
  documentType: string;
};

type FlightTypeSchedule = {
  destination: string;
  class: string;
  priceUsd: number;
  departureDate: string;
  returnDate: string;
  specialAssistance: boolean;
  specialAssistanceDetails?: string;
  preferentialSeating: boolean;
  travelInsurance: boolean;
  travelersQuantity: number;
  travelersData: Traveler[];
};

type section = "destination" | "details" | "services" | "summary";

export type { FlightTypeFetch, FlightTypeSchedule, Traveler, section}