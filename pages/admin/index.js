import { useContext, useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { getUserOrders } from '../api/order';
import { UserContext } from '../context/UserContext';
import { getCards } from '../api/card';
import { formatCurrencyString } from 'use-shopping-cart';

export default function AdminDashboard({ cards }) {
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);
	const router = useRouter();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			getUserOrders({ id: user.data.id })
				.then((res) => {
					setOrders(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log('No user logged in');
		}
	}, []);

	console.log(cards);

	const isAuth = user && token;

	if (!isAuth) {
		router.push('/login');
	}

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
										<th className="border border-gray-300 px-4 py-2">
											Total
										</th>
										<th className="border border-gray-300 px-4 py-2">
											Status
										</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => (
										<tr key={order.id}>
											<td className="border border-gray-300 px-4 py-2">
												{order.id}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												{order.date}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												<ul>
													{order.items.map(
														(item, index) => (
															<li key={index}>
																{item.name}
															</li>
														),
													)}
												</ul>
											</td>
											<td className="border border-gray-300 px-4 py-2">
												{order.total}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												{order.status}
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
								Products
							</h1>
							<button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md mr-2">
								Add Product
							</button>
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
										<th className="border border-gray-300 px-4 py-2">
											Description
										</th>
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
											<td className="border border-gray-300 px-4 py-2">
												{product.description}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												{formatCurrencyString({
													value: product.price,
													currency: 'USD',
												})}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												<button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md mr-2">
													Edit
												</button>
												<button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md">
													Delete
												</button>
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
}

export async function getServerSideProps(ctx) {
	const cards = await getCards(process.env);
	return { props: { cards } };
}
