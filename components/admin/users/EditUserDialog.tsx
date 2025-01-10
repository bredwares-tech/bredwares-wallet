import { Users } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface EditUserDialogProps {
  user: Users | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (userData: { full_name: string; remaining_amount: string }) => void;
}

export function EditUserDialog({
  user,
  open,
  onOpenChange,
  onSave,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    remaining_amount: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name,
        remaining_amount: user.remaining_amount,
      });
    }
  }, [user]);

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="full_name" className="text-right">
              Name
            </Label>
            <Input
              id="full_name"
              value={formData.full_name}
              readOnly
              disabled
              className="col-span-3 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="remaining_amount" className="text-right">
              Remaining Amount
            </Label>
            <Input
              id="remaining_amount"
              value={formData.remaining_amount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  remaining_amount: e.target.value,
                }))
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
