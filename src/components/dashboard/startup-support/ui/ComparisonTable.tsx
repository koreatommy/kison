// 후보 아이템 비교 테이블 컴포넌트
"use client";

interface Column {
  key: string;
  label: string;
}

interface ComparisonTableProps {
  columns: Column[];
  rows: Record<string, string | number>[];
  highlightRowIndex?: number;
}

export default function ComparisonTable({ columns, rows, highlightRowIndex }: ComparisonTableProps) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-zinc-100 transition-colors last:border-0 ${
                i === highlightRowIndex
                  ? "bg-amber-50/60"
                  : "hover:bg-zinc-50"
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2.5 text-zinc-700">
                  {row[col.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
