"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MainLogo from "@/components/Main/MainLogo";

interface Schedule {
  id: string;
  title: string;
  date: string;
  posterUrl?: string;
}

// const dummyNextSchedule: Schedule = {
//   id: "test123",
//   title: "2025 봄 정기연주회",
//   date: "2025-05-10",
//   posterUrl: "/dummy/gloria1.png",
// };

export default function HomePage() {
  const [nextSchedule, setNextSchedule] = useState<Schedule | null>(null);

  // useEffect(() => {
  //   setTimeout(() => setNextSchedule(dummyNextSchedule), 1000);
  // }, []);

  if (nextSchedule) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-primary-bg px-4">
        <div className="relative w-full max-w-6xl">
          <Link
            href={`/schedules/${nextSchedule.id}`}
            className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded shadow-lg hover:bg-primary-dark transition"
          >
            공연 상세보기
          </Link>

          {nextSchedule.posterUrl && (
            <Image
              src={nextSchedule.posterUrl}
              alt="공연 포스터"
              width={2000}
              height={1000}
              className="mx-auto rounded mb-4"
            />
          )}
          <h2 className="text-2xl font-bold text-primary mb-2">
            {nextSchedule.title}
          </h2>
          <p className="text-gray-600 mb-4">{nextSchedule.date}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-primary-bg flex flex-col items-center justify-center text-center px-4">
      <MainLogo />
      <p className="mt-6 text-lg text-gray-700">
        음악으로 하나되는 순간, Choi Choir와 함께하세요.
      </p>
      <Link
        href="/about"
        className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-primary-dark transition-colors"
      >
        합창단 소개 보러가기
      </Link>
    </section>
  );
}