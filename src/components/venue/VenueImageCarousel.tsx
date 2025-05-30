// src/components/venue/VenueImageCarousel.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface VenueImageCarouselProps {
  images: string[] | undefined;
  venueName: string;
  placeholderImage: string;
}

const VenueImageCarousel: React.FC<VenueImageCarouselProps> = ({
  images,
  venueName,
  placeholderImage,
}) => {
  if (!images || images.length === 0) {
    return (
      <img
        src={placeholderImage}
        alt="Rasm mavjud emas"
        className="w-full h-[500px] object-cover rounded-lg shadow-lg"
      />
    );
  }

  return (
    <Carousel className="w-full rounded-lg overflow-hidden shadow-lg">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img
              src={
                image.startsWith("/")
                  ? `https://backend-exam-tuxona.onrender.com${image}`
                  : image
              }
              alt={`${venueName} - rasm ${index + 1}`}
              className="w-full h-[500px] object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = placeholderImage;
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md" />
        </>
      )}
    </Carousel>
  );
};

export default VenueImageCarousel;
