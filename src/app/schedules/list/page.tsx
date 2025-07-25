"use client";

import { useState } from "react";
import ScheduleCard from "@/components/Schedules/ScheduleCard";
import dayjs from "dayjs";

const dummySchedules = [
  {
    id: "1",
    title: "봄맞이 합창 콘서트",
    date: "2025-05-15 19:30",
    location: "서울 예술의전당",
    thumbnail: "/images/concert1.jpg",
  },
  {
    id: "2",
    title: "여름밤의 하모니",
    date: "2025-08-02 18:00",
    location: "부산 문화회관",
    thumbnail: "/images/concert2.jpg",
  },
  {
    id: "3",
    title: "가을의 울림",
    date: "2025-10-21 17:00",
    location: "대전 예술의전당",
    thumbnail: "/images/concert3.jpg",
  },
];

type FilterType = "all" | "upcoming" | "past";

export default function ScheduleListPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const now = dayjs();

  // 정렬 리스트
  const sortedSchedules = [...dummySchedules].sort((a, b) => {
    const aDate = dayjs(a.date);
    const bDate = dayjs(b.date);

    const aIsPast = aDate.isBefore(now);
    const bIsPast = bDate.isBefore(now);

    // 일정 정렬 알고리즘
    if (!aIsPast && bIsPast) return -1;
    if (aIsPast && !bIsPast) return 1;

    return aDate.valueOf() - bDate.valueOf();
  });

  // 필터 적용
  const filteredSchedules = sortedSchedules.filter((schedule) => {
    const isPast = dayjs(schedule.date).isBefore(now);
    if (filter === "all") return true;
    if (filter === "upcoming") return !isPast;
    if (filter === "past") return isPast;
    return true;
  });

  return (
    <div className="min-h-screen bg-primary-bg p-6">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        공연 목록
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        {[
          { key: "all", label: "전체" },
          { key: "upcoming", label: "예정" },
          { key: "past", label: "종료" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as FilterType)}
            className={`px-4 py-2 rounded-lg shadow 
              ${
                filter === key
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-primary-light hover:text-white"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSchedules.map((schedule) => {
          const isPast = dayjs(schedule.date).isBefore(now);
          return (
            <div key={schedule.id} className="relative">
              <div className="absolute top-2 left-2 bg-primary-light text-white px-2 py-1 rounded text-xs">
                {isPast ? "종료" : "예정"}
              </div>
              <ScheduleCard {...schedule} />
            </div>
          );
        })}
      </div>
    </div>
  );
}