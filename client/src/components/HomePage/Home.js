import React from "react";
import Header from "../Header";
import CatalogRender from "../CatalogRender";

//children
import Banner from "./Banner";
import Footer from "../Footer";



const Home = () =>{
return(
    <>
        <Header />
        <Banner/>
        <CatalogRender />
        <Footer />
    </>

)



}

export default Home;