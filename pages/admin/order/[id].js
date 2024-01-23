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
	// console.log(id);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				setLoading(true);
				if (user && id) {
					const res = await getOneOrder(id, token);

					setOrder(res);
					setLoading(false);
				} else {
					console.log('No user logged in');
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		fetchOrder();
	}, [user, token, id]);

	console.log(order);

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
				<ul>
					{order?.line_items?.map((item, index) => (
						// <li key={index}>
						// 	{item.price_data?.product_data?.name} (X
						// 	{item?.quantity})
						// </li>
						<div
							key={index}
							className="flex flex-row gap-14 mb-3"
						>
							<div className="flex flex-row gap-3">
								<p>{item.price_data?.product_data?.name}</p>
								<p>X{item?.quantity}</p>
							</div>
							<div>
								<p className="font-bold">
									$
									{(item.price_data?.unit_amount *
										item?.quantity) /
										100}
								</p>
							</div>
						</div>
					))}
				</ul>
				<div className="pt-5">
					<p className="font-bold mb-2">
						Customized Message{' '}
					</p>
					<p>{order?.customized_message}</p>
				</div>
			</div>
			<div className="py-5">
				<h1 className="font-bold text-xl mb-3">
					Shipping Information
				</h1>
				<div className="flex flex-row gap-14 mb-3">
					<div className="flex flex-col gap-1">
						<p className="font-bold">Address</p>
						<p>{order?.addresses?.address1},</p>
						<p>{order?.addresses?.city}</p>
						<p>{order?.addresses?.zip}</p>
						<p>{order?.addresses?.country}</p>
						<p className="font-bold">Contact Information</p>
						<p>{order?.shipping_phone_number}</p>
					</div>
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
								Confirm Delivery
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
