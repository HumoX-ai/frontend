import React, { useState } from "react";
import {
  useGetBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
  type BookingDetails,
} from "@/store/api/bookingApi";
import EditBookingDialog, {
  type EditBookingFormData,
} from "@/components/admin/bookings/EditBookingDialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminBookingsPage: React.FC = () => {
  const {
    data: bookings = [],
    isLoading,
    isError,
    refetch,
  } = useGetBookingsQuery();
  const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();
  const [updateBooking, { isLoading: isUpdating }] = useUpdateBookingMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(
    null
  );

  if (isLoading) return <p>Loading bookings...</p>;
  if (isError) return <p>Error loading bookings.</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking: BookingDetails) => (
            <TableRow key={booking._id}>
              <TableCell>{booking._id}</TableCell>
              <TableCell>{booking.user.username || booking.user._id}</TableCell>
              <TableCell>{booking.venue.name}</TableCell>
              <TableCell>
                {new Date(booking.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{booking.guestCount}</TableCell>
              <TableCell>{booking.totalPrice}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setIsEditOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="ml-2"
                  disabled={isDeleting}
                  onClick={async () => {
                    if (window.confirm("Delete this booking?")) {
                      try {
                        await deleteBooking(booking._id).unwrap();
                        toast.success("Booking deleted");
                        refetch();
                      } catch {
                        toast.error("Failed to delete booking");
                      }
                    }
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedBooking && (
        <EditBookingDialog
          isOpen={isEditOpen}
          onOpenChange={(open) => {
            setIsEditOpen(open);
            if (!open) setSelectedBooking(null);
          }}
          selectedBooking={selectedBooking}
          onSubmit={async (data: EditBookingFormData) => {
            if (!selectedBooking) return;
            try {
              await updateBooking({
                bookingId: selectedBooking._id,
                ...data,
              }).unwrap();
              toast.success("Booking updated");
              setIsEditOpen(false);
              setSelectedBooking(null);
              refetch();
            } catch {
              toast.error("Failed to update booking");
            }
          }}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
};

export default AdminBookingsPage;
