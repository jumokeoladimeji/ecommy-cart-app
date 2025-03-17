import { UserContext } from '@/context/UserContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useShoppingCart } from 'use-shopping-cart';

export default function CheckoutButton() {
	const [status, setStatus] = useState('idle');
	const router = useRouter();
	const {
		redirectToCheckout,
		cartCount,
		totalPrice,
		cartDetails,
	} = useShoppingCart();
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);

	async function handleClick(event) {
		event.preventDefault();
		if (cartCount > 0) {
			setStatus('loading');
			try {
				const result = await redirectToCheckout();
				if (result?.error) {
					console.error(result);
					setStatus('redirect-error');
				}
			} catch (error) {
				console.error(error);
				setStatus('redirect-error');
			}
		} else {
			setStatus('no-items');
		}
	}

	async function stripeCheckout() {
		const response = await axios.post('/api/checkout', {
			email: user.data.email,
			name: user.data.name,
			// address,
			// country,
			// zip,
			// city,
			cartProducts: cartDetails,
			buy_twelve_pay_for_ten: false
		});

		if (response.data.url) {
			window.location = response.data.url;
		} else {
			toast.error('An error occured!!');
		}
	}

	async function goToCart() {
		router.push('/cart');
	}

	return (
		<article className="mt-3 flex flex-col">
			<div className="text-red-700 text-xs mb-3 h-5 text-center">
				{totalPrice && totalPrice < 14.95
					? 'You must have at least $14.95 in your basket'
					: status === 'redirect-error'
					? 'Unable to redirect to Stripe checkout page'
					: status === 'no-items'
					? 'Please add some items to your cart'
					: null}
			</div>
			<button
				onClick={goToCart}
				className="bg-[#02533C] hover:bg-[#02533cd7] hover:text-white transition-colors duration-500 text-white py-3 px-5 rounded-md w-100 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-white"
			>
				{status !== 'loading'
					? 'Proceed to checkout'
					: 'Loading...'}
			</button>
		</article>
	);
}
