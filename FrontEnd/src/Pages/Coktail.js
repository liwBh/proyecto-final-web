import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Dropzone from "../Components/Cocktail/Dropzone";

const Cocktail = () => {
  
  const [meCocktail, setMeCocktail] = useState({
    name: "",
    description: "",
    ingredients: [],
    steps: [],
    image: null,
  });

  
  useEffect(() => { 
    console.log(meCocktail);
  }, [meCocktail]);

  return (
    <>
      <Layout>
        <Dropzone setMeCocktail={setMeCocktail} meCocktail={meCocktail}/>
      </Layout>
    </>
  );
};

export default Cocktail;
