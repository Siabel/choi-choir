"use client";

import { useEffect, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { loadKakaoMap } from "@/lib/loadKakaoMap";

const KAKAO_KEY = "93e1ffcb946040435f769d2f25eba18a";

const dummySchedules = [
  {
    id: "1",
    title: "봄맞이 합창 콘서트",
    date: "2025-05-15 19:30",
    location: "서울 예술의전당",
    thumbnail: "/images/concert1.jpg",
    description: "따스한 봄을 맞이하는 특별한 합창 무대입니다.",
    mapQuery: "서울 예술의전당",
  },
  {
    id: "2",
    title: "여름밤의 하모니",
    date: "2025-08-02 18:00",
    location: "부산 문화회관",
    thumbnail: "/images/concert2.jpg",
    description: "시원한 여름밤, 조화로운 합창을 느껴보세요.",
    mapQuery: "부산 문화회관",
  },
  {
    id: "3",
    title: "가을의 울림",
    date: "2025-10-21 17:00",
    location: "대전 예술의전당",
    thumbnail: "/images/concert3.jpg",
    description: "가을 정취를 담은 감동적인 하모니.",
    mapQuery: "대전 예술의전당",
  },
];

declare global {
  interface Window {
    kakao: any;
  }
}
export default function ScheduleDetailPage() {
  const params = useParams<{ id: string }>();
  const schedule = dummySchedules.find((s) => s.id === params.id);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!schedule) return;

    loadKakaoMap(KAKAO_KEY).then(() => {
      const kakao = window.kakao;
      const geocoder = new kakao.maps.services.Geocoder();
      const map = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 4,
      });

      geocoder.addressSearch(schedule.mapQuery, (result: any, status: any) => {
        console.log("Geocoder:", status, result);
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({ map, position: coords });
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:6px 8px;font-size:14px;">${schedule.location}</div>`,
          });
          infowindow.open(map, marker);
          map.setCenter(coords);
        }
      });
    });
  }, [schedule]);

  if (!schedule) return notFound();

  return (
    <div className="min-h-screen bg-primary-bg p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl mx-auto p-6">
        <Image
          src={schedule.thumbnail}
          alt={schedule.title}
          width={800}
          height={400}
          className="rounded-lg w-full object-cover mb-6"
        />
        <h1 className="text-3xl font-bold text-primary mb-4">{schedule.title}</h1>
        <p className="mb-2"><strong>일시:</strong> {schedule.date}</p>
        <p className="mb-4"><strong>장소:</strong> {schedule.location}</p>
        <p className="mb-6">{schedule.description}</p>

        <h2 className="text-xl font-semibold text-primary mb-4">공연 장소</h2>
        <div ref={mapRef} className="w-full h-72 rounded-lg shadow" />

        <a href="/schedules/list" className="inline-block mt-6 px-4 py-2 bg-primary text-white rounded-lg">
          목록으로 돌아가기
        </a>
      </div>
    </div>
  );
}