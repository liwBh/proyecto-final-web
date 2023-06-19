import React from 'react';
import Layout from '../Components/Layout';

import {usePrivateRoute} from "../Hooks/usePrivateRoute";

const Coktails = () => {

  usePrivateRoute();

  return (
    <>
      <Layout>
        
      </Layout>
    
    </>
  )
}

export default Coktails