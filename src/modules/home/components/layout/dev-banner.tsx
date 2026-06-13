export function DevBanner() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-9 flex items-center justify-center bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-sm">
      <p className="text-xs font-medium text-amber-400/80 tracking-wide">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 animate-pulse align-middle" />
        Currently in development.
      </p>
    </div>
  );
}
