"use client";

import { useState } from "react";

type Member = {
  name: string;
  part: "Soprano" | "Alto" | "Tenor" | "Bass";
};

export default function MembersPage() {
  const dummyMembers: Member[] = [
    { name: "김철수", part: "Tenor" },
    { name: "이영희", part: "Soprano" },
    { name: "박민준", part: "Bass" },
    { name: "최가영", part: "Alto" },
    { name: "정우성", part: "Tenor" },
    { name: "한지민", part: "Soprano" },
    { name: "유재석", part: "Bass" },
    { name: "아이유", part: "Alto" },
  ];

  const [selectedPart, setSelectedPart] = useState<string>("All");

  const filteredMembers =
    selectedPart === "All"
      ? dummyMembers
      : dummyMembers.filter((m) => m.part === selectedPart);

  const parts = ["All", "Soprano", "Alto", "Tenor", "Bass"];

  return (
    <section className="bg-primary-bg min-h-screen">
      <div className="bg-primary-light py-16 text-center">
        <h1 className="text-4xl font-bold text-primary">단원 소개</h1>
        <p className="mt-4 text-gray-700">
          함께 노래하는 Choi Choir의 단원들
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-8 flex flex-wrap justify-center gap-4">
        {parts.map((part) => (
          <button
            key={part}
            onClick={() => setSelectedPart(part)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedPart === part
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
            }`}
          >
            {part}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition"
            >
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-3" />
              <p className="text-gray-700 font-medium">{member.name}</p>
              <p className="text-sm text-gray-500">{member.part}</p>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            해당 파트의 단원이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}