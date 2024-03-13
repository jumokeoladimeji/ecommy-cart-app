import { UserContext } from '../../../context/UserContext';
import {
	getOneOrder,
	updateOrder,
} from '../../../pages/api/order';
import { useRouter } from 'next/router';
import React, {
	useContext,
	useEffect,
	useState,
} from 'react';
import { formatCurrencyString } from 'use-shopping-cart';
import { add, format } from 'date-fns';

const Loading = () => {
	return (
		<div className="flex items-center justify-center flex-col h-screen">
			<div className="border-t-8 border-[#015438] border-solid rounded-full animate-spin w-24 h-24"></div>
			<p>Loading. Please wait...</p>
		</div>
	);
};

const index = () => {
	const router = useRouter();
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);
	const id = router.query.id;
	const [order, setOrder] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				setLoading(true);
				if (user && id) {
					const res = await getOneOrder(id, token);

					setOrder(res);
					setLoading(false);
				} else {
					setLoading(false);
				}
			} catch (error) {
				setLoading(false);
			}
		};

		fetchOrder();
	}, [user, token, id]);


	const confirmDelivery = async () => {
		const update = {
			confirm_delivery: '1',
		};

		const updated = await updateOrder(id, update, token);
		router.reload();
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="pt-10 px-5">
			<div>
				<h1 className="font-bold text-3xl uppercase">
					#Order {order?.id}
				</h1>
			</div>
			<div className="py-10">
				<h1 className="font-bold text-xl mb-3">
					Purchased Items
				</h1>

				<div className="overflow-x-auto">
					<table className="min-w-full border-collapse border border-gray-300">
						<thead>
							<tr>
								{/* <th className="border border-gray-300 px-4 py-2">
									Date
								</th> */}
								<th className="border border-gray-300 px-4 py-2">
									Item
								</th>
								{!order?.line_items?.[0]
									?.buy_twelve_pay_for_ten ? (
									<th className="border border-gray-300 px-4 py-2">
										Customized Message
									</th>
								) : (
									''
								)}
								<th className="border border-gray-300 px-4 py-2">
									Shipping Information
								</th>
								<th className="border border-gray-300 px-4 py-2">
									Status
								</th>
								{/* <th className="border border-gray-300 px-4 py-2">
									Actions
								</th> */}
							</tr>
						</thead>
						<tbody>
							{order?.line_items?.map((item, index) => (
								<tr key={index}>
									{/* <td className="border border-gray-300 px-4 py-2">
										{order?.id?.split('-')[0]}...
									</td> */}
									{/* <td className="border border-gray-300 px-4 py-2">
										{format(
											new Date(order?.updatedAt),
											'MMM d, yyyy',
										)}
									</td> */}
									<td className="border border-gray-300 px-4 py-2">
										<ul>
											<li>
												{
													item.price_data?.product_data
														?.name
												}{' '}
												(X{item?.quantity})
											</li>
										</ul>
									</td>
									{!item.buy_twelve_pay_for_ten ? (
										<td className="border border-gray-300 px-4 py-2">
											{item.product_data?.customMessages?.map(
												(message, ind) => (
													<div key={ind}>
														{message ? `- ${message}` : ''}
													</div>
												),
											)}
										</td>
									) : (
										''
									)}
									<td className="border border-gray-300 px-4 py-2">
										<ul>
											<li>
												Sender's Name:{' '}
												{
													item?.product_data
														?.shippingAddress?.name
												}
											</li>
											<li>
												Phone Number:{' '}
												{
													item?.product_data
														?.shippingAddress?.phoneNumber
												}
											</li>
											<li>
												Email:{' '}
												{
													item?.product_data
														?.shippingAddress?.email
												}
											</li>

											<li>
												<b>RECIPIENT'S DETAILS</b>
											</li>
											<li>
												Recipient's Name:{' '}
												{
													item?.product_data
														?.shippingAddress?.rName
												}
											</li>
											<li>
												Address:{' '}
												{
													item?.product_data
														?.shippingAddress?.address
												}
											</li>
											<li>
												State:{' '}
												{
													item?.product_data
														?.shippingAddress?.state
												}
											</li>
											<li>
												Country:{' '}
												{
													item?.product_data
														?.shippingAddress?.country
												}
											</li>
											<li>
												Zip:{' '}
												{
													item?.product_data
														?.shippingAddress?.zip
												}
											</li>
										</ul>
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{order.paid ? 'Paid' : 'Not Paid'}
									</td>
									{/* <td className="border border-gray-300 px-4 py-2"> */}
									{/* <button
											onClick={() =>
												router.push(
													`/admin/order/${order?.id}`,
												)
											}
											className="bg-[#7b7c7c] hover:bg-[#005438ee] text-white py-1 px-2 rounded-md mr-2"
										>
											View
										</button> */}
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
									{/* </td> */}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div>
				{order?.paid ? (
					<>
						{order?.confirm_delivery === '0' ? (
							<button
								onClick={() => confirmDelivery()}
								className="bg-[#005438] w-34 text-white px-4 py-2 rounded-md hover:bg-[#005438] transition duration-300"
							>
								Mailed
							</button>
						) : (
							<button className="bg-[#005438] w-28 text-white px-4 py-2 rounded-md hover:bg-[#005438] transition duration-300">
								Delivered
							</button>
						)}
					</>
				) : (
					<div className="bg-red-500 text-white p-4 rounded-md w-28 text-center">
						<h1>Not Paid</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default index;
