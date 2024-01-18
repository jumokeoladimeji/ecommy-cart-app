import { useRouter } from 'next/router';

export default function Success() {
	const router = useRouter();
	return (
		<>
			<div className="justify-center">
				<h1 className="text-center text-xl font-bold pt-48">
					Your payment was successful. Thank you for your
					purchase.
				</h1>
				<button
					className="text-center w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded-full mt-4"
					onClick={() => router.push('/')}
				>
					Go Home
				</button>
			</div>
		</>
	);
}
