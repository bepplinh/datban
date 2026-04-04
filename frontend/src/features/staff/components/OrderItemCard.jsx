import { formatCurrency } from "@/shared/utils/format";

/**
 * Reusable card for displaying a single order item.
 * @param {"draft" | "confirmed" | "preparing" | "ready"} variant - Visual style variant.
 */
const STATUS_CONFIG = {
  draft: {
    bg: "bg-orange-50/60 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    badgeLabel: "Chờ báo bếp",
    qtyBadge: "bg-orange-100 text-orange-700",
    dot: <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse inline-block mr-1.5" />,
  },
  confirmed: {
    bg: "bg-white border-gray-100",
    badge: "bg-blue-50 text-blue-600",
    badgeLabel: "Đang làm",
    qtyBadge: "bg-gray-100 text-gray-600",
    dot: null,
  },
  preparing: {
    bg: "bg-white border-blue-100",
    badge: "bg-blue-50 text-blue-600",
    badgeLabel: "Đang làm",
    qtyBadge: "bg-gray-100 text-gray-600",
    dot: null,
  },
  ready: {
    bg: "bg-green-50/60 border-green-200",
    badge: "bg-green-100 text-green-700",
    badgeLabel: "Đã xong ✓",
    qtyBadge: "bg-green-100 text-green-700",
    dot: null,
  },
};

const OrderItemCard = ({ name, price, quantity, variant = "confirmed" }) => {
  const config = STATUS_CONFIG[variant] ?? STATUS_CONFIG.confirmed;
  const total = price * quantity;

  return (
    <div className={`p-3 rounded-xl border shadow-sm flex items-start justify-between ${config.bg}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-bold text-text text-sm leading-snug">{name}</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${config.badge}`}>
            {config.dot}{config.badgeLabel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">
            {formatCurrency(price)}
          </span>
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${config.qtyBadge}`}>
            x{quantity}
          </span>
        </div>
      </div>
      <div className="ml-3 shrink-0">
        <span className="font-bold text-text text-base">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
};

export default OrderItemCard;
