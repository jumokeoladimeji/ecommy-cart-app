import { getOneCard } from './card';
import { createOrder } from './order';

const stripe = require('stripe')(
	process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
);

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({
			message: `Method ${req.method} is not allowed`,
		});
	}

	try {
		const {
			email,
			name,
			user_id,
			address,
			country,
			zip,
			city,
			cartProducts,
			customMessage,
			phone_number,
			token,
		} = req.body;

		const line_items = Object.values(cartProducts).map(
			(item) => ({
				// id: item.id,
				quantity: item.quantity,
				// product_data: item.product_data,
				price: item.id,
			}),
		);

		const order_line_items = Object.values(
			cartProducts,
		).map((item) => ({
			// id: item.id,
			quantity: item.quantity,
			product_data: item.product_data,
			price: item.price_data,
		}));

		const orderData = {
			line_items: order_line_items,
			user_id,
			email,
			name,
			address1: address,
			city,
			country,
			zip,
			customized_message: customMessage,
			shipping_phone_number: phone_number,
			paid: false,
		};

		console.log(orderData);

		const orderDoc = await createOrder(orderData, token);
		// console.log(orderDoc.error);

		const totalQuantity = line_items?.reduce(
			(acc, item) => acc + item.quantity,
			0,
		);

		if (totalQuantity >= 12) {
			const session = await stripe.checkout.sessions.create(
				{
					line_items,
					mode: 'payment',
					customer_email: email,
					success_url: `${process.env.NEXT_PUBLIC_URL}/api/success?orderId=${orderDoc?.id}&token=${token}`,
					cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
					metadata: {
						orderId: orderDoc?.id,
						token: token,
					},
					discounts: [
						{
							coupon: `3MoIkOrK`,
						},
					],
				},
			);

			// console.log(session);

			res.json({
				url: session.url,
			});
		} else {
			const session = await stripe.checkout.sessions.create(
				{
					line_items,
					mode: 'payment',
					customer_email: email,
					success_url: `${process.env.NEXT_PUBLIC_URL}/api/success?orderId=${orderDoc?.id}&token=${token}`,
					cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
					metadata: {
						orderId: orderDoc?.id,
						token: token,
					},
				},
			);

			// console.log(session);

			res.json({
				url: session.url,
			});
		}
	} catch {
		console.log('error');
	}
}
