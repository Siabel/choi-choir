import TrackList from "@/components/Resources/TrackList";

export default function TracksPage() {
  return (
    <div className="min-h-screen bg-primary-bg p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">연습곡 자료실</h2>
      <TrackList />
    </div>
  );
}