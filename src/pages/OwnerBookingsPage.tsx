import React from "react";
import { useGetBookingsByOwnerQuery } from "@/store/api/bookingApi"; // Assuming you'll add this
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { selectCurrentUser } from "@/store/slices/authSlice";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { BookingDetails } from "@/store/api/bookingApi";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

const OwnerBookingsPage: React.FC = () => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  );
  // TODO: Implement useGetBookingsByOwnerQuery in bookingApi.ts
  // For now, let's assume it fetches bookings related to the owner's venues.
  // You might need to adjust the query or backend to support this efficiently.
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useGetBookingsByOwnerQuery(currentUser?.id || "", {});

  if (!currentUser) return <p>Please log in to see venue bookings.</p>;
  if (isLoading) return <p>Loading bookings...</p>;
  if (isError) return <p>Error loading bookings.</p>;
  if (bookings.length === 0) return <p>No bookings found for your venues.</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Venue Bookings</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Venue Name</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking: BookingDetails) => (
            <TableRow key={booking._id}>
              <TableCell>{booking._id}</TableCell>
              <TableCell>{booking.venue.name}</TableCell>

              <TableCell>
                {booking.user.firstName || booking.user.username}
              </TableCell>
              <TableCell>
                {booking.user.phone || booking.user.firstName}
              </TableCell>
              <TableCell>
                {new Date(booking.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{booking.guestCount}</TableCell>
              <TableCell>{booking.status}</TableCell>
              {/* Add actions if needed, e.g., confirm/cancel booking */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OwnerBookingsPage;
