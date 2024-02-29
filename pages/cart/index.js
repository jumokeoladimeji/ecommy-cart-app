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
import Modal from '@/components/Modal';

export default function Cart() {
	const {
		cartProducts,
		removeProduct,
		addProduct,
		clearCart,
	} = useContext(CartContext);
	const [isAddressModalOpen, setIsAddressModalOpen] =
		useState(false);

	const [senderName, setSenderName] = useState('');
	const [senderAddress, setSenderAddress] = useState('');
	const [senderState, setSenderState] = useState('');
	const [senderCountry, setSenderCountry] = useState('');
	const [senderZip, setSenderZip] = useState('');
	const [senderPhoneNumber, setSenderPhoneNumber] =
		useState('');
	const [senderEmail, setSenderEmail] = useState('');

	const countries = [
		{ name: 'United States of Ameria', code: 'US' },
	];

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

		const fishingCardsInCart =
			JSON.parse(
				localStorage.getItem('fishingCardItems'),
			) || [];
		const golfingCardsInCart =
			JSON.parse(
				localStorage.getItem('golfingCardItems'),
			) || [];
		products = [
			...fishingCardsInCart,
			...golfingCardsInCart,
		];
		setCartItems(products);
	}, []);

	const storedToken = localStorage.getItem('token');

	let productSum = 0;
	if (cartItems.length > 0) {
		cartItems.forEach((item, ind) => {
			productSum += item.product.price;
		});
	}

	async function stripeCheckout() {
		if (
			senderEmail == '' ||
			senderName == '' ||
			senderPhoneNumber == ''
		) {
			toast.error('Please enter all details');
			return;
		}

		console.log(senderEmail, senderName, senderPhoneNumber);

		const shippingAdd = cartItems.map(
			(item) => item.product_data.shippingAddress,
		);

		const response = await axios.post(`/api/checkout`, {
			// email: cartItems[0].product_data?.shippingAddress?.email,
			// name: cartItems[0].product_data?.shippingAddress?.name,
			email: senderEmail,
			name: senderName,
			// user_id: user.data.id,
			phone_number: senderPhoneNumber,
			address: '',
			country: 'US',
			zip: 0,
			state: '',
			full_address: shippingAdd,
			token: storedToken,
			cartProducts: cartDetails,
			buy_twelve_pay_for_ten: false,
			cartItems,
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
	};

	const removeItemFromCart = (item, index) => {
		decrementItem(item.product.id);
		const fishingCardsInCart =
			JSON.parse(
				localStorage.getItem('fishingCardItems'),
			) || [];
		const golfingCardsInCart =
			JSON.parse(
				localStorage.getItem('golfingCardItems'),
			) || [];
		switch (item.product.title) {
			case 'Fish Card':
				removeFromCart(index, fishingCardsInCart);
				localStorage.setItem(
					'fishingCardItems',
					JSON.stringify(fishingCardsInCart),
				);
				break;
			case 'Golf Card':
				const indexToDelete =
					index - fishingCardsInCart.length;
				removeFromCart(indexToDelete, golfingCardsInCart);
				localStorage.setItem(
					'golfingCardItems',
					JSON.stringify(golfingCardsInCart),
				);

				break;
			default:
		}
		setCartItems([
			...fishingCardsInCart,
			...golfingCardsInCart,
		]);
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

	// if (user) {
	console.log('cartItems', cartItems);
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
						{!cartItems || cartItems.length === 0 ? (
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
												{/* <th className="border border-gray-300 px-4 py-2">
													Image
												</th> */}
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
											{cartItems?.map((item, index) => (
												<tr key={index}>
													<td className="border border-gray-300 px-4 py-2">
														<ul>
															<li>
																{item?.product?.title}
															</li>
														</ul>
													</td>
													{/* <td>
														<img
															alt="product image"
															src={
																item?.product?.front_img_url
															}
															className="h-14 w-14 rounded-md"
														/>
													</td> */}
													<td className="border border-gray-300 px-4 py-2">
														{item.product_data?.customMessages?.map(
															(message, ind) => (
																<div key={ind}>
																	{message}
																</div>
															),
														)}
													</td>
													<td className="border border-gray-300 px-4 py-2">
														<ul>
															<li>
																Name:{' '}
																{
																	item?.product_data
																		?.shippingAddress?.name
																}
															</li>
															<li>
																Address:{' '}
																{
																	item?.product_data
																		?.shippingAddress
																		?.address
																}
															</li>
															<li>
																State:{' '}
																{
																	item?.product_data
																		?.shippingAddress?.state
																}
															</li>
															<li>
																Country:{' '}
																{
																	item?.product_data
																		?.shippingAddress
																		?.country
																}
															</li>
															<li>
																Zip:{' '}
																{
																	item?.product_data
																		?.shippingAddress?.zip
																}
															</li>
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
																removeItemFromCart(
																	item,
																	index,
																)
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
											<div className="flex justify-between !text-base font-medium">
												<dt>Total</dt>
												<dd>
													{formatCurrencyString({
														value: productSum,
														currency: 'USD',
													})}
												</dd>
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
										{/* Shipping Details Modal  */}
										<Modal
											isOpen={isAddressModalOpen}
											onClose={() =>
												setIsAddressModalOpen(false)
											}
										>
											<div className="md:1/3 mt-16 md:mt-6 py-10">
												<header className="text-start flex flex-col w-full">
													<h1 className="text-xl text-center font-bold text-gray-900 sm:text-3xl">
														Checkout Information
													</h1>
												</header>
												<div className="mx-auto max-w-xl p-4 border shadow-xl my-3">
													<div className="space-y-5">
														<div className="grid grid-cols-12 gap-5">
															<div className="col-span-12">
																<label className="mb-1 block text-sm font-medium text-text">
																	Your Name
																</label>
																<input
																	type="text"
																	name="recipient_name"
																	className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
																	onChange={(text) =>
																		setSenderName(
																			text.target.value,
																		)
																	}
																	value={senderName}
																	placeholder="Your name"
																/>
															</div>
															<div className="col-span-12">
																<label className="mb-1 block text-sm font-medium text-text">
																	Email Address
																</label>
																<input
																	type="text"
																	name="address"
																	className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
																	placeholder="your email address"
																	onChange={(text) =>
																		setSenderEmail(
																			text.target.value,
																		)
																	}
																	value={senderEmail}
																	required
																/>
															</div>
															<div className="col-span-12">
																<label className="mb-1 block text-sm font-medium text-text">
																	Address
																</label>
																<input
																	type="text"
																	name="address"
																	className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
																	placeholder="1864 Main Street"
																	onChange={(text) =>
																		setSenderAddress(
																			text.target.value,
																		)
																	}
																	value={senderAddress}
																	required
																/>
															</div>
															<div className="col-span-6">
																<label className="mb-1 block text-sm font-medium text-text">
																	State
																</label>
																<select
																	id="stateSelect"
																	onChange={(text) =>
																		setSenderState(
																			text.target.value,
																		)
																	}
																	value={senderState}
																	className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
																>
																	<option value="">
																		Select a state
																	</option>
																	{states.map((state) => (
																		<option
																			key={state.name}
																			value={state.name}
																		>
																			{state.name}
																		</option>
																	))}
																</select>
															</div>
															<div className="col-span-6">
																<label className="mb-1 block text-sm font-medium text-text">
																	Country
																</label>
																<select
																	id="countrySelect"
																	onChange={(text) =>
																		setSenderCountry(
																			text.target.value,
																		)
																	}
																	value={senderCountry}
																	className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
																>
																	{countries.map(
																		(country) => (
																			<option
																				key={country.code}
																				value={country.code}
																			>
																				{country.code}
																			</option>
																		),
																	)}
																</select>
															</div>
															<div className="col-span-6">
																<label className="mb-1 block text-sm font-medium text-text">
																	Zip
																</label>
																<input
																	type="text"
																	name="zip"
																	className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
																	placeholder=""
																	onChange={(text) =>
																		setSenderZip(
																			text.target.value,
																		)
																	}
																	value={senderZip}
																	required
																/>
															</div>
															<div className="col-span-6">
																<label className="mb-1 block text-sm font-medium text-text">
																	Phone Number
																</label>
																<input
																	type="text"
																	name="zip"
																	className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
																	placeholder=""
																	onChange={(text) =>
																		setSenderPhoneNumber(
																			text.target.value,
																		)
																	}
																	value={senderPhoneNumber}
																	required
																/>
															</div>
															<div className="col-span-12 text-center w-full">
																<button
																	onClick={stripeCheckout}
																	className="block rounded border border-[#00553A] bg-white p-2 px-5 py-3 text-md text-text transition hover:bg-[#00553A] hover:text-white w-full"
																>
																	Checkout
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</Modal>
										<div className="text-center">
											<button
												onClick={() =>
													setIsAddressModalOpen(true)
												}
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

// 	return (
// 		<>
// 			<div className="grid h-screen px-4 bg-white place-content-center">
// 				<div className="text-center">
// 					<p className="mt-4 text-text text-2xl">
// 						You should sign in to view cart items
// 					</p>

// 					<button
// 						onClick={() => router.push('/login')}
// 						className="inline-block px-5 py-3 bg-[#02533C] text-white mt-6 text-sm font-medium text-text bg-primary rounded hover:bg-primary focus:outline-none focus:ring"
// 					>
// 						Login / Register
// 					</button>
// 				</div>
// 			</div>
// 		</>
// 	);
// }
