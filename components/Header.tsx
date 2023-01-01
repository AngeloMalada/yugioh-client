import React from "react";
import Navbar from "./Navbar";

type Props = {};

const Header = (props: Props) => {
  return (
    //create a navbar with a logo and a button to go to the login page
    <div className="h-[5vh]  flex items-center justify-between px-10">
      LOGO
      <Navbar />
    </div>
  );
};

export default Header;
