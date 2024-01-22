import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { FaUserAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { getUserOrders } from './api/order';

export default function Profile() {
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);
	const router = useRouter();
	const [orders, setOrders] = useState([]);
	const [showEdit, setShowEdit] = useState(false);

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

	const showEditModal = () => {
		setShowEdit(true);
	};

	const closeEditModal = () => {
		setShowEdit(false);
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
								Customer Information
							</h1>
							<button
								onClick={() => showEditModal()}
								className="bg-[#005438] w-20 text-white px-4 py-2 rounded-md hover:bg-[#005438] transition duration-300"
							>
								Edit
							</button>
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
					{!showEdit ? (
						<button
							onClick={() => showEditModal()}
							className="bg-[#005438] w-32 text-white px-4 py-2 rounded-md hover:bg-[#005438] transition duration-300"
						>
							Edit Profile
						</button>
					) : (
						<button
							onClick={() => closeEditModal()}
							className="bg-[#ac2f2f] w-32 text-white px-4 py-2 rounded-md hover:bg-[#ac2f2f] transition duration-300"
						>
							Close
						</button>
					)}

					{showEdit && (
						<div className=" border-slate-200 rounded-lg p-6 border-2">
							<div className="flex flex-row justify-between items-center">
								<h1
									style={{ fontFamily: 'Lobster Two' }}
									className=" text-2xl"
								>
									Update Profile
								</h1>
							</div>

							<div className="mx-auto mt-8">
								<form
									onSubmit={handleSubmit}
									className="space-y-4"
								>
									<div>
										<label
											htmlFor="firstName"
											className="block text-gray-600"
										>
											First Name
										</label>
										<input
											type="text"
											id="firstName"
											name="firstName"
											value={formData.firstName}
											onChange={handleInputChange}
											className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
										/>
									</div>
									<div>
										<label
											htmlFor="lastName"
											className="block text-gray-600"
										>
											Last Name
										</label>
										<input
											type="text"
											id="lastName"
											name="lastName"
											value={formData.lastName}
											onChange={handleInputChange}
											className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
										/>
									</div>
									<div>
										<label
											htmlFor="email"
											className="block text-gray-600"
										>
											Email
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
										/>
									</div>

									<button
										type="submit"
										className="bg-[#005438] text-white px-4 py-2 rounded-md hover:bg-[#005438] transition duration-300"
									>
										Update Profile
									</button>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	return (
		<>
			<div className="grid h-screen px-4 bg-white place-content-center">
				<div className="text-center">
					<p className="mt-4 text-text text-2xl">
						You should sign Up to view profile
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
