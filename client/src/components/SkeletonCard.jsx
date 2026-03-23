function SkeletonCard({ className = "" }) {
  return (
    <div className={`card-glass skeleton-shimmer h-52 rounded-2xl ${className}`}>
      <div className="space-y-4 p-5">
        <div className="h-4 w-1/2 rounded bg-slate-700/70" />
        <div className="h-3 w-full rounded bg-slate-700/70" />
        <div className="h-3 w-5/6 rounded bg-slate-700/70" />
        <div className="h-3 w-2/3 rounded bg-slate-700/70" />
      </div>
    </div>
  );
}

export default SkeletonCard;
