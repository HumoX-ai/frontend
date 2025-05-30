import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { User } from "@/store/api/authApi";
import type { OwnerTableProps } from "./schemas";

const OwnerTable: React.FC<
  OwnerTableProps & { openDeleteDialog: (user: User) => void }
> = ({
  owners,
  isLoading,
  isError,
  handleEdit,
  openDeleteDialog,
  isDeleting,
}) => {
  if (isLoading) return <div>Loading owners...</div>;
  if (isError) return <div>Error fetching owners.</div>;

  return (
    <Table>
      <TableCaption>A list of venue owners.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {owners && owners.length > 0 ? (
          owners.map((owner: User) => (
            <TableRow key={owner._id}>
              <TableCell>{owner._id}</TableCell>
              <TableCell>{owner.username}</TableCell>
              <TableCell>{owner.firstName}</TableCell>
              <TableCell>{owner.lastName}</TableCell>
              <TableCell>{owner.phone}</TableCell>
              <TableCell>{owner.role}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(owner)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteDialog(owner)} // Call openDeleteDialog with owner
                    disabled={isDeleting} // This might be managed by the parent or DeleteOwnerDialog itself
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No venue owners found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OwnerTable;
