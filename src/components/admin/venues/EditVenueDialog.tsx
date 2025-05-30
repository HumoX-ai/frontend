import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetUsersByRoleQuery } from "@/store/api/authApi";
import type { Venue } from "@/store/api/venueApi";
import { Input } from "@/components/ui/input";

const venueSchema = z.object({
  name: z.string().min(1, "Name is required"),
  district: z.string().min(1, "District is required"),
  address: z.string().min(1, "Address is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  pricePerSeat: z.number().min(1, "Price must be at least 1"),
  phone: z.string().min(1, "Phone is required"),
  status: z.enum(["pending", "confirmed", "cancelled", "approved"]),
  owner: z.string().min(1, "Owner is required"),
});
export type EditVenueFormData = z.infer<typeof venueSchema>;

interface EditVenueDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedVenue: Venue | null;
  onSubmit: (data: EditVenueFormData, images: FileList | null) => void;
  isUpdating: boolean;
}

const EditVenueDialog: React.FC<EditVenueDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedVenue,
  onSubmit,
  isUpdating,
}) => {
  const { data: owners = [] } = useGetUsersByRoleQuery({ role: "owner" });
  const form = useForm<EditVenueFormData>({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: selectedVenue?.name || "",
      district: selectedVenue?.district || "",
      address: selectedVenue?.address || "",
      capacity: selectedVenue?.capacity || 0,
      pricePerSeat: selectedVenue?.pricePerSeat || 0,
      phone: selectedVenue?.phone || "",
      status:
        (selectedVenue?.status as z.infer<typeof venueSchema>["status"]) ||
        "pending",
      owner: selectedVenue?.owner._id || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: selectedVenue?.name || "",
      district: selectedVenue?.district || "",
      address: selectedVenue?.address || "",
      capacity: selectedVenue?.capacity || 0,
      pricePerSeat: selectedVenue?.pricePerSeat || 0,
      phone: selectedVenue?.phone || "",
      status:
        (selectedVenue?.status as z.infer<typeof venueSchema>["status"]) ||
        "pending",
      owner: selectedVenue?.owner._id || "",
    });
  }, [selectedVenue, form]);
  const [newImages, setNewImages] = useState<FileList | null>(null);

  if (!selectedVenue) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Venue Owner</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data, newImages))}
            className="space-y-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* District */}
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Capacity */}
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price */}
            <FormField
              control={form.control}
              name="pricePerSeat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Seat</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Status */}
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
                        {["pending", "confirmed", "cancelled", "approved"].map(
                          (s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Owner */}
            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        {owners
                          .filter((o) => o._id)
                          .map((o) => (
                            <SelectItem key={o._id!} value={o._id!}>
                              {o.username}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Images */}
            <FormItem>
              <FormLabel>Upload Images</FormLabel>
              <FormControl>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      if (files.length > 4) {
                        toast.error("You can upload up to 4 images");
                        e.target.value = "";
                        setNewImages(null);
                      } else {
                        setNewImages(files);
                      }
                    }
                  }}
                />
              </FormControl>
            </FormItem>
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

export default EditVenueDialog;
