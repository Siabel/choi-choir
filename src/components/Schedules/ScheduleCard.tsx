"use client";

import Image from "next/image";
import Link from "next/link";

interface ScheduleCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  thumbnail?: string;
}

export default function ScheduleCard({
  id,
  title,
  date,
  location,
  thumbnail,
}: ScheduleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative w-full h-48">
        <Image
          src={thumbnail || "/images/default-concert.jpg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{date}</p>
        <p className="text-sm text-gray-600">{location}</p>
        <Link
          href={`/schedules/${id}`}
          className="inline-block mt-3 text-primary hover:underline"
        >
          자세히 보기 →
        </Link>
      </div>
    </div>
  );
}