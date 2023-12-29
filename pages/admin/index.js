import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Products = () => (
	<div>
		{/* Content for managing products */}
		<h2>Products Management</h2>
	</div>
);

const Orders = () => (
	<div>
		{/* Content for managing orders */}
		<h2>Orders Management</h2>
	</div>
);

const Customers = () => (
	<div>
		{/* Content for managing customers */}
		<h2>Customers Management</h2>
	</div>
);

const Analytics = () => (
	<div>
		{/* Content for analytics */}
		<h2>Analytics</h2>
	</div>
);

const AdminDashboard = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const router = useRouter();

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex px-40">
			{/* Sidebar */}
			<aside
				className={`bg-gray-800 text-white w-64 min-h-screen flex-shrink-0 transition-all duration-300 ease-in-out ${
					isSidebarOpen
						? 'translate-x-0'
						: '-translate-x-full'
				}`}
			>
				<div className="p-4">
					<h1 className="text-3xl font-bold mb-6">
						Admin Dashboard
					</h1>
					{/* Sidebar links */}
					<ul>
						<li>
							<Link href="/admin/products">Products</Link>
						</li>
						<li>
							<Link href="/admin/orders">Orders</Link>
						</li>
						<li>
							<Link href="/admin/customers">Customers</Link>
						</li>
						<li>
							<Link href="/admin/analytics">Analytics</Link>
						</li>
					</ul>
				</div>
			</aside>

			{/* Main Content */}
			<div className="flex-1">
				{/* Topbar with toggle button */}
				<div className="bg-gray-500 p-4 flex justify-between items-center">
					<button
						onClick={toggleSidebar}
						className="text-gray-800 focus:outline-none md:hidden"
					>
						{isSidebarOpen ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							</svg>
						)}
					</button>
				</div>

				{/* Rest of the content */}
				<div className="p-8">
					{/* Render content based on route */}
					{router.pathname === '/admin/products' && (
						<Products />
					)}
					{router.pathname === '/admin/orders' && (
						<Orders />
					)}
					{router.pathname === '/admin/customers' && (
						<Customers />
					)}
					{router.pathname === '/admin/analytics' && (
						<Analytics />
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
