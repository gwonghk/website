"use client";

import { useState } from "react";

const packages = [
  { id: 1, name: "Starter Pack", price: 5, bonus: 1 },
  { id: 2, name: "Value Pack", price: 10, bonus: 3 },
  { id: 3, name: "Mega Pack", price: 20, bonus: 8 },
  { id: 4, name: "Megaaa Pack", price: 1, bonus: 40 },
];

interface PackageT {
  id: number;
  name: string;
  price: number;
  bonus: number;
}

const Jumbo88 = () => {
  const [bestValueIdx] = useState(() => {
    const bestIndex = packages.reduce(
      (bestIdx, currentPkg, currentIdx, arr): number => {
        const bestValue = arr[bestIdx].bonus / arr[bestIdx].price;
        const currentValue = currentPkg.bonus / currentPkg.price;

        return currentValue > bestValue ? currentIdx : bestIdx;
      },
      0
    );
    return bestIndex;
  });

  return (
    <div className="flex flex-direction flex-wrap justify-center">
      {packages.map((pkg, i) => {
        return (
          <Card
            key={pkg.name + i}
            data={pkg}
            isBestValue={bestValueIdx === i}
          />
        );
      })}
    </div>
  );
};

const Card = ({
  data,
  isBestValue,
}: {
  data: PackageT;
  isBestValue: boolean;
}) => {
  const { name, price, bonus } = data;

  const handleClick = () => {
    console.log(`Buying package`);
  };

  return (
    <div
      className={`border p-4 m-4 rounded-lg ${
        isBestValue
          ? `holo-effect hover:shadow-xl hover:scale-105 transition-all duration-200 `
          : ``
      }`}
    >
      <div>Icon</div>
      <div>Name: {name}</div>
      <div>Price: ${price}</div>
      <div>Bonus: +{bonus} Bonus</div>
      <button
        onClick={handleClick}
        className="mt-4 p-2 bg-blue-500 text-white rounded btn pointer"
      >
        Buy Now
      </button>
    </div>
  );
};

export default Jumbo88;
