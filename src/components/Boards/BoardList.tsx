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
      <h1 className="text-2xl font-bold mb-6">공지사항</h1>
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li key={post.id} className="py-4">
            <Link
              href={`/boards/${boardId}/${post.id}`}
              className="hover:underline block"
            >
              <p className="font-medium">{post.title}</p>
              <span className="text-sm text-gray-500">
                {post.author} · {post.createdAt}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}