import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

export default function Success() {
	const router = useRouter();
	const { clearCart } = useShoppingCart();
	useEffect(() => {
		clearCart();
	}, []);
	return (
		<>
			<div className="justify-center px-10">
				<h1 className="text-center text-xl font-bold pt-48">
					Your payment was successful. Thank you for your
					purchase.
				</h1>
				<button
					className="text-center w-[100%] items-center bg-[#02533C] text-white font-bold py-2 px-4 rounded-full mt-4"
					onClick={() => router.push('/')}
				>
					Go Home
				</button>
			</div>
		</>
	);
}
