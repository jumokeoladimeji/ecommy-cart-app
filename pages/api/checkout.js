import { getOneCard } from './card';

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
		address,
		city,
		country,
		zip,
		cartProducts,
	} = req.body;

	const uniqueIds = [...new Set(cartProducts)];

	let line_items = [];

	for (const productId of uniqueIds) {
		// Assuming you have some way to fetch product information based on productId
		// Replace this with your own logic to fetch product details

		const productInfo = await getOneCard(
			productId.productId.card_id,
		);

		const quantity =
			cartProducts.filter((id) => id === productId)
				?.length || 0;

		if (quantity > 0 && productInfo) {
			line_items.push({
				quantity,
				price_data: {
					currency: 'USD',
					product_data: { name: productInfo.title },
					unit_amount: quantity * productInfo.price,
				},
			});
		}
	}

	console.log(line_items);
	console.log(`${process.env.NEXT_PUBLIC_URL}/success`);

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: 'payment',
		customer_email: email,
		success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
		cancel_url: `${process.env.NEXT_PUBLIC_URL}/success`,
	});

	res.json({
		url: session.url,
	});
}
