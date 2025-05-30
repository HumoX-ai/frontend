/* eslint-disable @typescript-eslint/no-explicit-any */
// filepath: /Users/humoyunabduqodirov/Documents/Final 2nd:1smstr exam/programming/practical/frontend/src/pages/VenueDetailPage.tsx
import { useParams, Link, useLocation } from "react-router-dom";
import {
  useGetVenueByIdQuery,
  useCreateBookingMutation,
} from "@/store/api/venueApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues } from "@/lib/validators";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";
import VenueDetailSkeleton from "@/components/venue/VenueDetailSkeleton";
import VenueImageCarousel from "@/components/venue/VenueImageCarousel";
import VenueInformation from "@/components/venue/VenueInformation";
import BookingSection from "@/components/venue/BookingSection";
import BookedDatesDisplay from "@/components/venue/BookedDatesDisplay";
import VenueErrorDisplay from "@/components/venue/VenueErrorDisplay";

const VenueDetailPage = () => {
  const { id: venueId } = useParams<{ id: string }>();
  const location = useLocation();
  const {
    data: venue,
    isLoading,
    isError,
    error,
  } = useGetVenueByIdQuery(venueId!);
  const currentUser = useSelector(selectCurrentUser);
  console.log("Current User:", currentUser);

  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();

  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestCount: venue?.capacity ? Math.min(50, venue.capacity) : 50,
    },
  });

  const onSubmitBooking = async (values: BookingFormValues) => {
    if (!currentUser || !venueId) {
      toast.error("Xatolik: Foydalanuvchi yoki to'yxona topilmadi.");
      return;
    }

    const bookingDetails = {
      venue: venueId,
      date: format(values.date, "yyyy-MM-dd"),
      guestCount: values.guestCount,
    };

    try {
      await createBooking(bookingDetails).unwrap();
      toast.success("To'yxona muvaffaqiyatli band qilindi!", {
        description: `${venue?.name} restorani ${format(
          values.date,
          "dd-MMMM-yyyy"
        )} sanasiga siz uchun band qilindi.`,
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "1px solid #388e3c",
        },
      });
      form.reset();
      setIsBookingDialogOpen(false);
    } catch (err: any) {
      console.error("Band qilishda xatolik:", err);
      const errorMessage =
        err.data?.message ||
        err.message ||
        "Band qilishda noma'lum xatolik yuz berdi.";
      toast.error("Band qilishda xatolik", {
        description: errorMessage,
      });
    }
  };

  console.log(venue);

  if (isLoading) {
    return <VenueDetailSkeleton />;
  }

  if (isError || !venue) {
    return <VenueErrorDisplay error={error} />;
  }

  const placeholderImage =
    "https://via.placeholder.com/800x600?text=Rasm+Mavjud+Emas";

  const disabledDates =
    venue.bookedDates?.map((booking) => new Date(booking.date)) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">{venue.name}</h1>
      <div className="flex items-center space-x-2 mb-6 text-muted-foreground">
        <MapPin size={18} />
        <span>
          {venue.district}, {venue.address}
        </span>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <VenueImageCarousel
            images={venue.images}
            venueName={venue.name}
            placeholderImage={placeholderImage}
          />
        </div>

        <div className="md:col-span-2 space-y-6 bg-card p-6 rounded-lg shadow-lg">
          <VenueInformation venue={venue} />

          <BookedDatesDisplay
            currentUserId={currentUser?.id}
            bookedDates={(venue.bookedDates || []).map((bd: any) =>
              typeof bd === "string"
                ? { _id: "", date: bd, userId: "", venueId: venue._id }
                : {
                    _id: bd._id ?? "",
                    date: bd.date,
                    userId: bd.userId ?? "",
                    venueId: bd.venueId ?? venue._id,
                  }
            )}
          />

          {currentUser ? (
            <BookingSection
              venue={venue}
              currentUser={currentUser}
              venueId={venueId!}
              disabledDates={disabledDates}
              isBookingLoading={isBookingLoading}
              onSubmitBooking={onSubmitBooking}
              form={form}
              isBookingDialogOpen={isBookingDialogOpen}
              setIsBookingDialogOpen={setIsBookingDialogOpen}
            />
          ) : (
            <div className="mt-6 p-4 border border-yellow-300 bg-yellow-50 rounded-md text-center">
              <AlertTriangle className="mx-auto h-10 w-10 text-yellow-500 mb-2" />
              <p className="font-semibold text-yellow-700 mb-2">
                Band qilish uchun tizimga kiring
              </p>
              <p className="text-sm text-yellow-600 mb-3">
                To'yxonani band qilish uchun avval profilingizga kirishingiz
                kerak.
              </p>
              <Button
                asChild
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Link to="/login" state={{ from: location.pathname }}>
                  Kirish
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueDetailPage;
