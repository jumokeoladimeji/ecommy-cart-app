import { createOrder } from './order';

const stripe = require('stripe')(
	process.env.STRIPE_SECRET_KEY,
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
			state,
			country,
			zip,
			cartProducts,
			phoneNumber,
			token,
			full_address,
			buy_twelve_pay_for_ten,
			cartItems
		} = req.body;

		const line_items = Object.values(cartProducts).map(
			(item) => ({
				quantity: item.quantity,
				price: item.id,
			}),
		);

		const prodForOrder = buy_twelve_pay_for_ten ? cartProducts : cartItems
	

		const order_line_items = Object.values(
			prodForOrder,
		).map((item) => ({
			quantity: item.quantity,
			product_data: {
				...item.product_data,
				shippingAddress: {
					...item.product_data.shippingAddress,
					...{ email, name, phoneNumber}
				}
			},
			price_data: item.price_data,
			buy_twelve_pay_for_ten
		}));

		const orderData = {
			line_items: order_line_items,
			user_id,
			email,
			name,
			address1: address,
			country,
			zip,
			full_address,
			state,
			shipping_phone_number: phoneNumber,
			paid: false,
		};

		const orderDoc = await createOrder(orderData, token);

		const totalQuantity = line_items?.reduce(
			(acc, item) => acc + item.quantity,
			0,
		);


		const stripeObj = {
			line_items,
			mode: 'payment',
			customer_email: email,
			success_url: `${process.env.NEXT_PUBLIC_URL}/api/success?orderId=${orderDoc?.id}`,
			cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
			metadata: {
				orderId: orderDoc?.id,
				token: token,
			}
		}

		if (totalQuantity >= 12) {
			const session = await stripe.checkout.sessions.create(
				{
					...stripeObj,
					discounts: [
						{
							coupon: `jfXJ0ZiR`, // coupon for dozen cards
						},
					],
				},
			);
			
			res.json({
				url: session.url,
			});
		} else {
			const session = await stripe.checkout.sessions.create(stripeObj); // for single card
			res.json({
				url: session.url,
			});
		}
	} catch(error) {
		console.error('Error creating session:', error);
		res
			.status(500)
			.json({ error: 'Internal Server Error' });
	}
}
