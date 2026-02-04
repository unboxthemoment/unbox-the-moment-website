"use client";

import { useState } from "react";
import StatusDropdown from "./StatusDropdown";
import OrderDetails from "./OrderDetails";

export default function OrdersTable({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter orders based on status
  const filteredOrders = statusFilter === "all" ? orders : orders.filter((order) => order.status === statusFilter);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
        <p>Orders will appear here when customers make purchases.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter */}
      <div className="px-6 py-4 border-b border-gray-200">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="all">All Orders ({orders.length})</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{order.id.slice(-8)}</div>
                  <div className="text-sm text-gray-500">${order.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.email}</div>
                  {order.shipping_address?.name && (
                    <div className="text-sm text-gray-500">{order.shipping_address.name}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.product_name}</div>
                  <div className="text-sm text-gray-500 capitalize">
                    {order.category.replace("-", " ")} • {order.tier}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusDropdown
                    orderId={order.id}
                    currentStatus={order.status}
                    onStatusChange={() => window.location.reload()}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.created_at)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
