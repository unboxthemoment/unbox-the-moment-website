"use client";

export default function OrderStats({ orders }) {
  // Calculate stats
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const shippedOrders = orders.filter(order => order.status === 'shipped').length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  
  const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + parseFloat(order.price), 0);

  // Category breakdown
  const categoryStats = orders.reduce((acc, order) => {
    acc[order.category] = (acc[order.category] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    {
      name: 'Total Orders',
      value: totalOrders,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Completed',
      value: completedOrders,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Shipped',
      value: shippedOrders,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Pending',
      value: pendingOrders,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      name: 'Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="mb-8">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        {stats.map((stat) => (
          <div key={stat.name} className={`${stat.bgColor} rounded-lg p-6`}>
            <div className="flex items-center">
              <div className={`w-3 h-3 ${stat.color} rounded-full mr-3`}></div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      {Object.keys(categoryStats).length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Orders by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600 capitalize">{category.replace('-', ' ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}