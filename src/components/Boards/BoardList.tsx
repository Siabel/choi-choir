"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  author: string;
  createdAt: string;
}

export default function BoardList({ boardId }: { boardId: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collection(db, "boards", boardId, "posts"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => {
        const d = doc.data() as any;
        return {
          id: doc.id,
          title: d.title,
          author: d.author,
          createdAt: d.createdAt?.toDate?.().toLocaleDateString() ?? "",
        };
      });
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, [boardId]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {boardId === "free" ? "자유게시판" : "공지사항"}
      </h1>

      {boardId === "free" && (
        <div className="mb-4">
          <Link
            href={`/boards/${boardId}/new`}
            className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            글쓰기
          </Link>
        </div>
      )}

      <ul className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/boards/${boardId}/${post.id}`}
              className="block bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
              <div className="text-sm text-gray-500">
                {post.author} · {post.createdAt}
              </div>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}