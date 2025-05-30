/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import type { User } from "@/store/api/authApi";

// Validation schema for the edit form
export const editUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
});

// Validation schema for the add form
export const addUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;
export type AddUserFormData = z.infer<typeof addUserSchema>;

export interface OwnerTableProps {
  owners: User[];
  isLoading: boolean;
  isError: boolean;
  handleEdit: (user: User) => void;
  handleDelete: (userId: string) => void;
  isDeleting: boolean;
}

export interface AddOwnerDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: AddUserFormData) => Promise<void>;
  isCreating: boolean;
  control: any; // react-hook-form Control type
  handleSubmit: any; // react-hook-form handleSubmit type
  errors: any; // react-hook-form errors type
}

export interface EditOwnerDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: EditUserFormData) => Promise<void>;
  isUpdating: boolean;
  control: any; // react-hook-form Control type
  handleSubmit: any; // react-hook-form handleSubmit type
  errors: any; // react-hook-form errors type
  selectedUser: User | null;
}

export interface DeleteOwnerDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  isDeleting: boolean;
  ownerName?: string;
}
