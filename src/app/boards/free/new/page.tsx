import BoardForm from "@/components/Boards/BoardForm";

export default function NewFreePostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">자유게시판 글쓰기</h1>
      <BoardForm boardId="free" />
    </div>
  );
}