import { useContext, useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { getOrders, getUserOrders } from '../api/order';
import { UserContext } from '../../context/UserContext';
import { deleteCard, getCards } from '../api/card';
import { formatCurrencyString } from 'use-shopping-cart';
import Link from 'next/link';
import stripe from 'stripe';
import { format } from 'date-fns';

export default function AdminDashboard({ cards }) {
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);
	const router = useRouter();
	const [orders, setOrders] = useState([]);

	const stripeInstance = stripe(
		'sk_test_51OHnZ3BIztSkOPFM8xDUnfw7kKhzt67vtWubW1j7C3yGqEDmqGWvovVgM7AFoVQciFfcOyg9l7YX2nBh0JPG54OH006P0FcBHa',
	);

	const getCheckoutSessions = async () => {
		try {
			const sessions =
				await stripeInstance.checkout.sessions.list();
			return sessions;
		} catch (error) {
			// Handle errors here
			console.error(
				'Error fetching checkout sessions:',
				error,
			);
			return null;
		}
	};

	// Usage
	getCheckoutSessions().then((sessions) => {
		if (sessions) {
			// Do something with the fetched sessions
			console.log('Fetched sessions:', sessions);
		} else {
			// Handle the case where sessions couldn't be fetched
			console.log('Failed to fetch sessions.');
		}
	});

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				if (user) {
					const res = await getOrders(token);
					const sortedOrders = res.data.sort((a, b) => {
						// Assuming 'updatedAt' is a string in ISO format
						const dateA = new Date(a.updatedAt);
						const dateB = new Date(b.updatedAt);
						return dateB - dateA; // Sort in descending order (latest first)
					});
					setOrders(sortedOrders);
				} else {
					console.log('No user logged in');
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchOrders();
	}, [user, token]);

	console.log(orders);

	const isAuth = user && token;

	// if (!isAuth) {
	// 	router.push('/login');
	// }

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		address: '',
		// Add more fields as needed
	});

	// Function to handle form input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Function to handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		// Implement logic to update user profile using formData
		console.log('Form submitted with data:', formData);
		// Add logic to update the user profile using API calls or other methods
	};

	const handleDelete = async (id) => {
		const response = await deleteCard(id);
		console.log(response);
		// alert('Card deleted');
		router.push('/admin');
	};

	const currentUser = user?.data;

	if (isAuth)
		return (
			<div className="flex flex-col md:grid md:grid-cols-3 gap-6 p-6">
				<div className="md:col-span-1 lg:col-span-1 flex flex-col gap-6">
					<div className=" border-slate-200 rounded-lg p-6 border-2">
						<div className="flex flex-row justify-between items-center">
							<h1
								style={{ fontFamily: 'Lobster Two' }}
								className=" text-2xl"
							>
								Admin Information
							</h1>
							<a
								href=""
								className="px-4 py-3 rounded-md bg-slate-200"
							>
								Edit
							</a>
						</div>
						<div className="flex flex-row items-center mt-5">
							<div>
								<FaUserAlt
									size={45}
									className="border-2 border-slate-200 rounded-full p-1"
								/>
							</div>
							<div className="ml-4">
								<p>{currentUser?.name}</p>
								<p>{currentUser?.email}</p>
							</div>
						</div>
						<div className="mt-4">
							<p>
								Phone Number: {currentUser?.phone_number}
							</p>
							<p className="bg-slate-200 w-16 text-center rounded-sm capitalize mt-2">
								{currentUser?.role}
							</p>
						</div>
					</div>
				</div>
				<div className="md:col-span-2 lg:col-span-2 flex flex-col gap-6">
					<div className=" border-slate-200 rounded-lg p-6 border-2">
						<div className="flex flex-row justify-between items-center mb-3">
							<h1
								style={{ fontFamily: 'Lobster Two' }}
								className=" text-2xl"
							>
								Products
							</h1>
							<Link
								href="/admin/add-product"
								className="bg-[#005438] hover:bg-[#005438ec] text-white py-1 px-2 rounded-md mr-2"
							>
								Add Product
							</Link>
						</div>
						<div className="overflow-x-auto">
							<table className="min-w-full border-collapse border border-gray-300">
								<thead>
									<tr>
										{/* <th className="border border-gray-300 px-4 py-2">
											ID
										</th> */}
										<th className="border border-gray-300 px-4 py-2">
											Name
										</th>
										{/* <th className="border border-gray-300 px-4 py-2">
											Description
										</th> */}
										<th className="border border-gray-300 px-4 py-2">
											Price
										</th>
										<th className="border border-gray-300 px-4 py-2">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{cards?.map((product) => (
										<tr key={product.id}>
											{/* <td className="border border-gray-300 px-4 py-2">
												{product.id}
											</td> */}
											<td className="border border-gray-300 px-4 py-2">
												{product.title}
											</td>
											{/* <td className="border border-gray-300 px-4 py-2">
												{product.description}
											</td> */}
											<td className="border border-gray-300 px-4 py-2">
												{formatCurrencyString({
													value: product.price,
													currency: 'USD',
												})}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												<button className="bg-[#005438] hover:bg-[#005438ee] text-white py-1 px-2 rounded-md mr-2">
													Edit
												</button>
												<button
													onClick={() =>
														handleDelete(product.id)
													}
													className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className=" border-slate-200 rounded-lg p-6 border-2">
						<div className="flex flex-row justify-between items-center mb-3">
							<h1
								style={{ fontFamily: 'Lobster Two' }}
								className=" text-2xl"
							>
								Order History
							</h1>
						</div>
						<div className="overflow-x-auto">
							<table className="min-w-full border-collapse border border-gray-300">
								<thead>
									<tr>
										<th className="border border-gray-300 px-4 py-2">
											Order ID
										</th>
										<th className="border border-gray-300 px-4 py-2">
											Date
										</th>
										<th className="border border-gray-300 px-4 py-2">
											Items
										</th>
										{/* <th className="border border-gray-300 px-4 py-2">
											Total
										</th> */}
										<th className="border border-gray-300 px-4 py-2">
											Customized Message
										</th>
										<th className="border border-gray-300 px-4 py-2">
											Status
										</th>
										<th className="border border-gray-300 px-4 py-2">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => (
										<tr key={order.id}>
											<td className="border border-gray-300 px-4 py-2">
												{order.id.split('-')[0]}...
											</td>
											<td className="border border-gray-300 px-4 py-2">
												{format(
													new Date(order.updatedAt),
													'MMM d, yyyy',
												)}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												<ul>
													{order?.line_items?.map(
														(item, index) => (
															<li key={index}>
																{
																	item?.price?.product_data
																		?.name
																}{' '}
																(X{item?.quantity})
															</li>
														),
													)}
												</ul>
											</td>
											<td className="border border-gray-300 px-4 py-2">
												<div>
													{order?.line_items?.map(
														(item, index) => (
															<div key={index}>
																<ul>
																	{item?.product_data?.customMessages?.toString().split(',').map((message, index) => (
																	<li key={index}>
																		{message}
																	</li>))}
																</ul>
															</div>
														),
													)}
												</div>
											</td>
											{/* <td className="border border-gray-300 px-4 py-2">
												${order.total}
											</td> */}
											{/* <td className="border border-gray-300 px-4 py-2">
												<ul>
<<<<<<< HEAD
													{order?.customized_message
														?.toString()
														.split(',')
														.map((message, index) => (
															<li key={index}>{message}</li>
														))}
												</ul>
											</td>
=======
												{order?.line_items?.product_data?.customMessages?.toString().split(',').map((message, index) => (
												<li key={index}>
													{message}
												</li>))}</ul>
											</td> */}
>>>>>>> f10bb03 (feat: customize and add cart)
											<td className="border border-gray-300 px-4 py-2">
												{order.paid ? 'Paid' : 'Not Paid'}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												<button
													onClick={() =>
														router.push(
															`/admin/order/${order?.id}`,
														)
													}
													className="bg-[#7b7c7c] hover:bg-[#005438ee] text-white py-1 px-2 rounded-md mr-2"
												>
													View
												</button>
												{/* {order.confirm_delivery ? (
													<button
														onClick={() =>
															handleDelete(product.id)
														}
														className="bg-[#005438] hover:bg-[#005438] text-white py-1 px-2 rounded-md"
													>
														Delivered
													</button>
												) : (
													<button
														onClick={() =>
															handleDelete(product.id)
														}
														className="bg-[#005438] hover:bg-[#005438] text-white py-1 px-2 rounded-md"
													>
														Mark as Delivered
													</button>
												)} */}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	return (
		<>
			<div className="grid h-screen px-4 bg-white place-content-center">
				<div className="text-center">
					<p className="mt-4 text-text text-2xl">
						You should sign Up to view Admin Page
					</p>

					<button
						onClick={() => router.push('/login')}
						className="inline-block px-5 py-3 mt-6 text-sm font-medium text-text bg-primary rounded hover:bg-primary focus:outline-none focus:ring"
					>
						Login / Register
					</button>
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps(ctx) {
	const cards = await getCards(process.env);
	return { props: { cards } };
}
 