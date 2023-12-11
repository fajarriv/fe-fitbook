"use client";
import React from "react";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import TrainerDashboard from "@/components/dashboard/TrainerDashboard";
import RootLayout from "../layout";
// import AdminDashboard from "./AdminDashboard";
// import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  //   const { userRole } = useAuth();
  const userRole = "client";

  let DashboardComponent;

  switch (userRole) {
    case "client":
      DashboardComponent = ClientDashboard;
      break;
    case "trainer":
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
