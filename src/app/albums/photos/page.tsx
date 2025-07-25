import AlbumList, { Album } from "@/components/Albums/AlbumList";

const dummyPhotos: Album[] = [
  {
    id: "spring2024",
    type: "photo",
    title: "2024 봄 정기 공연",
    description: "따뜻한 봄날의 하모니",
    thumbnail: "https://placehold.co/600x400",
    date: "2024-04-15",
  },
  {
    id: "camp2024",
    type: "photo",
    title: "여름 합창 캠프",
    description: "열정과 화합의 무대",
    thumbnail: "https://placehold.co/600x400",
    date: "2024-07-10",
  },
];

export default function PhotosPage() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">사진첩</h2>
      <AlbumList albums={dummyPhotos} />
    </section>
  );
}