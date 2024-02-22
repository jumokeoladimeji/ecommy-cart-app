'use client'

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { CartContext } from '../../context/CartContext';
import Success from '../success';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';
import {
	formatCurrencyString,
	useShoppingCart,
	clearCart
} from 'use-shopping-cart';
import CartItem from '../../components/CartItem';
import Image from 'next/image';
const url =
	process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
import states from '../../data/states';

export default function Cart() {
    const {
		cartProducts,
		removeProduct,
		addProduct,
		clearCart,
	} = useContext(CartContext);

	const {
		shouldDisplayCart,
		cartCount,
		cartDetails,
		formattedTotalPrice,
		totalPrice,
	} = useShoppingCart();

    
    const { user, token, loginUser, logoutUser } =
    useContext(UserContext);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}
		if (window?.location.href.includes('success')) {
			setIsSuccess(true);
			clearCart();
		}
        let products;

        const fishingCardsInCart = JSON.parse(localStorage.getItem("fishingCardItems")) || [];
        const golfingCardsInCart = JSON.parse(localStorage.getItem("golfingCardItems")) || [];
        products = [...fishingCardsInCart, ...golfingCardsInCart]
        setCartItems(products)
	}, []);

    const storedToken = localStorage.getItem('token');

    let productSum = 0;
    if (cartItems.length > 0) {
        cartItems.forEach((item, ind) => {
            productSum += item.product.price;
        })
    }

    async function stripeCheckout() {

        const shippingAdd = cartItems.map(item => item.product_data.shippingAddress)

        const response = await axios.post(`/api/checkout`, {
			// email: cartItems[0].product_data?.shippingAddress?.email,
			// name: cartItems[0].product_data?.shippingAddress?.name,
            email: user.data.email,
            name: user.data.name,
			user_id: user.data.id,
			phone_number: user.data.phone_number,
			address: '',
			country: 'US',
			zip: 0,
            state: '',
            full_address:  shippingAdd,
			token: storedToken,
			cartProducts: cartDetails,
            buy_twelve_pay_for_ten: false,
            cartItems
		});

		if (response.data.url) {
			window.location = response.data.url;
		} else {
			toast.error('An error occured!!');
		}
	}

	const { decrementItem } = useShoppingCart();

    const removeFromCart = (indexToRemove, cartArray) => {
        // delete at index
        cartArray.splice(indexToRemove, 1);
    }

	const removeItemFromCart = (item, index) => {
		decrementItem(item.product.id);
        const fishingCardsInCart = JSON.parse(localStorage.getItem("fishingCardItems")) || [];
        const golfingCardsInCart = JSON.parse(localStorage.getItem("golfingCardItems")) || [];
        switch (item.product.title) {
            case 'Fish Card':
                removeFromCart(index, fishingCardsInCart);
                localStorage.setItem("fishingCardItems", JSON.stringify(fishingCardsInCart));
                break;
            case 'Golf Card':
                const indexToDelete = index - fishingCardsInCart.length
                removeFromCart(indexToDelete, golfingCardsInCart);
                localStorage.setItem("golfingCardItems", JSON.stringify(golfingCardsInCart));

                break;
            default:
        }
        setCartItems([...fishingCardsInCart, ...golfingCardsInCart])
	};

	const handleInputChange = (event) => {
		const inputText = event.target.value;
		const words = inputText.trim().split(/\s+/);
		if (words.length <= 12) {
			setCustomMessage(inputText);
		} else {
			// Truncate to first 12 words
			const truncatedText = words.slice(0, 12).join(' ');
			setCustomMessage(truncatedText);
		}
	};

	useEffect(() => {
		// Store the previous route in session storage
		sessionStorage.setItem('previousRoute', router.asPath);
	}, []);

	if (isSuccess) {
		clearCart();
		return (
			<>
				<Success />
			</>
		);
	}

	if (user) {
        console.log('cartItems', cartItems)
		return (
			<>
				<section className="flex justify-between max-md:flex-col space-x-4 ">
					<div className="px-4">
						<div className=" mt-10 md:mt-6 ">
							<header className="text-center flex justify-between w-full">
								<h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
									CART DETAILS
								</h1>
							</header>
							{ !cartItems || cartItems.length === 0 ? (
								<p className="my-6 text-center ">
									Your cart is empty
								</p>
							) : (
								<> 
                                <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse border border-gray-300">
                                            <thead>
                                                <tr>
                                                    <th className="border border-gray-300 px-4 py-2">
                                                        Item
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2">
                                                        Image
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2">
                                                        Customized Message
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2">
                                                        Shipping Information
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2">
                                                        Price
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems?.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            <ul>
                                                                <li>
                                                                    {
                                                                        item?.product?.title
                                                                    }
                                                                </li>	
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <img
                                                                alt="product image"
                                                                src={item?.product?.front_img_url}
                                                                className="h-14 w-14 rounded-md"
                                                            />
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {
                                                                item.product_data
                                                                    ?.customMessages
                                                                    ?.map((message, ind) => (
                                                                        <div key={ind}>
                                                                            {message}
                                                                        </div>))
                                                            }
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            <ul>
                                                                <li>Name: {item?.product_data?.shippingAddress?.name}</li>
                                                                <li>Address: {item?.product_data?.shippingAddress?.address}</li>
                                                                <li>State: {item?.product_data?.shippingAddress?.state}</li>
                                                                <li>Country: {item?.product_data?.shippingAddress?.country}</li>
                                                                <li>Zip: {item?.product_data?.shippingAddress?.zip}</li>
                                                            </ul>
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {formatCurrencyString({
                                                                value: item?.product.price,
                                                                currency: 'USD',
                                                            })}
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    removeItemFromCart(item, index)
                                                                }
                                                                className="hover:bg-emerald-50 transition-colors rounded-full duration-500 p-1"
                                                            >
                                                                <Image
                                                                    alt="delete icon"
                                                                    src="./trash.svg"
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
									<div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
										<div className=" max-w-md space-y-4">
											<dl className="space-y-0.5 text-md text-gray-700">
												{/* <div>
													{cartCount >= 12 ? (
														<p>
															<span className="font-bold">
																Congrats! $19.90 discount
																applied.
															</span>
														</p>
													) : (
														<p>
															Buy a minimun of{' '}
															<span className="font-bold">
																12 cards
															</span>{' '}
															and get a{' '}
															<span className="font-bold">
																$19.90 discount.
															</span>
														</p>
													)}
												</div> */}
												{/* <div className="flex justify-between">
													<dt>Subtotal</dt>
													<dd>{formattedTotalPrice}</dd>
												</div> */}

												<div className="flex justify-between !text-base font-medium">
													<dt>Total</dt>
                                                    <dd>{formatCurrencyString({
														value: productSum,
														currency: 'USD',
													})}</dd>
													{/* <dd>{productSum}</dd> */}
												</div>
											</dl>

											<div className="flex justify-end">
												<Link
													className="group flex items-center justify-between gap-4 rounded-lg border border-current px-4 py-2 text-[#00553A] transition-colors hover:bg-[#00553A] focus:outline-none focus:ring active:bg-[#00553A]"
													href="/buy"
												>
													<span className="font-medium transition-colors group-hover:text-white">
														Continue shopping
													</span>

													<span className="shrink-0 rounded-full border border-[#00553A] bg-white p-2 group-active:border-[#00553A]">
														<svg
															className="h-4 w-4 rtl:rotate-180"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="M17 8l4 4m0 0l-4 4m4-4H3"
															/>
														</svg>
													</span>
												</Link>
											</div>
                                            <div className="text-center">
                                        <button
                                            onClick={stripeCheckout}
                                            className="block rounded border border-[#00553A] bg-white p-2 px-5 py-3 text-md text-text transition hover:bg-[#00553A] hover:text-white w-full"
                                        >
                                            Checkout
                                        </button>
                                    </div>
										</div>
									</div>
                                    
								</>
							)}
						</div>
					</div>
					{/* {!cartDetails ? (
						''
					) : (
                        <div className="col-span-12 text-center w-full">
                            <button
                                onClick={stripeCheckout}
                                className="block rounded border border-[#00553A] bg-white p-2 px-5 py-3 text-md text-text transition hover:bg-[#00553A] hover:text-white w-full"
                            >
                                Checkout
                            </button>
                        </div>
					)} */}
				</section>
			</>
		);
	}

	return (
		<>
			<div className="grid h-screen px-4 bg-white place-content-center">
				<div className="text-center">
					<p className="mt-4 text-text text-2xl">
						You should sign in to view cart items
					</p>

					<button
						onClick={() => router.push('/login')}
						className="inline-block px-5 py-3 bg-[#02533C] text-white mt-6 text-sm font-medium text-text bg-primary rounded hover:bg-primary focus:outline-none focus:ring"
					>
						Login / Register
					</button>
				</div>
			</div>
		</>
	);
}
