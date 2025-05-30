// src/components/venue/VenueInformation.tsx
import type { Venue } from "@/store/api/venueApi"; // Import Venue from venueApi
import { Phone, Users, DollarSign } from "lucide-react";

interface VenueInformationProps {
  venue: Venue;
}

const VenueInformation: React.FC<VenueInformationProps> = ({ venue }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Asosiy ma'lumotlar
      </h2>
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Users size={20} className="mr-3 text-purple-600" />
          <span>
            Sig'imi: <strong>{venue.capacity} kishi</strong>
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign size={20} className="mr-3 text-purple-600" />
          <span>
            Narxi (1 kishi uchun):{" "}
            <strong>{venue.pricePerSeat.toLocaleString()} so'm</strong>
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone size={20} className="mr-3 text-purple-600" />
          <span>
            Telefon:{" "}
            <a
              href={`tel:${venue.phone}`}
              className="text-purple-600 hover:underline"
            >
              {venue.phone}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default VenueInformation;
