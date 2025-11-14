import { Heart, Star } from "lucide-react";
import type { IHotelData } from "../types";
import { useState } from "react";

interface IHotelCardProps {
  data: IHotelData;
}

const formatDate = (s: string, e: string) => {
  const start = new Date(s);
  const end = new Date(e);

  const startMonth = start.toLocaleString("en-US", { month: "short" });
  const endMonth = end.toLocaleString("en-US", { month: "short" });

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}`;
  }

  if (startYear === endYear) {
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}`;
  }

  return `${startMonth} ${start.getDate()}, ${startYear} - ${endMonth} ${end.getDate()}, ${endYear}`;
};

const HotelCard = ({ data }: IHotelCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <div className="mb-4 relative">
        <img className="h-[310px] w-full object-cover rounded-xl" src={data.imageUrl} />
        <button className="absolute top-3 right-3" onClick={handleClick}>
          <Heart className="text-white" fill={isLiked ? "white" : "gray"} />
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="font-semibold">{data.location}</div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5" />
            <span>
              {data.rating} ({data.reviews})
            </span>
          </div>
        </div>
        <div className="mb-1 text-sm text-gray-400">{data.distance} kilometers</div>
        <div className="mb-2 text-sm text-gray-400">{formatDate(data.availableDates.start, data.availableDates.end)}</div>
        <div className="font-semibold">${data.pricePerNight} night</div>
      </div>
    </div>
  );
};

export default HotelCard;
