type LinkCardProps = {
  id: string;
  title: string;
};

export default function LinkCard({ id, title }: LinkCardProps) {
  return (
    <a
      href={`/api/links/${id}/click`}
      className="mb-2.5 flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-semibold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-sky-500"
    >
      {title}
    </a>
  );
}
