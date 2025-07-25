type Props = { params: { id: string } };

export default function VideoDetailPage({ params }: Props) {
  const { id } = params;
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-primary mb-4">영상 앨범 상세 페이지</h2>
      <p className="text-gray-700">앨범 ID: {id}</p>
      <div className="mt-6 bg-white p-4 shadow rounded">
        (업로드된 영상들을 리스트로 보여줄 예정)
      </div>
    </div>
  );
}