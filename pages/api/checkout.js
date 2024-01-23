import { getOneCard } from './card';
import { createOrder } from './order';

const stripe = require('stripe')(
	process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
);

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.json('Should be a post request');
		return;
	}

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

	// console.log(cartProducts);

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

	// console.log(orderData, token);

	const orderDoc = await createOrder(orderData, token);

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: 'payment',
		customer_email: email,
		success_url: `${process.env.NEXT_PUBLIC_URL}/api/success?orderId=${orderDoc?.id}&token=${token}`,
		cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
		metadata: {
			orderId: orderDoc?.id,
			token: token,
		},
	});

	res.json({
		url: session.url,
	});
}
