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
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/getCards`);
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/vote?a=${idAgainst}&b=${idFor}`,
      {
        method: "POST",
      }
    );
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      {data ? (
        <div className="flex flex-row  w-full">
          {data?.cards.map((card) => (
            <div
              key={card.id}
              className="flex  w-1/2  items-center justify-center h-[90vh]"
            >
              <div className="  flex flex-col items-center p-14 rounded-xl lg:hover:shadow-xl ">
                <h1 className="py-10 h-32 text-center px-4 text-sm font-bold flex justify-center items-center">
                  {card.name}
                </h1>
                <img
                  src={card.image_url}
                  alt={card.name}
                  className=" aspect-square w-24 lg:w-96 mb-20 rounded-lg object-contain"
                  // onClick={handleClick(card.name)}
                />
                <button
                  onClick={() => handleClick(card.id)}
                  className="bg-[#222] hover:bg-[#585858] text-white font-bold py-2 px-4 rounded"
                >
                  Vote
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-2xl text-center font-bold">Loading</h1>
        </div>
      )}
    </div>
  );
};

export default HomePage;
