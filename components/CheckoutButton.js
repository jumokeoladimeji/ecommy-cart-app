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
				console.log(result);
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

	console.log('total price', totalPrice);
	return (
		<article className="mt-3 flex flex-col">
			<div className="text-red-700 text-xs mb-3 h-5 text-center">
				{totalPrice && totalPrice < 0.3
					? 'You must have at least $0.30 in your basket'
					: // : cartCount && cartCount > 3
					// ? "You cannot have more than 3 items"
					status === 'redirect-error'
					? 'Unable to redirect to Stripe checkout page'
					: status === 'no-items'
					? 'Please add some items to your cart'
					: null}
			</div>
			<button
				onClick={goToCart}
				className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 py-3 px-5 rounded-md w-100 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-white"
				// disabled={
				//   (totalPrice && totalPrice >= 0) ||
				//   (cartCount && cartCount >= 0 ) ||
				//   status == "no-items"
				//     ? true
				//     : false
				// }
			>
				{status !== 'loading'
					? 'Proceed to checkout'
					: 'Loading...'}
			</button>
		</article>
	);
}
