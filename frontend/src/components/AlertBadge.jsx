function AlertBadge({ count = 0 }) {
  return (
    <span className="inline-flex animate-pulse items-center rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
      Alerts: {count}
    </span>
  );
}

export default AlertBadge;
