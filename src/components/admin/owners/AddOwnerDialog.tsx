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
import type { AddOwnerDialogProps } from "./schemas";

const AddOwnerDialog: React.FC<AddOwnerDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isCreating,
  control,
  handleSubmit,
  errors,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Owner</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new owner. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="add-username">Username</Label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input id="add-username" {...field} />}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="add-firstName">First Name</Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <Input id="add-firstName" {...field} />}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="add-lastName">Last Name</Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input id="add-lastName" {...field} />}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="add-phone">Phone</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input id="add-phone" {...field} />}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="add-password">Password</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input id="add-password" type="password" {...field} />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="add-role">Role</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Input
                  id="add-role"
                  {...field}
                  placeholder="e.g., owner, admin"
                />
              )}
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
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
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Saving..." : "Save Owner"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOwnerDialog;
