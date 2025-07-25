import AlbumList, { Album } from "@/components/Albums/AlbumList";

const dummyVideos: Album[] = [
  {
    id: "autumn2023",
    type: "video",
    title: "2023 가을 공연",
    description: "가을밤을 수놓은 공연 영상",
    thumbnail: "https://placehold.co/600x400",
    date: "2023-10-05",
  },
  {
    id: "xmas2022",
    type: "video",
    title: "2022 크리스마스 공연",
    description: "크리스마스 분위기 가득한 공연 영상",
    thumbnail: "https://placehold.co/600x400",
    date: "2022-12-24",
  },
];

export default function VideosPage() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">영상 모음</h2>
      <AlbumList albums={dummyVideos} />
    </section>
  );
}