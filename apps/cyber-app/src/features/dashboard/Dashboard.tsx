import React from 'react'

export function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="text-sm text-gray-500">Overview of system metrics</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="text-sm text-gray-500">Open Incidents</div>
          <div className="mt-2 text-2xl font-bold">24</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="text-sm text-gray-500">Indicators</div>
          <div className="mt-2 text-2xl font-bold">12,430</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="text-sm text-gray-500">Analyst Queue</div>
          <div className="mt-2 text-2xl font-bold">7</div>
        </div>
      </div>

      <section className="mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-3">Recent Alerts</h2>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            <li className="py-3 flex justify-between">
              <div>
                <div className="font-medium">Suspicious login</div>
                <div className="text-sm text-gray-500">User: alice@example.com</div>
              </div>
              <div className="text-sm text-gray-500">2h ago</div>
            </li>
            <li className="py-3 flex justify-between">
              <div>
                <div className="font-medium">Malicious domain detected</div>
                <div className="text-sm text-gray-500">ioc.example.com</div>
              </div>
              <div className="text-sm text-gray-500">6h ago</div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
