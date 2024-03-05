import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
	useShoppingCart,
	formatCurrencyString,
} from 'use-shopping-cart';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
	const { addItem } = useShoppingCart();
	const router = useRouter();
	const product = router.query;
	const {
		title,
		price,
		img_url,
		id,
		description,
		stripe_product_id,
		front_img_url,
	} = product;
	const [quantity, setQuantity] = useState(1);

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const addToCart = () => {
		addItem(product, {
			count: quantity,
			price_metadata: {
				currency: 'USD',
				product_data: {
					name: product.title,
				},
				unit_amount: quantity * product.price,
			},
		});
		setQuantity(1);
		toast.success('Item added to cart');
	};

	return (
		<div className="relative">
			{/* <CarouselList cards={imageUrls}/> */}
			<article className="flex flex-col gap-3 bg-white p-8  text-center mb-6">
				<div className="text-lg">{name}</div>
				<div className="text-2xl font-semibold mt-auto">
					<div className="flex flex-col md:flex-row gap-3 lg:gap-10">
						<div className="flex flex-row">
							<img
								src={front_img_url}
								className="h-96 w-full rounded-lg"
								// h-auto max-w-full rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30
								alt=""
							/>
						</div>
						<div className="text-left">
							<h1>{title}</h1>
							{/* <p className="text-gray-500 text-sm pt-4 text-left line-clamp-3 block">
								{description}
							</p> */}
							<div className="pt-10">
								{formatCurrencyString({
									value: price,
									currency: 'USD',
								})}
							</div>
							<div className="flex justify-around items-center mt-4 mb-2 ">
								<button
									onClick={decreaseQuantity}
									className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
								>
									-
								</button>
								<span className="w-10 text-center rounded-md mx-3">
									{quantity}
								</span>
								<button
									onClick={increaseQuantity}
									className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
								>
									+
								</button>
							</div>
							<button
								onClick={() => addToCart()}
								className="bg-emerald-50 mt-5 hover:bg-[#00543A] hover:text-white transition-colors duration-500 text-emerald-500 rounded-md px-5 py-2"
							>
								Add to cart
							</button>
						</div>
					</div>
				</div>
			</article>
		</div>
	);
}
