import { query, startAfter, limitToFirst, orderByKey, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "./utils";
import HotelCard from "./components/HotelCard";
import type { IHotelData } from "./types";

const limit = 5;

function App() {
  const [hotels, setHotels] = useState<IHotelData[]>([]);

  const loadHotels = () => {
    const hotelsQuery = query(ref(db, "hotels"), limitToFirst(limit), orderByKey());

    onValue(hotelsQuery, snapshot => {
      if (snapshot.exists()) {
        setHotels(Object.values(snapshot.val()));
      }
    });
  };

  useEffect(() => {
    loadHotels();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      <section className="flex flex-col gap-6">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} data={hotel} />
        ))}
      </section>
    </main>
  );
}

export default App;
