import AdminDashboard from "@/components/admin/dasboard";
import ToastProvider from "@/components/ToastProvider";
import React from "react";

const page = () => {
  return (
    <div>
      <ToastProvider/>
      <AdminDashboard />
    </div>
  );
};

export default page;
