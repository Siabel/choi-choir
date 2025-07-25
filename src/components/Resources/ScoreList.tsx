"use client";

import { useState } from "react";
import Link from "next/link";

interface Score {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const dummyScores: Score[] = [
  {
    id: "1",
    title: "Gloria",
    description: "비발디 글로리아 악보",
    images: [
      "/dummy/gloria1.png",
      "/dummy/gloria2.png",
      "/dummy/gloria3.png",
    ],
  },
  {
    id: "2",
    title: "Messiah",
    description: "헨델 메시아 합창",
    images: [
      "/dummy/messiah1.png",
      "/dummy/messiah2.png",
    ],
  },
];

export default function ScoreList() {
  const [scores] = useState<Score[]>(dummyScores);

  return (
    <div className="space-y-4">
      {scores.map((score) => (
        <Link href={`/scores/${score.id}`} key={score.id}>
          <div className="bg-white shadow m-4 p-4 rounded hover:shadow-lg transition flex justify-between items-center cursor-pointer">
            <div>
              <h3 className="text-lg font-semibold">{score.title}</h3>
              <p className="text-sm text-gray-600">{score.description}</p>
            </div>
            <span className="bg-primary text-white px-4 py-2 rounded">
              보기
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}