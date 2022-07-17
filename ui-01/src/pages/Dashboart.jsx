import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import DashboartLayout from "../layout/DashboartLayout2";

const Dashboart = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <DashboartLayout />
      </DefaultLayout>
    </ProtectedRoute>
  );
};
export default Dashboart;
