import Link from "next/link";
import React, { MouseEventHandler, useEffect } from "react";

type Card = {
  id: number;
  name: string;
  desc: string;
  image_url: string;
}[];

type Cards = {
  cards: Card;
};

const HomePage = () => {
  const [data, setData] = React.useState<Cards>();

  const [click, setClick] = React.useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      // fetch from api
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCards`);
      const json = await res.json();

      setData(json);
    };
    fetchData();
  }, [click]);

  type Click = (name: string) => MouseEventHandler<HTMLButtonElement>;

  const handleClick = async (idFor: number) => {
    setClick((prev) => !prev);
    //do post method with fetch
    //set name against to be the card that does not match the name
    const idAgainst = data?.cards.filter((card) => card.id !== idFor)[0].id;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vote?a=${idAgainst}&b=${idFor}`,
      {
        method: "POST",
      }
    );
  };

  return (
    <div>
      <Link href={"/results"}>
        <h1 className="text-4xl text-center  w-fit mx-auto mt-10 p-10 bg-blue-500 rounded-xl">
          Results
        </h1>
      </Link>
      <div className="flex flex-row">
        {data?.cards.map((card) => (
          <div
            key={card.id}
            className="flex  w-1/2 flex-col mx-auto items-center  h-screen"
          >
            <h1 className="py-10">{card.name}</h1>
            <img
              src={card.image_url}
              alt={card.name}
              loading="lazy"
              className=" aspect-auto w-64 pb-20 rounded-lg"
              // onClick={handleClick(card.name)}
            />
            <button
              onClick={() => handleClick(card.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Vote
            </button>
            <p className="px-10">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
