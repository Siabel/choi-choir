"use client";

import AlbumCard from "./AlbumCard";

export type Album = {
  id: string;
  type: "photo" | "video";
  title: string;
  description: string;
  thumbnail: string;
  date: string;
};

export default function AlbumList({ albums }: { albums: Album[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {albums.map((album) => (
        <AlbumCard key={album.id} {...album} />
      ))}
    </div>
  );
}