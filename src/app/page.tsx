import MainLogo from "@/components/Main/MainLogo";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="min-h-screen bg-primary-bg flex flex-col items-center justify-center text-center px-4">
      <MainLogo />
      <p className="mt-6 text-lg text-gray-700">
        음악으로 하나되는 순간, Choi Choir와 함께하세요.
      </p>
      <Link
        href="/about"
        className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-primary-dark transition-colors"
      >
        합창단 소개 보러가기
      </Link>
    </section>
  );
}