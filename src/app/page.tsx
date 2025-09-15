import FlightBooking from "../components/FlightBooking.client";

async function getFlightData() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json', {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new Error('Hubo un error al fetchear la informacion');
    }
    
    return res.json();
  } catch (error) {
    console.error('Hubo un error al fetchear la informacion:', error);
    return [];
  }
}

export default async function Home() {
  const flightData = await getFlightData();
  
  return <FlightBooking initialFlightData={flightData} />;
}