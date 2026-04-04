const orders = [
  {
    id: "o1",
    userId: "u1",
    status: "completed",
    createdAt: "2026-04-01T10:00:00Z",
    items: [
      { id: "oi1", productId: "p1", name: "Burger", price: 5, quantity: 2 },
      { id: "oi2", productId: "p2", name: "Coke", price: 2, quantity: 1 },
    ],
  },
  {
    id: "o2",
    userId: "u2",
    status: "pending",
    createdAt: "2026-04-01T11:00:00Z",
    items: [
      { id: "oi3", productId: "p1", name: "Burger", price: 5, quantity: 1 },
      { id: "oi4", productId: "p3", name: "Pizza", price: 8, quantity: 1 },
    ],
  },
  {
    id: "o3",
    userId: "u1",
    status: "completed",
    createdAt: "2026-04-02T09:30:00Z",
    items: [
      { id: "oi5", productId: "p2", name: "Coke", price: 2, quantity: 3 },
      { id: "oi6", productId: "p4", name: "Fries", price: 3, quantity: 2 },
    ],
  },
  {
    id: "o4",
    userId: "u3",
    status: "cancelled",
    createdAt: "2026-04-02T12:00:00Z",
    items: [
      { id: "oi7", productId: "p3", name: "Pizza", price: 8, quantity: 2 },
    ],
  },
  {
    id: "o5",
    userId: "u2",
    status: "completed",
    createdAt: "2026-04-02T13:15:00Z",
    items: [
      { id: "oi8", productId: "p1", name: "Burger", price: 5, quantity: 3 },
      { id: "oi9", productId: "p4", name: "Fries", price: 3, quantity: 1 },
    ],
  },
];

function Test() {
  const totalRevenue = orders.reduce((sum, order) => {
    const orderTotal = order.items.reduce(
      (s, item) => s + item.quantity * item.price,
      0,
    );
    return sum + orderTotal;
  }, 0);

  console.log(totalRevenue);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

export default Test;
