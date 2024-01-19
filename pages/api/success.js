import { updateOrder } from './order';

export default async function handler(req, res) {
	// Retrieve the order ID from the metadata in the request
	const orderId = req.query.orderId;

	const update = {
		paid: true,
	};

	updateOrder(orderId, update);

	// Optionally, retrieve additional order details or perform other actions

	// Redirect or respond accordingly
	res.redirect(`${process.env.NEXT_PUBLIC_URL}/success`); // Update this URL
}
