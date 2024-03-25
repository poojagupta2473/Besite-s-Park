import React from "react";
import Carousel from "../Carousel/Carousel";
// import Icons from "../Icons/Icons";
import Category from "../Category/Category";
import HomeBody from "../Features/Features";
import About from "../About/About";

const Home = () => {
  return (
    <>
      <Carousel />
      {/* <Icons /> */}
      <Category />
      <About />
      <HomeBody />
    </>
  );
};
export default Home;
