import React from "react";
import Layout from "../Components/Layout";
import {usePrivateRoute} from "../Hooks/usePrivateRoute";

const Profile = () => {

  usePrivateRoute();

  return (
    <>
      <Layout>
        <h1>Profile</h1>
      </Layout>
    </>
  );
};

export default Profile;
