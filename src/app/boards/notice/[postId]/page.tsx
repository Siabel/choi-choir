import BoardDetail from "@/components/Boards/BoardDetail";

export default function NoticePostPage({
  params,
}: {
  params: { postId: string };
}) {
  return <BoardDetail boardId="notice" postId={params.postId} />;
}