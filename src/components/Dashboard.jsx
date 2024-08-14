import React, { useEffect, useState } from "react";
import CoordinatorUI from "../UI/CoordinatorUI";
import VolunteerUI from "../UI/VolunteerUI";
import DonorUI from "../UI/DonorUI";
import axios from '../helpers/auth-config';

const Dashboard = () => {

  const userRole = localStorage.getItem('role')
  console.log(userRole);

  if (!userRole) {
    return <div>Loading...</div>;
  }


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
