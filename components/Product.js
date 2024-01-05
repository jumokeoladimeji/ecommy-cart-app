import { useState } from "react";
import { formatCurrencyString } from "use-shopping-cart";
import { useShoppingCart } from "use-shopping-cart";
import Link from "next/link";

export default function Product({ product }) {
  const { addItem } = useShoppingCart();
  console.log('product', product)
  const {
		name,
		price,
		img_url,
		id,
		description,
		card_id,
		available_quantity,
		front_img_url,
		back_img_url,
		title,
	} = product;
	const [quantity, setQuantity] = useState(1);
	console.log('quantity intial', quantity);
	const cardPage = '/cards/' + card_id;

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const addToCart = () => {
		console.log('quantity', quantity);
		addItem(product, { count: quantity });
		setQuantity(1);
	};

	return (
		<article className="flex flex-col gap-3 bg-[#fff] p-4 md:p-8 rounded-md shadow-md text-center mb-6">
			{/* <div className="text-8xl cursor-default">{emoji}</div> */}

			<div className="text-2xl font-semibold mt-auto">
				<Link
					href={{ pathname: cardPage, query: product }}
					as={cardPage}
					passHref
				>
					<div className="flex flex-row items-center gap-2">
						<div>
							<img
								src={front_img_url}
								className="h-auto max-w-full rounded-md md:rounded-none"
								alt=""
							/>
							{/* <p className="text-lg">{name}</p> */}
							<p
								style={{ fontFamily: 'Lobster Two' }}
								className="text-xl font-normal py-3"
							>
								{title} (Front)
							</p>
						</div>
						<div>
							<img
								src={back_img_url}
								className="h-auto max-w-full rounded-md md:rounded-none"
								alt=""
							/>
							{/* <p className="text-lg">{name}</p> */}
							<p
								style={{ fontFamily: 'Lobster Two' }}
								className="text-xl font-normal py-3"
							>
								{title} (Back)
							</p>
						</div>
					</div>
				</Link>
			</div>
			<div className="flex flex-col gap-2 text-2xl font-bold">
				<p className="text-gray-500 text-sm text-center line-clamp-3 hidden md:block">
					{description}
				</p>
				{formatCurrencyString({
					value: price,
					currency: 'USD',
				})}
				<button
					onClick={() => addToCart()}
					className="bg-emerald-50 w-full md:w-1/3 mx-auto hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 rounded-md px-5 py-2"
				>
					Add to cart
				</button>
			</div>
		</article>
	);
}
