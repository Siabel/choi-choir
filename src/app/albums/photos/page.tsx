import AlbumList from "@/components/Albums/AlbumList";

export default function PhotosPage() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">사진첩</h2>
      <AlbumList />
    </section>
  );
}