import ScoreList from "@/components/Resources/ScoreList";

export default function ScoresPage() {
  return (
    <div className="min-h-screen bg-primary-bg p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">악보 자료실</h2>
      <ScoreList />
    </div>
  );
}