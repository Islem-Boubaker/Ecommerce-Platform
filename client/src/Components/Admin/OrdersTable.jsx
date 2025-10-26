import React from 'react';

const STATUS_CONFIG = {
  completed: { bg: 'bg-green-100', text: 'text-green-800' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  processing: { bg: 'bg-blue-100', text: 'text-blue-800' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
  shipped: { bg: 'bg-purple-100', text: 'text-purple-800' },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  
  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const TableHeader = ({ showAll }) => (
  <thead className="bg-gray-50">
    <tr>
      {['Order ID', 'Customer', 'Date', 'Status', 'Total', showAll && 'Actions']
        .filter(Boolean)
        .map((header) => (
          <th
            key={header}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
    </tr>
  </thead>
);


const OrderRow = ({ order, showAll }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {order.id}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {order.customer}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {order.date}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <StatusBadge status={order.status} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
      ${order.total.toFixed(2)}
    </td>
    {showAll && (
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex gap-3">
          <button className="text-blue-600 hover:text-blue-900 font-medium transition-colors">
            View
          </button>
          <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Edit
          </button>
        </div>
      </td>
    )}
  </tr>
);

const EmptyState = () => (
  <tr>
    <td colSpan="6" className="px-6 py-12 text-center">
      <p className="text-gray-500 text-sm">No orders found</p>
    </td>
  </tr>
);

const OrdersTable = ({ orders = [], showAll = false }) => {
  const displayedOrders = showAll ? orders : orders.slice(0, 5);
  const hasMoreOrders = !showAll && orders.length > 5;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
    
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {showAll ? 'All Orders' : 'Recent Orders'}
        </h3>
        {showAll && (
          <p className="text-sm text-gray-500 mt-1">
            Showing {displayedOrders.length} of {orders.length} orders
          </p>
        )}
      </div>

   
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader showAll={showAll} />
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedOrders.length > 0 ? (
              displayedOrders.map((order) => (
                <OrderRow key={order.id} order={order} showAll={showAll} />
              ))
            ) : (
              <EmptyState />
            )}
          </tbody>
        </table>
      </div>


      {hasMoreOrders && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <a
            href="/admin/orders"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
          >
            View all {orders.length} orders
            <span className="ml-1">→</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;