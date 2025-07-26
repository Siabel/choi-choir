"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, auth, storage } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function BoardForm({ boardId }: { boardId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const user = auth.currentUser;
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      let fileUrl = "";
      if (file) {
        // Storage 경로 예: boards/free/filename
        const storageRef = ref(storage, `boards/${boardId}/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "boards", boardId, "posts"), {
        title,
        content,
        author: user.displayName || user.email || "익명",
        fileUrl, // 파일 URL 저장
        createdAt: serverTimestamp(),
      });

      alert("게시글이 등록되었습니다.");
      router.push(`/boards/${boardId}`);
    } catch (err) {
      console.error(err);
      alert("게시글 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <label className="block font-medium mb-1">제목</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">내용</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 min-h-[200px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">이미지 첨부 (선택)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
      >
        {loading ? "등록 중..." : "등록하기"}
      </button>
    </form>
  );
}