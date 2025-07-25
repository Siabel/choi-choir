"use client";

type AlbumCardProps = {
  title: string;
  description: string;
  thumbnail: string;
  date: string;
};

export default function AlbumCard({ title, description, thumbnail, date }: AlbumCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:cursor-pointer hover:shadow-lg transition overflow-hidden">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <p className="text-xs text-gray-400 mt-2">{date}</p>
      </div>
    </div>
  );
}