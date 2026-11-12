export function Stat({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="border-t border-ink pt-4">
      <div className="font-serif text-stat leading-[1.1]">{value}</div>
      <div className="text-meta text-muted">{caption}</div>
    </div>
  );
}
