// 페이지 콘텐츠 영역 래퍼 (중앙 정렬 + 최대 너비 제한)
export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">
      {children}
    </main>
  );
}
