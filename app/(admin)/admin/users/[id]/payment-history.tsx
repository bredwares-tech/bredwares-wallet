// payment-history.tsx
import { useState } from "react";
import { createColumns } from "@/components/admin/user-payments/columns";
import { DataTable } from "@/components/admin/user-payments/data-table";
import { toast } from "sonner";
import { EditUserPaymentDialog } from "@/components/admin/user-payments/EditUserPaymentDialog";

interface Payment {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  amount: number;
  status: "completed" | "pending";
  payment_date: string;
  stripe_session_id: string | null;
}

interface PaymentHistoryProps {
  payments: Payment[];
  onPaymentUpdate: (payment: Payment) => void;
}

export function PaymentHistory({
  payments,
  onPaymentUpdate,
}: PaymentHistoryProps) {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsEditDialogOpen(true);
  };

  const handleSavePayment = async (updatedData: {
    full_name: string;
    status: "completed" | "pending";
  }) => {
    if (!selectedPayment) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/payments/edit/${selectedPayment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: updatedData.status,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update payment");
      }

      const updatedPayment = await response.json();

      // Update the UI immediately
      onPaymentUpdate({
        ...selectedPayment,
        status: updatedData.status,
      });

      toast.success("Payment updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update payment"
      );
    } finally {
      setIsLoading(false);
      setIsEditDialogOpen(false);
    }
  };

  const transformedPayments = payments.map((payment) => ({
    ...payment,
    status: ["completed", "pending"].includes(payment.status)
      ? (payment.status as "completed" | "pending")
      : "pending",
  }));

  const columns = createColumns({
    onEditPayment: handleEditPayment,
  });

  if (!transformedPayments || transformedPayments.length === 0) {
    return <div>No payment history available</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={transformedPayments} />

      <EditUserPaymentDialog
        user={selectedPayment}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSavePayment}
      />
    </div>
  );
}
