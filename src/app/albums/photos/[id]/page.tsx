type Props = { params: { id: string } };

export default function PhotoDetailPage({ params }: Props) {
  const { id } = params;

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-primary mb-4">사진첩 상세 페이지</h2>
      <p className="text-gray-700">앨범 ID: {id}</p>
      <div className="mt-6 bg-white p-4 shadow rounded">
        (사진 리스트를 불러와서 갤러리처럼 배치 예정)
      </div>
    </div>
  );
}