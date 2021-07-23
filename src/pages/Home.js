import React from "react"
import  UpLoader from "../components/Uploader";
import Tips from "../components/Tips"
function Home(){

    return (
        <>

             <Tips>Please Login first, then upload !!!</Tips>

        <UpLoader />
        </>

    );
}

export default Home;