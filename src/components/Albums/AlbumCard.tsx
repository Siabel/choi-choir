"use client";

import Link from "next/link";

type AlbumCardProps = {
  id: string;
  type: "photo" | "video";
  title: string;
  description: string;
  thumbnail: string;
  date: string;
};

export default function AlbumCard({ id, type, title, description, thumbnail, date }: AlbumCardProps) {
  return (
    <Link href={`/albums/${type === "photo" ? "photos" : "videos"}/${id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
        <div className="relative">
          <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />

          {type === "video" && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white opacity-70 hover:opacity-100 hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
          <p className="text-xs text-gray-400 mt-2">{date}</p>
        </div>
      </div>
    </Link>
  );
}