import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex flex-row gap-4 uppercase font-bold">
      <Link href={"/"}>
        <h1>Home</h1>
      </Link>
      <Link href={"/results"}>
        <h1>Results</h1>
      </Link>
      <Link href={"/"}>
        <h1>Github</h1>
      </Link>
    </div>
  );
};

export default Navbar;
