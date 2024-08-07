import React from "react";
import CoordinatorUI from "../UI/CoordinatorUI";
import VolunteerUI from "../UI/VolunteerUI";
import DonorUI from "../UI/DonorUI";

const Dashboard = () => {
  const userRole = "coordinator"
  if (userRole === "coordinator") {
    return <CoordinatorUI />;
  } else if (userRole === "volunteer") {
    return <VolunteerUI />;
  } else if (userRole === "donor") {
    return <DonorUI />;
  } else {
    return <div>Unauthorized access</div>;
  }
};

export default Dashboard;