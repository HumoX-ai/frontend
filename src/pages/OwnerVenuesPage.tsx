import React, { useState } from "react";
import {
  useGetVenueByOwnerQuery,
  useUpdateVenueMutation,
  useUploadVenueImagesMutation,
  type Venue,
} from "@/store/api/venueApi";
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
import { Button } from "@/components/ui/button";
import EditVenueDialog, {
  type EditVenueFormData,
} from "@/components/admin/venues/EditVenueDialog"; // Reuse admin's edit dialog for now
import { toast } from "sonner";

const OwnerVenuesPage: React.FC = () => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  );
  const {
    data: venues = [],
    isLoading,
    isError,
    refetch,
  } = useGetVenueByOwnerQuery(currentUser?.id || "", {});
  const [updateVenue, { isLoading: isUpdating }] = useUpdateVenueMutation();
  const [uploadVenueImages, { isLoading: isUploadingImages }] =
    useUploadVenueImagesMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const handleEditClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsEditOpen(true);
  };

  const handleUpdate = async (
    data: EditVenueFormData,
    images: FileList | null
  ) => {
    if (!selectedVenue) return;
    try {
      await updateVenue({ venueId: selectedVenue._id, ...data }).unwrap();
      if (images && images.length > 0) {
        const formData = new FormData();
        Array.from(images).forEach((file) => formData.append("images", file));
        await uploadVenueImages({
          venueId: selectedVenue._id,
          formData,
        }).unwrap();
      }
      toast.success("Venue updated successfully");
      setIsEditOpen(false);
      setSelectedVenue(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update venue");
      console.error(error);
    }
  };
  console.log("Venues Data:", venues);

  console.log("Current User:", currentUser);

  if (!currentUser) return <p>Please log in to see your venues.</p>;
  if (isLoading) return <p>Loading venues...</p>;
  if (isError) return <p>Error loading venues.</p>;
  if (venues.length === 0) return <p>You have no venues yet.</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">My Venues</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {venues.map((venue) => (
            <TableRow key={venue._id}>
              <TableCell>{venue.name}</TableCell>
              <TableCell>{venue.district}</TableCell>
              <TableCell>{venue.capacity}</TableCell>
              <TableCell>{venue.pricePerSeat}</TableCell>
              <TableCell>{venue.status}</TableCell>
              <TableCell>
                <Button size="sm" onClick={() => handleEditClick(venue)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedVenue && (
        <EditVenueDialog
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          selectedVenue={selectedVenue}
          onSubmit={handleUpdate}
          isUpdating={isUpdating || isUploadingImages}
        />
      )}
    </div>
  );
};

export default OwnerVenuesPage;
