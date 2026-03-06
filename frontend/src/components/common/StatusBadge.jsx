function StatusBadge({ active }) {
  return active ? (
    <span className="badge-green">● Active</span>
  ) : (
    <span className="badge-amber">◌ Planned</span>
  );
}

export default StatusBadge;