"use client";

import { useState, useEffect } from "react";
import config from "@/config";

// Admin waitlist management page

export default function AdminWaitlistPage() {
  const [waitlist, setWaitlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSendingNotifications, setIsSendingNotifications] = useState(false);
  const [notificationResult, setNotificationResult] = useState(null);

  // Fetch waitlist data
  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/waitlist");
      const data = await response.json();

      if (response.ok) {
        setWaitlist(data.waitlist || []);
      } else {
        setError(data.error || "Failed to fetch waitlist");
      }
    } catch {
      setError("Failed to fetch waitlist");
    }

    setIsLoading(false);
  };

  // Send launch notifications to all waitlist members
  const handleSendNotifications = async () => {
    if (
      !confirm(
        "Are you sure you want to send launch notification emails to all waitlist members who haven't been notified yet?"
      )
    ) {
      return;
    }

    setIsSendingNotifications(true);
    setNotificationResult(null);

    try {
      const response = await fetch("/api/admin/waitlist/notify", {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        setNotificationResult({
          success: true,
          message: `Successfully sent ${data.sent} notification emails!`,
        });
        // Refresh waitlist to update notified_at timestamps
        fetchWaitlist();
      } else {
        setNotificationResult({
          success: false,
          message: data.error || "Failed to send notifications",
        });
      }
    } catch {
      setNotificationResult({
        success: false,
        message: "Failed to send notifications",
      });
    }

    setIsSendingNotifications(false);
  };

  // Export waitlist to CSV
  const handleExportCSV = () => {
    if (waitlist.length === 0) {
      alert("No waitlist entries to export");
      return;
    }

    const headers = ["Email", "Signed Up", "Notified", "Converted"];
    const rows = waitlist.map((entry) => [
      entry.email,
      new Date(entry.created_at).toLocaleDateString(),
      entry.notified_at ? new Date(entry.notified_at).toLocaleDateString() : "Not yet",
      entry.converted_at ? new Date(entry.converted_at).toLocaleDateString() : "Not yet",
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate stats
  const totalSignups = waitlist.length;
  const notifiedCount = waitlist.filter((entry) => entry.notified_at).length;
  const convertedCount = waitlist.filter((entry) => entry.converted_at).length;
  const pendingNotifications = totalSignups - notifiedCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Waitlist Management</h1>
              <p className="text-gray-600 mt-2">Manage waitlist signups for Unbox The Moment</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Waitlist Status Badge */}
              <div
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  config.waitlist?.isActive ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                }`}
              >
                {config.waitlist?.isActive ? "Waitlist Active" : "Launched"}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Total Signups</div>
            <div className="text-3xl font-bold text-gray-900">{totalSignups}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Notified</div>
            <div className="text-3xl font-bold text-green-600">{notifiedCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Pending Notifications</div>
            <div className="text-3xl font-bold text-yellow-600">{pendingNotifications}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Converted</div>
            <div className="text-3xl font-bold text-blue-600">{convertedCount}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleSendNotifications}
              disabled={isSendingNotifications || pendingNotifications === 0}
              className="btn btn-primary px-6 py-2 disabled:opacity-50"
            >
              {isSendingNotifications ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Sending...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  Send Launch Notifications ({pendingNotifications})
                </>
              )}
            </button>
            <button
              onClick={handleExportCSV}
              disabled={waitlist.length === 0}
              className="btn btn-outline px-6 py-2 disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Export CSV
            </button>
            <button
              onClick={fetchWaitlist}
              className="btn btn-outline px-6 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Refresh
            </button>
          </div>

          {/* Notification Result */}
          {notificationResult && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                notificationResult.success
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {notificationResult.message}
            </div>
          )}
        </div>

        {/* Waitlist Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Waitlist Signups</h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="mt-2 text-gray-500">Loading waitlist...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : waitlist.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mx-auto mb-4 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <p>No waitlist signups yet.</p>
              <p className="text-sm mt-2">Signups will appear here when users join the waitlist.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Signed Up
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Converted
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {waitlist.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{entry.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{new Date(entry.created_at).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">{new Date(entry.created_at).toLocaleTimeString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.notified_at ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {new Date(entry.notified_at).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.converted_at ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {new Date(entry.converted_at).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
