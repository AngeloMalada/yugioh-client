import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";

type Result = {
  results: {
    name: string;
    desc: string;
    image_url: string;
    _count: {
      votesFor: number;
      votesAgainst: number;
    };
  }[];
};
const results = () => {
  const [data, setData] = React.useState<Result>();

  useEffect(() => {
    const fetchData = async () => {
      // fetch from jsonplaceholder
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results`);
      const json = await res.json();

      setData(json);
    };
    fetchData();
  }, []);

  console.log(data?.results[0]);
  return (
    <div>
      <Link href={"/"}>
        <h1 className="text-4xl text-center  w-fit mx-auto mt-10 p-10 bg-blue-500 rounded-xl">
          Home
        </h1>
      </Link>
      {data ? (
        <div>
          {data?.results.map((card) => (
            <div
              key={card.name}
              className="flex  w-fit flex-col mx-auto items-center  h-fit"
            >
              <h1 className="py-10">{card.name}</h1>
              <img
                src={card.image_url}
                alt={card.name}
                loading="lazy"
                className=" aspect-auto w-24 pb-20 rounded-lg"
              />
              <div className="flex flex-row gap-4 w-fit">
                <h1 className="py-2">{card._count.votesFor} Votes for</h1>
                <h1 className="py-2">
                  {card._count.votesAgainst} Votes agaisnt
                </h1>
                <h1 className="py-2">
                  {card._count.votesAgainst === 0 && card._count.votesFor !== 0
                    ? "100%"
                    : card._count.votesAgainst !== 0 &&
                      card._count.votesFor === 0
                    ? "0%"
                    : (card._count.votesFor /
                        (card._count.votesFor + card._count.votesAgainst)) *
                      100}
                </h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[90vh]">
          <h1>Loading</h1>
        </div>
      )}
    </div>
  );
};

export default results;
