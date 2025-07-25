"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = () => {
    if (password !== passwordConfirm) {
      return "비밀번호와 비밀번호 재확인이 일치하지 않습니다.";
    }
    if (password.length < 6 || password.length > 20) {
      return "비밀번호는 6~20자 사이여야 합니다.";
    }
    if (!/[a-z]/.test(password)) {
      return "비밀번호에 영어 소문자가 포함되어야 합니다.";
    }
    if (!/[A-Z]/.test(password)) {
      return "비밀번호에 영어 대문자가 포함되어야 합니다.";
    }
    if (!/[0-9]/.test(password)) {
      return "비밀번호에 숫자가 포함되어야 합니다.";
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return "비밀번호에 특수문자가 포함되어야 합니다.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    const passwordError = validatePassword();
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        name,
        role: "guest",
        createdAt: serverTimestamp(),
      });

      router.push("/");
    } catch (err: any) {
      console.error("회원가입 실패:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("이미 가입된 이메일입니다.");
      } else if (err.code === "auth/invalid-email") {
        setError("올바른 이메일 형식이 아닙니다.");
      } else if (err.code === "auth/weak-password") {
        setError("비밀번호는 6자 이상이어야 합니다.");
      } else {
        setError("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 이메일 */}
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

      {/* 비밀번호 */}
      <div>
        <label className="block text-sm font-medium mb-1">비밀번호</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 9.964 0 012.658-4.411M6.51 6.51A9.963 9.963 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.978 9.978 0 01-4.246 5.136M15 12a3 3 0 00-3-3" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          비밀번호는 6~20자, 대소문자, 숫자, 특수문자를 포함해야 합니다.
        </p>
      </div>

      {/* 비밀번호 재확인 */}
      <div>
        <label className="block text-sm font-medium mb-1">비밀번호 재확인</label>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
      </div>

      {/* 이름 */}
      <div>
        <label className="block text-sm font-medium mb-1">이름</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
      >
        가입하기
      </button>
    </form>
  );
}