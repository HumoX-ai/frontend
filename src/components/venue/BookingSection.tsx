// src/components/venue/BookingSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Venue } from "@/store/api/venueApi";
import type { BookingFormValues } from "@/lib/validators";
import type { UseFormReturn } from "react-hook-form";

interface BookingSectionProps {
  venue: Venue;
  currentUser: any;
  venueId: string;
  disabledDates: Date[];
  isBookingLoading: boolean;
  onSubmitBooking: (values: BookingFormValues) => Promise<void>;
  form: UseFormReturn<BookingFormValues>;
  isBookingDialogOpen: boolean;
  setIsBookingDialogOpen: (isOpen: boolean) => void;
}

const BookingSection: React.FC<BookingSectionProps> = ({
  venue,
  // currentUser,
  // venueId,
  disabledDates,
  isBookingLoading,
  onSubmitBooking,
  form,
  isBookingDialogOpen,
  setIsBookingDialogOpen,
}) => {
  return (
    <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
        >
          <CalendarDays className="mr-2 h-5 w-5" /> Band qilish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <span className="font-bold">{venue.name}</span> uchun band qilish
          </DialogTitle>
          <DialogDescription>
            Sana va mehmonlar sonini tanlang.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitBooking)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sana</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? format(field.value, "dd-MMMM-yyyy")
                            : "Sanani tanlang"}
                          <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                          disabledDates.some(
                            (disabledDate) =>
                              new Date(date).setHours(0, 0, 0, 0) ===
                              new Date(disabledDate).setHours(0, 0, 0, 0)
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guestCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mehmonlar soni</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={`Maks: ${venue.capacity} kishi`}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                      max={venue.capacity}
                      min={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Bekor qilish
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isBookingLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isBookingLoading ? "Band qilinmoqda..." : "Tasdiqlash"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingSection;
