"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface PostDetail {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  fileUrl?: string;
}

export default function BoardDetail({
  boardId,
  postId,
}: {
  boardId: string;
  postId: string;
}) {
  const [post, setPost] = useState<PostDetail | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const ref = doc(db, "boards", boardId, "posts", postId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setPost({
          title: data.title,
          content: data.content,
          author: data.author,
          createdAt: data.createdAt?.toDate?.().toLocaleString() ?? "",
          fileUrl: data.fileUrl || "",
        });
      }
    };
    fetchPost();
  }, [boardId, postId]);

  if (!post) return <p>로딩 중...</p>;

  return (
    <article className="bg-white p-6 rounded-lg shadow space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="text-gray-500">
        {post.author} · {post.createdAt}
      </div>
      {post.fileUrl && (
        <div className="mt-4">
          <img src={post.fileUrl} alt="첨부 이미지" className="max-w-full rounded" />
        </div>
      )}
      <div className="whitespace-pre-line mt-4 text-gray-800">{post.content}</div>
    </article>

  );
}