import {
  useGetUsersByRoleQuery,
  type User,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
} from "@/store/api/authApi";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React from "react";
import OwnerTable from "@/components/admin/owners/OwnerTable";
import AddOwnerDialog from "@/components/admin/owners/AddOwnerDialog";
import EditOwnerDialog from "@/components/admin/owners/EditOwnerDialog";
import DeleteOwnerDialog from "@/components/admin/owners/DeleteOwnerDialog";
import {
  editUserSchema,
  addUserSchema,
  type EditUserFormData,
  type AddUserFormData,
} from "@/components/admin/owners/schemas";

export default function AdminPage() {
  const {
    data: owners = [], // Provide a default empty array for owners
    isLoading,
    isError,
    refetch,
  } = useGetUsersByRoleQuery({ role: "owner" });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [userToDelete, setUserToDelete] = React.useState<User | null>(null);

  const {
    control: editControl,
    handleSubmit: handleEditSubmit,
    reset: resetEditForm,
    formState: { errors: editErrors },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const {
    control: addControl,
    handleSubmit: handleAddSubmit,
    reset: resetAddForm,
    formState: { errors: addErrors },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      role: "owner",
    },
  });

  const handleDelete = async () => {
    if (!userToDelete || !userToDelete._id) return;
    try {
      await deleteUser(userToDelete._id).unwrap();
      toast.success(`Owner ${userToDelete.username} deleted successfully`);
      refetch();
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      toast.error("Failed to delete owner");
      console.error("Failed to delete owner:", error);
    }
  };

  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    resetEditForm({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    });
    setIsEditDialogOpen(true);
  };

  const onEditSubmit = async (data: EditUserFormData) => {
    if (!selectedUser || !selectedUser._id) return;
    try {
      await updateUser({ userId: selectedUser._id, ...data }).unwrap();
      toast.success("Owner updated successfully");
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update owner");
      console.error("Failed to update owner:", error);
    }
  };

  const handleAddOwner = () => {
    resetAddForm();
    setIsAddDialogOpen(true);
  };

  const onAddSubmit = async (data: AddUserFormData) => {
    try {
      await createUser(data).unwrap();
      toast.success("Owner created successfully");
      setIsAddDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to create owner");
      console.error("Failed to create owner:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Venue Owners</h1>
        <Button onClick={handleAddOwner}>Add Owner</Button>
      </div>

      <OwnerTable
        owners={owners}
        isLoading={isLoading}
        isError={isError}
        handleEdit={handleEdit}
        handleDelete={(userId: string) => {
          // You can call openDeleteDialog here if needed, or provide a real delete handler
          const user = owners.find((u) => u._id === userId || u.id === userId);
          if (user) openDeleteDialog(user);
        }}
        openDeleteDialog={openDeleteDialog} // Pass openDeleteDialog instead of handleDelete
        isDeleting={isDeleting} // This might be better handled within DeleteOwnerDialog or by its specific trigger
      />

      <AddOwnerDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={onAddSubmit}
        isCreating={isCreating}
        control={addControl}
        handleSubmit={handleAddSubmit}
        errors={addErrors}
      />

      {selectedUser && (
        <EditOwnerDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={onEditSubmit}
          isUpdating={isUpdating}
          control={editControl}
          handleSubmit={handleEditSubmit}
          errors={editErrors}
          selectedUser={selectedUser}
        />
      )}

      {userToDelete && (
        <DeleteOwnerDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
          ownerName={userToDelete.username}
        />
      )}
    </div>
  );
}
