type LinkListItemProps = {
  id: string;
  title: string;
  url: string;
  clickCount: number;
  onDelete: (formData: FormData) => Promise<void>;
};

export default function LinkListItem({ id, title, url, clickCount, onDelete }: LinkListItemProps) {
  return (
    <div className="mb-2.5 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <div className="font-semibold text-slate-800">{title}</div>
        <div className="text-sm text-slate-500">{url}</div>
        <div className="text-xs text-sky-500">클릭 {clickCount}회</div>
      </div>
      <form action={onDelete}>
        <input type="hidden" name="linkId" value={id} />
        <button type="submit" className="cursor-pointer text-sm text-red-600 hover:underline">
          삭제
        </button>
      </form>
    </div>
  );
}
