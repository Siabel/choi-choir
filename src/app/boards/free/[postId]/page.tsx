import BoardDetail from "@/components/Boards/BoardDetail";

export default function FreePostPage({
  params,
}: {
  params: { postId: string };
}) {
  return <BoardDetail boardId="free" postId={params.postId} />;
}