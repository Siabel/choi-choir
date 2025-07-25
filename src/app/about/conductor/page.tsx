export default function ConductorPage() {
  return (
    <section className="bg-primary-bg min-h-screen">
      <div className="bg-primary-light py-16 text-center">
        <h1 className="text-4xl font-bold text-primary">
          단장 소개
        </h1>
        <p className="mt-4 text-gray-700">
          Choi Choir를 이끄는 단장의 이야기
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-12">
        <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full bg-gray-300 shadow-inner" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Choi 단장
            </h2>
            <p className="text-gray-600 mb-4">
              음악으로 사람과 사람을 잇는 다리가 되는 것을 꿈꾸는 지휘자
            </p>
            <p className="text-gray-700 leading-relaxed">
              음악에 대한 깊은 열정으로 Choi Choir를 이끌고 있습니다.
              다양한 합창 경험을 바탕으로, 단원들과 함께 새로운 음악을
              만들어가며 청중에게 감동을 전하고자 합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-12 text-gray-700 leading-relaxed space-y-6">
        <p className="text-lg">
          “음악은 사람과 사람을 잇는 가장 따뜻한 언어입니다.
          Choi Choir는 서로의 마음을 나누고, 세상에 울림을 전하기 위해
          노력하고 있습니다.”
        </p>
        <p>
          단원 모두가 성장하고, 청중과 함께하는 합창단이 되도록
          앞으로도 최선을 다하겠습니다.
        </p>
      </div>
    </section>
  );
}