import React from "react";
import {
  Dialog, // Main Dialog component
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import type { EditOwnerDialogProps } from "./schemas";

const EditOwnerDialog: React.FC<EditOwnerDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isUpdating,
  control,
  handleSubmit,
  errors,
  selectedUser,
}) => {
  if (!selectedUser) return null; // Don't render if no user is selected

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Owner</DialogTitle>
          <DialogDescription>
            Update the details of the owner. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="edit-username">Username</Label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input id="edit-username" {...field} />}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="edit-firstName">First Name</Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <Input id="edit-firstName" {...field} />}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="edit-lastName">Last Name</Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input id="edit-lastName" {...field} />}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="edit-phone">Phone</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input id="edit-phone" {...field} />}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOwnerDialog;
