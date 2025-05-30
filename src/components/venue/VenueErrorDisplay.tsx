/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/venue/VenueErrorDisplay.tsx
interface VenueErrorDisplayProps {
  error: any; // Consider defining a more specific error type
}

const VenueErrorDisplay: React.FC<VenueErrorDisplayProps> = ({ error }) => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Xatolik</h1>
      <p className="text-red-500">
        To'yxona ma'lumotlarini yuklashda xatolik yuz berdi yoki bunday to'yxona
        topilmadi.
      </p>
      {error && (
        <pre className="mt-4 text-left bg-red-100 p-4 rounded text-xs">
          {JSON.stringify(error, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default VenueErrorDisplay;
