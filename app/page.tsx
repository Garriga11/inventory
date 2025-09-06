import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900 px-4 py-12">
      <div className="max-w-2xl w-full bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Demo: Inventory Management System</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
          Inventory Management is a crucial aspect of any business, ensuring that the right products are available at the right time.<br />
          Automating this process can lead to significant efficiency gains and cost savings.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
          Here, in this Demo, we will showcase the key features of our Inventory Management System.
        </p>
        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Key Features</h2>
        <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700 dark:text-gray-300">
          <li>Real-time inventory tracking</li>
          <li>Automated stock alerts</li>
          <li>Comprehensive reporting tools</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Explore the various sections of the application to see how our system can help streamline your inventory management processes.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
          For more information on how to integrate this system into your business, please visit our website: <span className="font-semibold">TBA</span><br />
          <Link href="/dashboard/admin" className="text-blue-500 hover:underline">Try it out</Link>
        </p>
      </div>

    </main>
  );
}
