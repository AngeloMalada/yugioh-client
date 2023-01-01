import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className=" h-[5vh] flex flex-row items-center justify-center gap-4 font-bold ">
      <Link href={"/"}>
        <span>Twitter</span>
      </Link>
      <Link href={"/"}>
        <span>Github</span>
      </Link>
      <Link href={"/"}>
        <span>About</span>
      </Link>
    </div>
  );
};

export default Footer;
