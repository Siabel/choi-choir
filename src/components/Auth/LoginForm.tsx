"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 1. 로그인
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Firestore에서 사용자 role 조회
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : null;

      console.log("로그인 성공", { uid: user.uid, role });

      // 3. 로그인 성공 시 리디렉션
      router.push("/");
    } catch (err: any) {
      console.error("로그인 실패:", err);

      if (err.code === "auth/user-not-found") {
        setError("존재하지 않는 계정입니다.");
      } else if (err.code === "auth/wrong-password") {
        setError("비밀번호가 올바르지 않습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">이메일</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">비밀번호</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition hover:cursor-pointer"
      >
        로그인
      </button>

      <div className="flex items-center justify-between mt-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-primary"
          />
          아이디 저장
        </label>
        <div className="space-x-2">
          <button
            type="button"
            className="text-primary hover:underline hover:cursor-pointer"
            onClick={() => alert("이메일 찾기 기능은 추후 제공됩니다.")}
          >
            아이디 찾기
          </button>
          <button
            type="button"
            className="text-primary hover:underline hover:cursor-pointer"
            onClick={() => alert("비밀번호 재설정 기능은 추후 제공됩니다.")}
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
    </form>
  );
}