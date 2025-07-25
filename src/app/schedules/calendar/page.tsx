"use client";

import { useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";

const events = [
  { id: "1", title: "봄맞이 합창 콘서트", date: "2025-05-15", location: "서울 예술의전당" },
  { id: "2", title: "여름밤의 하모니", date: "2025-08-02", location: "부산 문화회관" },
  { id: "3", title: "가을의 울림", date: "2025-10-21", location: "대전 예술의전당" },
];

export default function ScheduleCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [jumpYear, setJumpYear] = useState(dayjs().year());
  const [jumpMonth, setJumpMonth] = useState(dayjs().month() + 1);

  const today = dayjs();

  const startOfMonth = currentMonth.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentMonth.daysInMonth();

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
  const goToday = () => setCurrentMonth(today.startOf("month"));
  const jumpToDate = () =>
    setCurrentMonth(dayjs(`${jumpYear}-${String(jumpMonth).padStart(2, "0")}-01`));

  const eventMap = events.reduce<Record<string, typeof events>>((acc, ev) => {
    const key = dayjs(ev.date).format("YYYY-MM-DD");
    if (!acc[key]) acc[key] = [];
    acc[key].push(ev);
    return acc;
  }, {});

  const cells = [];
  for (let i = 0; i < startDay; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = currentMonth.date(d);
    const key = date.format("YYYY-MM-DD");
    const dayEvents = eventMap[key] || [];
    const isToday = date.isSame(today, "day");

    cells.push(
      <div
        key={key}
        className={`bg-white rounded-xl p-3 shadow-md flex flex-col hover:shadow-xl transition min-h-[100px] ${
          isToday ? "border-2 border-primary" : ""
        }`}
      >
        <div className="font-bold text-gray-800 mb-2">{d}</div>
        <div className="flex flex-col gap-1">
          {dayEvents.map((ev) => (
            <Link
              key={ev.id}
              href={`/schedules/${ev.id}`}
              className="bg-primary-light/30 text-primary text-xs rounded-full px-2 py-0.5 truncate hover:underline hover:text-primary-dark"
            >
              {ev.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex gap-2 items-center">
          <select
            value={jumpYear}
            onChange={(e) => setJumpYear(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: 5 }, (_, i) => today.year() - 2 + i).map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>
          <select
            value={jumpMonth}
            onChange={(e) => setJumpMonth(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}월
              </option>
            ))}
          </select>
          <button
            onClick={jumpToDate}
            className="px-3 py-1 bg-primary text-white rounded-lg shadow hover:bg-primary-dark"
          >
            이동
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark"
          >
            이전
          </button>
          <button
            onClick={goToday}
            className="px-4 py-2 bg-primary-light text-primary rounded-lg shadow hover:bg-primary-dark hover:text-white"
          >
            오늘
          </button>
          <button
            onClick={nextMonth}
            className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark"
          >
            다음
          </button>
        </div>
      </div>

      <div className="text-center text-2xl font-bold text-primary mb-4">
        {currentMonth.format("YYYY년 MM월")}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-700 py-2">
            {day}
          </div>
        ))}
        {cells}
      </div>
    </div>
  );
}