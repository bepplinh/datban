/**
 * Compact chip-based summary showing items already ordered at a table.
 */
const ActiveOrdersSummary = ({ orders }) => {
  if (!orders || orders.length === 0) return null;

  return (
    <div className="mx-2 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
      <h3 className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        Bàn này đã gọi
      </h3>
      <div className="flex flex-wrap gap-2">
        {orders.map((item, idx) => (
          <span
            key={idx}
            className="bg-white px-2 py-1 rounded-lg text-[11px] font-bold text-gray-700 border border-blue-50 shadow-sm"
          >
            {item.product?.name}{" "}
            <span className="text-blue-600 ml-0.5">x{item.quantity}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ActiveOrdersSummary;
