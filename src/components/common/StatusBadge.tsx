interface StatusBadgeProps {
  status: 'online' | 'offline' | 'warning';
}

export function StatusBadge({ status }: StatusBadgeProps): JSX.Element {
  return <span className={`status status-${status}`}>{status.toUpperCase()}</span>;
}
