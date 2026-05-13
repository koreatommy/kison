// 결과 리포트 상단 타이틀 영역
type Props = {
  studentName?: string;
};

export default function ResultHeader({ studentName }: Props) {
  return (
    <div className="mb-6 text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-100 to-violet-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-indigo-700">
        <span>🎉</span>
        분석 완료
      </div>
      <h1 className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 leading-tight">
        {studentName ? (
          <>
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {studentName}
            </span>
            의 창업 캐릭터
          </>
        ) : (
          "나의 창업 캐릭터"
        )}
      </h1>
      <p className="mt-2 text-sm font-semibold text-zinc-500">
        10문항 성향 분석 결과를 확인해 보세요
      </p>
    </div>
  );
}
