export default function AboutPage() {
  return (
    <section className="min-h-screen bg-primary-bg py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">
          합창단 소개
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          Choi Choir는 음악을 통해 사람들의 마음을 하나로 모으는 합창단입니다.
          정기 연주회, 협연, 다양한 음악 활동을 통해 예술의 가치를 나누고 있습니다.
        </p>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-primary mb-4">공식 YouTube</h2>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/비디오ID"
              title="Choi Choir YouTube"
              allowFullScreen
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-4">연습실 위치</h2>
          <p className="text-gray-700 mb-4">
            청주시 ,,, 123-45 (Choi Choir 연습실)
          </p>
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            지도
          </div>
        </div>
      </div>
    </section>
  );
}