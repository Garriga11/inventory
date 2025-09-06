import SideNav from '@/components/sideNav';

export default function InventoryDemo() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
      <SideNav />
      <main className="flex-1 flex items-center justify-center">
        <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10 max-w-xl w-full mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Demo: Inventory Management System</h1>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            Inventory Management is a crucial aspect of any business, ensuring that the right products are available at the right time.
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Automating this process can lead to significant efficiency gains and cost savings.
          </p>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Here, in this Demo, we will showcase the key features of our Inventory Management System.
          </p>
          <h2 className="text-xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside mb-6 text-left mx-auto max-w-md text-gray-700 dark:text-gray-300">
            <li>Real-time inventory tracking</li>
            <li>Automated stock alerts</li>
            <li>Comprehensive reporting tools</li>
          </ul>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            Explore the various sections of the application to see how our system can help streamline your inventory management processes.
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            For more information on how to integrate this system into your business, please visit our website:
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold">TBA</span>
            <a href="#" className="text-blue-600 hover:underline">Try it out</a>
          </div>
        </section>
      </main>
    </div>
  );
}