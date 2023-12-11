import { useState } from "react";
import { useRouter } from 'next/router'
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";


export default function ProductDetails () {
  const { addItem } = useShoppingCart();
  const router = useRouter();
  const product = router.query;
  const { name, price, img_url, id, description, stripe_product_id } = product;
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
    addItem(product, { count: quantity });
    setQuantity(1);
  };

//   const imageUrls = 

  return (
    <div className="relative">
        {/* <CarouselList cards={imageUrls}/> */}
        <article className="flex flex-col gap-3 bg-white p-8 rounded-xl shadow-md text-center mb-6">
            <div className="text-lg">{name}</div>
            <div className="text-2xl font-semibold mt-auto">
                <img
                    src={img_url}
                    className="h-auto max-w-sm rounded-lg"
                    // h-auto max-w-full rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30
                    alt="" />
                <p className="text-gray-500 text-sm text-left line-clamp-3 hidden md:block">
                        {description}
                </p>
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
    </div>
  );
}