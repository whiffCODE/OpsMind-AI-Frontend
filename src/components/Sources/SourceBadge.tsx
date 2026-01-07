export default function SourceBadge({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <span
      onClick={onClick}
      className="cursor-pointer bg-muted px-2 py-1 rounded text-xs"
    >
      {label}
    </span>
  );
}
