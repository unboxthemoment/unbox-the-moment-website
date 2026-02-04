import { createClient } from "@supabase/supabase-js";
import OrdersTable from "@/components/admin/OrdersTable";
import OrderStats from "@/components/admin/OrderStats";

export default async function AdminDashboard() {
  // Use service role key for admin operations
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
    realtime: { disabled: true },
  });

  // Get all orders with latest first
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  // Get all waitlist entries
  const { data: waitlist, error: waitlistError } = await supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false });

  if (ordersError) {
    console.error("Error fetching orders:", ordersError);
  }

  if (waitlistError) {
    console.error("Error fetching waitlist:", waitlistError);
  }

  // Calculate waitlist stats
  const totalSignups = waitlist?.length || 0;
  const notifiedCount = waitlist?.filter((entry) => entry.notified_at).length || 0;
  const convertedCount = waitlist?.filter((entry) => entry.converted_at).length || 0;
  const pendingNotifications = totalSignups - notifiedCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage orders and waitlist for Unbox The Moment</p>
        </div>

        {/* Waitlist Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Waitlist Overview</h2>
            <a
              href="/admin/waitlist"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View Full Waitlist →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Signups</p>
                  <p className="text-2xl font-bold text-blue-600">{totalSignups}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Notified</p>
                  <p className="text-2xl font-bold text-green-600">{notifiedCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Notifications</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingNotifications}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Converted</p>
                  <p className="text-2xl font-bold text-purple-600">{convertedCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Stats */}
        <OrderStats orders={orders || []} />

        {/* Orders Table */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <OrdersTable orders={orders || []} />
        </div>
      </div>
    </div>
  );
}
