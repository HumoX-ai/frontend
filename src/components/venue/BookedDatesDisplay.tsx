// src/components/venue/BookedDatesDisplay.tsx
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CalendarCheck, CalendarX, Trash2 } from "lucide-react";
import { format, isPast, isToday, isTomorrow, parseISO } from "date-fns";
import { uz } from "date-fns/locale";
import { useDeleteBookingMutation } from "@/store/api/venueApi";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface BookedDate {
  _id: string;
  date: string;
  venueId: string;
  userId: string;
}

interface BookedDatesDisplayProps {
  bookedDates: BookedDate[];
  currentUserId?: string;
}

const BookedDatesDisplay: React.FC<BookedDatesDisplayProps> = ({
  bookedDates,
  currentUserId,
}) => {
  const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();

  if (!bookedDates || bookedDates.length === 0) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedBookedObjects = [...bookedDates].sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Band qilingan sanalar:
      </h3>
      {sortedBookedObjects.length > 0 ? (
        <div className="space-y-2">
          {sortedBookedObjects.map((bookedItem) => {
            console.log(bookedItem);

            const date = parseISO(bookedItem.date);
            const isPastDate = isPast(date) && !isToday(date);
            const isTodayDate = isToday(date);
            const isTomorrowDate = isTomorrow(date);
            const isMyBooking =
              currentUserId && bookedItem.userId === currentUserId;

            let IconComponent: React.ElementType = CalendarDays;
            let badgeVariant:
              | "secondary"
              | "default"
              | "destructive"
              | "outline" = "secondary";
            let textColor = "text-gray-700";
            let tooltipText = format(date, "d-MMMM, yyyy", { locale: uz });

            if (isMyBooking) {
              tooltipText += " (Sizning broningiz)";
            }

            if (isPastDate) {
              IconComponent = CalendarX;
              badgeVariant = "outline";
              textColor = "text-gray-500";
              tooltipText += " (O'tgan)";
            } else if (isTodayDate) {
              IconComponent = CalendarCheck;
              badgeVariant = "default";
              textColor = "text-white";
              tooltipText += " (Bugun)";
            } else if (isTomorrowDate) {
              IconComponent = CalendarCheck;
              badgeVariant = "default";
              textColor = "text-white";
              tooltipText += " (Ertaga)";
            } else {
              IconComponent = CalendarDays;
              badgeVariant = isMyBooking ? "default" : "secondary";
              if (isMyBooking) {
                textColor = "text-white";
              }
            }

            const handleDelete = async () => {
              if (!bookedItem._id) {
                toast.error("Bronni o'chirish uchun ID topilmadi.");
                return;
              }
              try {
                await deleteBooking({
                  bookingId: bookedItem._id,
                  venueId: bookedItem.venueId,
                }).unwrap();
                toast.success("Bron muvaffaqiyatli o'chirildi!");
              } catch (error) {
                console.error("Bronni o'chirishda xatolik: ", error);
                toast.error("Bronni o'chirishda xatolik yuz berdi.");
              }
            };

            return (
              <div
                key={bookedItem.date + bookedItem.userId}
                className="flex items-center space-x-2"
              >
                <Badge
                  variant={badgeVariant}
                  className={`text-sm px-3 py-1.5 flex items-center w-full ${
                    isPastDate ? "border-gray-300" : ""
                  }`}
                  title={tooltipText}
                >
                  <IconComponent
                    size={16}
                    className={`mr-2 ${
                      isPastDate
                        ? "text-gray-400"
                        : isTodayDate || isTomorrowDate
                        ? textColor
                        : "text-purple-600"
                    }`}
                  />
                  <span
                    className={`${textColor} ${
                      isPastDate ? "line-through" : ""
                    }`}
                  >
                    {format(date, "d MMMM, yyyy", { locale: uz })}
                  </span>
                  {isMyBooking &&
                    !isTodayDate &&
                    !isTomorrowDate &&
                    !isPastDate && (
                      <span className="ml-2 text-xs font-semibold text-purple-400">
                        (SIZNING BRONINGIZ)
                      </span>
                    )}
                  {isTodayDate && (
                    <span
                      className={`ml-auto text-xs font-semibold ${
                        isMyBooking ? "text-purple-300" : "text-green-500"
                      }`}
                    >
                      (BUGUN{isMyBooking ? " - SIZNIKI" : ""})
                    </span>
                  )}
                  {isTomorrowDate && (
                    <span
                      className={`ml-auto text-xs font-semibold ${
                        isMyBooking ? "text-purple-300" : "text-blue-500"
                      }`}
                    >
                      (ERTAGA{isMyBooking ? " - SIZNIKI" : ""})
                    </span>
                  )}
                  {isPastDate && (
                    <span
                      className={`ml-auto text-xs font-semibold ${
                        isMyBooking ? "text-gray-400" : "text-gray-400"
                      }`}
                    >
                      (O'TGAN{isMyBooking ? " - SIZNIKI" : ""})
                    </span>
                  )}
                </Badge>
                {isMyBooking && !isPastDate && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Bronni bekor qilish</AlertDialogTitle>
                        <AlertDialogDescription>
                          Haqiqatan ham{" "}
                          {format(date, "d MMMM, yyyy", { locale: uz })}{" "}
                          sanasidagi broningizni bekor qilmoqchimisiz? Bu amalni
                          ortga qaytarib bo'lmaydi.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>
                          Yo'q
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "O'chirilmoqda..." : "Ha, bekor qilish"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Hozircha band qilingan sanalar mavjud emas.
        </p>
      )}
    </div>
  );
};

export default BookedDatesDisplay;
