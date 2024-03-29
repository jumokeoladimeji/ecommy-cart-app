import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

export default function Success() {
	const router = useRouter();
	const { clearCart } = useShoppingCart();
	useEffect(() => {
		clearCart();
		localStorage.removeItem("golfingCardItems")
		localStorage.removeItem("fishingCardItems")
	}, []);
	return (
		<>
			<div className="justify-center px-10">
				<h1 className="text-center text-xl font-bold pt-48">
					Your payment was successful. Thank you for your
					purchase.{' '}
					<b>Shipping via USPS in 1-3 business days.</b>
				</h1>
				<button
					className="text-center w-[100%] items-center bg-[#02533C] text-white font-bold py-2 px-4 rounded-full mt-4"
					onClick={() => router.push('/')}
				>
					Back To Home Page
				</button>
			</div>
		</>
	);
}
