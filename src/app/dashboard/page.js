"use client";
import React from "react";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import TrainerDashboard from "@/components/dashboard/TrainerDashboard";
import RootLayout from "../layout";
import { useAuthContext } from "@/contexts/authContext";

const Dashboard = () => {
  const { pengguna } = useAuthContext();
  const userRole = pengguna.role;

  let DashboardComponent;

  switch (userRole) {
    case "Client":
      DashboardComponent = ClientDashboard;
      break;
    case "Trainer":
      DashboardComponent = TrainerDashboard;
      break;
    // case "admin":
    //   DashboardComponent = AdminDashboard;
    //   break;
    default:
      // eslint-disable-next-line react/display-name
      DashboardComponent = () => <div>Unauthorized</div>;
  }

  return (
    <RootLayout>
      <DashboardComponent />
    </RootLayout>
  );
};

export default Dashboard;
