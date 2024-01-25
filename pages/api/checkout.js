import { getOneCard } from './card';
import { createOrder } from './order';

const stripe = require('stripe')(
	process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
);

export default async function handler(req, res) {
	console.log(req.method);
	if (req.method === 'POST') {
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
					product_data: item.product_data,
					price_data: item.price_data,
				}),
			);

			const orderData = {
				line_items,
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

			const orderDoc = await createOrder(orderData, token);

			const session = await stripe.checkout.sessions.create(
				{
					line_items,
					shipping_options: [
						{
							shipping_rate_data: {
								type: 'fixed_amount',
								fixed_amount: {
									amount: 1000,
									currency: 'usd',
								},
								display_name: 'Classic Shipping',
								delivery_estimate: {
									minimum: {
										unit: 'business_day',
										value: 5,
									},
									maximum: {
										unit: 'business_day',
										value: 7,
									},
								},
							},
						},
					],
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

			res.json({
				url: session.url,
			});
		} catch {
			console.error('Error processing checkout:');
			res
				.status(500)
				.json({ error: 'Internal Server Error' });
		}
	} else return;
}
