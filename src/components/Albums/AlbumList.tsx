"use client";

import AlbumCard from "./AlbumCard";

const dummyAlbums = [
  {
    title: "2025 봄 정기 공연",
    description: "따뜻한 봄날의 하모니",
    thumbnail: "https://placehold.co/600x400",
    date: "2025-04-15",
  },
  {
    title: "여름 합창 캠프",
    description: "열정과 화합의 무대",
    thumbnail: "https://placehold.co/600x400",
    date: "2025-07-10",
  },
];

export default function AlbumList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {dummyAlbums.map((album, idx) => (
        <AlbumCard key={idx} {...album} />
      ))}
    </div>
  );
}