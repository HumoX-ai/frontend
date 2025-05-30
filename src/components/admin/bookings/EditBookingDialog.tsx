import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { BookingDetails } from "@/store/api/bookingApi";

const bookingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  guestCount: z.number().min(1, "Guest count must be at least 1"),
  status: z.enum(["pending", "confirmed", "cancelled"]),
  totalPrice: z.number().min(0, "Total price must be >= 0"),
});
export type EditBookingFormData = z.infer<typeof bookingSchema>;

interface EditBookingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBooking: BookingDetails;
  onSubmit: (data: EditBookingFormData) => void;
  isUpdating: boolean;
}

const EditBookingDialog: React.FC<EditBookingDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedBooking,
  onSubmit,
  isUpdating,
}) => {
  const form = useForm<EditBookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: new Date(selectedBooking.date).toISOString().slice(0, 10),
      guestCount: selectedBooking.guestCount,
      status: selectedBooking.status,
      totalPrice: selectedBooking.totalPrice,
    },
  });

  useEffect(() => {
    form.reset({
      date: new Date(selectedBooking.date).toISOString().slice(0, 10),
      guestCount: selectedBooking.guestCount,
      status: selectedBooking.status,
      totalPrice: selectedBooking.totalPrice,
    });
  }, [selectedBooking, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guestCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest Count</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["pending", "confirmed", "cancelled"].map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Price</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookingDialog;
