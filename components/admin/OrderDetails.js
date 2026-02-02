"use client";

export default function OrderDetails({ order, onClose }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-purple-100 text-purple-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return badges[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(-8)}</h3>
            <p className="text-gray-600">{formatDate(order.created_at)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Order Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Order Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">${order.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Type:</span>
                  <span className="font-medium capitalize">{order.purchase_type}</span>
                </div>
                {order.stripe_session_id && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stripe Session:</span>
                    <span className="font-mono text-xs">{order.stripe_session_id.slice(-12)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Product Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium">{order.product_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{order.category.replace("-", " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tier:</span>
                  <span className="font-medium capitalize">{order.tier}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{order.email}</span>
                </div>
                {order.user_id && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">User ID:</span>
                    <span className="font-mono text-xs">{order.user_id.slice(-12)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Shipping Address */}
            {order.shipping_address && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">📦 Shipping Address</h4>
                <div className="text-gray-700">
                  {order.shipping_address.name && <div className="font-medium">{order.shipping_address.name}</div>}
                  {order.shipping_address.address && (
                    <>
                      <div>{order.shipping_address.address.line1}</div>
                      {order.shipping_address.address.line2 && <div>{order.shipping_address.address.line2}</div>}
                      <div>
                        {order.shipping_address.address.city}, {order.shipping_address.address.state}{" "}
                        {order.shipping_address.address.postal_code}
                      </div>
                      {order.shipping_address.address.country && <div>{order.shipping_address.address.country}</div>}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Preferences */}
            {order.preferences && Object.keys(order.preferences).length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">🍽️ Customer Preferences</h4>
                <div className="space-y-2">
                  {order.preferences.vegan !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vegan:</span>
                      <span className={`font-medium ${order.preferences.vegan ? "text-green-600" : "text-gray-500"}`}>
                        {order.preferences.vegan ? "Yes" : "No"}
                      </span>
                    </div>
                  )}
                  {order.preferences.allergies && (
                    <div>
                      <span className="text-gray-600 block mb-1">Allergies:</span>
                      <div className="bg-yellow-50 p-2 rounded border-l-4 border-yellow-400">
                        <span className="text-yellow-800">{order.preferences.allergies}</span>
                      </div>
                    </div>
                  )}
                  {order.preferences.otherNotes && (
                    <div>
                      <span className="text-gray-600 block mb-1">Other Notes:</span>
                      <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                        <span className="text-blue-800">{order.preferences.otherNotes}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Fulfillment Checklist */}
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold text-green-900 mb-3">✅ Fulfillment Checklist</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  <span className="text-green-800">Review customer preferences</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  <span className="text-green-800">
                    Prepare {order.product_name} ({order.tier})
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  <span className="text-green-800">Check for dietary restrictions</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  <span className="text-green-800">Package and label</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  <span className="text-green-800">Update status to &quot;shipped&quot;</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
