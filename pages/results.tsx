import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { MdThumbUpAlt, MdThumbDownAlt } from "react-icons/md";

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/results`);
      const json = await res.json();

      setData(json);
    };
    fetchData();
  }, []);

  console.log(data?.results[0]);
  return (
    <div className="font-bold">
      {data ? (
        <div>
          {data?.results.map((card) => (
            <div
              key={card.name}
              className="flex w-[80vw] justify-between flex-col lg:flex-row mx-auto  p-4  m-8 rounded-xl shadow-lg hover:shadow-slate-400"
            >
              <div className="flex flex-col mx-auto items-center gap-4 w-[50%]">
                <h1 className="text-center ">{card.name}</h1>
                <img
                  src={card.image_url}
                  alt={card.name}
                  loading="lazy"
                  className=" aspect-auto w-24 lg:w-80 mb-5 rounded-lg"
                />
              </div>
              <div className="flex flex-row gap-4 text-xl px-10 items-center text-center mx-auto">
                <h1 className="py-2 flex flex-row text-center items-center gap-2">
                  {card._count.votesFor} <MdThumbUpAlt />
                </h1>
                <h1 className="py-2 flex flex-row text-center items-center gap-2">
                  {card._count.votesAgainst} <MdThumbDownAlt />
                </h1>
                <h1 className="py-2 flex text-center items-center">
                  {card._count.votesAgainst === 0 && card._count.votesFor !== 0
                    ? "100%"
                    : card._count.votesAgainst !== 0 &&
                      card._count.votesFor === 0
                    ? "0%"
                    : (card._count.votesFor /
                        (card._count.votesFor + card._count.votesAgainst)) *
                        100 +
                      "%"}
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
