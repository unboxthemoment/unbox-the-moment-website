"use client";

import { useState } from "react";

export default function StatusDropdown({ orderId, currentStatus, onStatusChange }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'shipped', label: 'Shipped', color: 'bg-blue-100 text-blue-800' },
    { value: 'delivered', label: 'Delivered', color: 'bg-purple-100 text-purple-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  const currentStatusObj = statusOptions.find(s => s.value === currentStatus);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return;
    
    setIsUpdating(true);
    
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      onStatusChange();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update order status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative">
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={isUpdating}
        className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          border-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
          ${currentStatusObj?.color || 'bg-gray-100 text-gray-800'}
        `}
      >
        {statusOptions.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
      
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}