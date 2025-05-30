import React, { useState } from "react";
import {
  useGetVenuesQuery,
  useUpdateVenueMutation,
  useUploadVenueImagesMutation,
  useDeleteVenueMutation,
  useCreateVenueMutation, // Added for creating venues
  type Venue,
} from "@/store/api/venueApi";
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
} from "@/components/admin/venues/EditVenueDialog";
import AddVenueDialog, {
  type AddVenueFormData, // Added for the add venue dialog
} from "@/components/admin/venues/AddVenueDialog";
import { toast } from "sonner";

const AdminVenuesPage: React.FC = () => {
  const {
    data: venues = [],
    isLoading,
    isError,
    refetch,
  } = useGetVenuesQuery({});
  const [updateVenue, { isLoading: isUpdating }] = useUpdateVenueMutation();
  const [uploadVenueImages, { isLoading: isUploadingImages }] =
    useUploadVenueImagesMutation();
  const [deleteVenue, { isLoading: isDeleting }] = useDeleteVenueMutation();
  const [createVenue, { isLoading: isCreating }] = useCreateVenueMutation(); // Added hook for create
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false); // Added state for add dialog

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
      // Update basic venue fields
      await updateVenue({ venueId: selectedVenue._id, ...data }).unwrap();
      // If new images selected, upload them
      if (images && images.length > 0) {
        const formData = new FormData();
        Array.from(images).forEach((file) => formData.append("images", file)); // Changed "image" to "images"
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

  // Added handler for creating a venue
  const handleCreateVenue = async (
    data: AddVenueFormData,
    images: FileList | null
  ) => {
    try {
      // createVenue without images property
      const createdVenue = await createVenue({ ...data, images: [] }).unwrap();

      if (images && images.length > 0 && createdVenue?._id) {
        const formData = new FormData();
        Array.from(images).forEach((file) => formData.append("images", file));
        await uploadVenueImages({
          venueId: createdVenue._id,
          formData,
        }).unwrap();
      }

      toast.success("Venue created successfully");
      setIsAddOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to create venue");
      console.error("Error creating venue:", error);
    }
  };

  if (isLoading) return <p>Loading venues...</p>;
  if (isError) return <p>Error loading venues.</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Venues</h1>
        <Button onClick={() => setIsAddOpen(true)}>Add Venue</Button>{" "}
        {/* Added Add Venue Button */}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {venues.map((venue) => (
            <TableRow key={venue._id}>
              <TableCell>{venue._id}</TableCell>
              <TableCell>{venue.name}</TableCell>
              <TableCell>{venue.owner.username}</TableCell>
              <TableCell>{venue.district}</TableCell>
              <TableCell>{venue.capacity}</TableCell>
              <TableCell>{venue.pricePerSeat}</TableCell>
              <TableCell>
                <Button size="sm" onClick={() => handleEditClick(venue)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="ml-2"
                  disabled={isDeleting}
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this venue?"
                      )
                    ) {
                      try {
                        await deleteVenue(venue._id).unwrap();
                        toast.success("Venue deleted successfully");
                        refetch();
                      } catch {
                        toast.error("Failed to delete venue");
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

      {selectedVenue && (
        <EditVenueDialog
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          selectedVenue={selectedVenue}
          onSubmit={handleUpdate}
          isUpdating={isUpdating || isUploadingImages}
        />
      )}

      {/* Added AddVenueDialog */}
      <AddVenueDialog
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSubmit={handleCreateVenue}
        isCreating={isCreating || isUploadingImages} // Combined loading state
      />
    </div>
  );
};

export default AdminVenuesPage;
