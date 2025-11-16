import { query, startAfter, limitToFirst, orderByKey, onValue, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { db } from "./utils";
import HotelCard from "./components/HotelCard";
import type { IHotelData } from "./types";

const limit = 5;

function App() {
  const [hotels, setHotels] = useState<IHotelData[]>([]);
  const [lastItemKey, setLastItemKey] = useState<string | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const loadHotels = (after?: string) => {
    const queryConstraints = [limitToFirst(limit), orderByKey()];

    if (after) {
      queryConstraints.push(startAfter(after));
    }

    const hotelsQuery = query(ref(db, "hotels"), ...queryConstraints);
    onValue(hotelsQuery, snapshot => {
      if (snapshot.exists()) {
        const hotelsKey = Object.keys(snapshot.val())
        setLastItemKey(hotelsKey[hotelsKey.length - 1]);

        const hotelsData = Object.values(snapshot.val()) as IHotelData[]; //type assertion
        setHotels(prev => after ? [...prev, ...hotelsData] : [...hotelsData]); // spread operator
      }
    });
  };

  useEffect(() => {
    loadHotels();
  }, []);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const first = entries[0];

      // Jika masih ada halaman selanjutnya
      if(first.isIntersecting && lastItemKey) {
        loadHotels(lastItemKey);
      }
    }

    const options: IntersectionObserverInit = {threshold: 0.1};

    const observer = new IntersectionObserver(callback, options);

    const loadingRefCurrent = loadingRef.current;
    if(loadingRefCurrent){
      observer.observe(loadingRefCurrent);
    }

    return () => {
      if(loadingRefCurrent){
        observer.unobserve(loadingRefCurrent);
      }
    }
  }, [lastItemKey]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      <section className="flex flex-col gap-6">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} data={hotel} />
        ))}

        <div ref={loadingRef}>Loading</div>
      </section>
    </main>
  );
}

export default App;
