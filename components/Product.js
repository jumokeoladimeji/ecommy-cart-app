import { useState } from "react";
import { formatCurrencyString } from "use-shopping-cart";
import { useShoppingCart } from "use-shopping-cart";
import Link from "next/link";

export default function Product({ product }) {
  const { addItem } = useShoppingCart();
  console.log('product', product)
  const { name, price, img_url, id, description, card_id , available_quantity } = product;
  const [quantity, setQuantity] = useState(1);
  console.log('quantity intial', quantity)
  const cardPage = '/cards/'+card_id

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
	console.log('quantity', quantity)
    addItem(product, { count: quantity });
    setQuantity(1);
  };

  return (
    <article className="flex flex-col gap-3 bg-white p-8 rounded-xl shadow-md text-center mb-6">
      {/* <div className="text-8xl cursor-default">{emoji}</div> */}
      	<div className="text-lg">{name}</div>
      <div className="text-2xl font-semibold mt-auto">
			<Link
				href={{ pathname: cardPage, query: product}}
				as={cardPage}
				passHref>
				<img
				src={img_url}
				className="h-auto max-w-full rounded-lg"
				alt="" />
				<p className="text-gray-500 text-sm text-left line-clamp-3 hidden md:block">
					{description}
				</p>
            </Link>
        {formatCurrencyString({ value: price, currency: "USD" })}
      </div>
      <div className="flex justify-around items-center mt-4 mb-2 ">
        <button
          onClick={decreaseQuantity}
          className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
        >
          -
        </button>
        <span className="w-10 text-center rounded-md mx-3">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
        >
          +
        </button>
      </div>
      <button
        onClick={() => addToCart()}
        className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 rounded-md px-5 py-2"
      >
        Add to cart
      </button>
    </article>
  );
}
