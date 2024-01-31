import { useShoppingCart } from 'use-shopping-cart';
import { updateOrder } from './order';

export default async function handler(req, res) {
	// Retrieve the order ID from the metadata in the request
	const orderId = req.query.orderId;
	const token = req.query.token;

	const update = {
		confirm_delivery: '0',
		paid: 1,
	};

	const updated = await updateOrder(orderId, update, token);

	// Optionally, retrieve additional order details or perform other actions

	// Redirect or respond accordingly
	res.redirect(`${process.env.NEXT_PUBLIC_URL}/success`); // Update this URL
}
