"use client";
import useUsers from "@/hooks/admin/useUsers";
import { createColumns, Users } from "./columns";
import { DataTable } from "./data-table";
import { EditUserDialog } from "./EditUserDialog";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export default function UserPage() {
  const { data, loading, error } = useUsers();
  const [users, setUsers] = useState<Users[]>([]);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update local users state when data changes
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleEditUser = (user: Users) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleSaveUser = async (userData: {
    full_name: string;
    remaining_amount: string;
  }) => {
    if (!selectedUser) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/users/edit/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ remaining_amount: userData.remaining_amount }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update user");
      }

      const updatedUser = await response.json();

      // Update the local state immediately
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? { ...user, remaining_amount: userData.remaining_amount }
            : user
        )
      );

      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to update user");
    } finally {
      setIsSaving(false);
      setIsEditDialogOpen(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10 text-red-500">{error}</div>;
  }

  const columns = createColumns(handleEditUser);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} /> {/* Use local users state */}
      <EditUserDialog
        user={selectedUser}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveUser}
      />
    </div>
  );
}
