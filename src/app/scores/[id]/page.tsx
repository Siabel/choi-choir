"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const dummyScores = [
  {
    id: "1",
    title: "Gloria",
    fileUrl: "/dummy/gloria.pdf",
    images: ["/dummy/gloria1.png", "/dummy/gloria2.png", "/dummy/gloria3.png"],
  },
  {
    id: "2",
    title: "Messiah",
    fileUrl: "/dummy/messiah.pdf",
    images: ["/dummy/messiah1.png", "/dummy/messiah2.png"],
  },
];

export default function ScoreDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const score = dummyScores.find((s) => s.id === params.id);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  if (!score) return <div className="p-6">악보를 찾을 수 없습니다.</div>;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % score.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? score.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-primary-bg flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded p-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">{score.title}</h2>

        <div className="relative w-full flex items-center justify-center">
          <button
            onClick={prevImage}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-white px-3 py-2 rounded hover:bg-primary-dark"
          >
            ◀
          </button>

          <img
            src={score.images[currentIndex]}
            alt={`악보 ${currentIndex + 1}`}
            className="max-h-[70vh] object-contain"
          />

          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-white px-3 py-2 rounded hover:bg-primary-dark"
          >
            ▶
          </button>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto">
          {score.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`썸네일 ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`h-20 cursor-pointer rounded border-2 transition ${
                currentIndex === idx
                  ? "border-primary"
                  : "border-transparent hover:border-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 flex gap-4">
          <a
            href={score.fileUrl}
            download
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            PDF 다운로드
          </a>

          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}