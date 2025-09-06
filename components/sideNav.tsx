import Link from "next/link";
import { HomeIcon, UserIcon, CurrencyDollarIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <nav className="h-full w-64 bg-gray-900 text-white flex flex-col py-6 px-4 shadow-lg">
      <div className="mb-8 flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tight">SimpleInvl</span>
      </div>
      <ul className="flex-1 space-y-2">
        <li>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition">
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/inventory" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition">
            <CurrencyDollarIcon className="h-5 w-5" />
            Inventory
          </Link>
        </li>
        <li>
          <Link href="/dashboard/users" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition">
            <UserIcon className="h-5 w-5" />
            Users
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition">
            <Cog6ToothIcon className="h-5 w-5" />
            Settings
          </Link>
        </li>
      </ul>
      <div className="mt-8 text-xs text-gray-400">&copy; {new Date().getFullYear()} SimpleInvl</div>
    </nav>
  );
}
