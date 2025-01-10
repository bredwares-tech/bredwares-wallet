import ToastProvider from "@/components/ToastProvider";
import UserDashboard from "@/components/user/dasboard";
import React from "react";

const page = () => {
  return (
    <div>
      <ToastProvider/>
      <UserDashboard />
    </div>
  );
};

export default page;
