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
	} = useShoppingCart();
	console.log(cartDetails);
	const [products, setProducts] = useState([]);
	const [address, setAddress] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [customMessage, setCustomMessage] = useState('');
	const [country, setCountry] = useState('US');
	const [zip, setZip] = useState('');
	const [loading, setLoading] = useState(true);
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();

	const countries = [
		{ name: 'United States of Ameria', code: 'US' },
	];

	const handleChange = (event) => {
		setCity(event.target.value);
	};

	const handleCountryChange = (event) => {
		setCountry(event.target.value);
	};

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}
		if (window?.location.href.includes('success')) {
			setIsSuccess(true);
			clearCart();
		}
	}, []);

	const [totalPrice, setTotalPrice] = useState(0);

	const storedToken = localStorage.getItem('token');

	async function stripeCheckout() {
		const response = await axios.post(`/api/checkout`, {
			email: user.data.email,
			name: user.data.name,
			user_id: user.data.id,
			phone_number: user.data.phone_number,
			address,
			country,
			zip,
			city,
			customMessage,
			token: storedToken,
			cartProducts: cartDetails,
		});

		if (response.data.url) {
			window.location = response.data.url;
		} else {
			toast.error('An error occured!!');
		}
	}

	const { removeItem } = useShoppingCart();

	const removeItemFromCart = () => {
		removeItem(item.id);
	};

	if (isSuccess) {
		return (
			<>
				<Success />
			</>
		);
	}

	if (user) {
		return (
			<>
				<section className="flex justify-between max-md:flex-col space-x-4 ">
					<div className=" md:w-2/3  px-4">
						<div className=" mt-10 md:mt-6 ">
							<header className="text-center flex justify-between w-full">
								<h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
									Checkout
								</h1>
							</header>
							{!cartDetails ? (
								<p className="my-6 text-center ">
									Your cart is empty
								</p>
							) : (
								<>
									{Object.values(cartDetails ?? {}).map(
										(entry) => (
											// <CartItem
											// 	key={entry.id}
											// 	item={entry}
											// />
											<div
												key={entry.id}
												className="flex items-center gap-4 mb-3 mt-2"
											>
												<div>
													<img
														alt="product image"
														src={entry.front_img_url}
														className="h-14 w-14 rounded-md"
													/>
												</div>
												<div>
													{entry.title}{' '}
													<span className="text-xs">
														({entry.quantity})
													</span>
												</div>
												<div className="ml-auto">
													{formatCurrencyString({
														value: entry.price,
														currency: 'USD',
													})}
												</div>
												<button
													onClick={() =>
														removeItemFromCart()
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
											</div>
										),
									)}

									<div class="col-span-12 pt-5 pl-3">
										<label class="mb-1 block text-sm font-medium text-text">
											Customize Card Message (optional)
										</label>
										<input
											type="text"
											name="customMessage"
											class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
											placeholder="Have a good fishing..."
											value={customMessage}
											onChange={(ev) =>
												setCustomMessage(ev.target.value)
											}
										/>
									</div>

									<div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
										<div className=" max-w-md space-y-4">
											<dl className="space-y-0.5 text-md text-gray-700">
												<div className="flex justify-between">
													<dt>Subtotal</dt>
													<dd>{formattedTotalPrice}</dd>
												</div>

												{/* <strike className="flex justify-between">
													<dt>VAT</dt>
													<dd>{formattedTotalPrice}</dd>
												</strike> */}

												<div className="flex justify-between !text-base font-medium">
													<dt>Total</dt>
													<dd>{formattedTotalPrice}</dd>
												</div>
											</dl>

											<div className="flex justify-end">
												<Link
													class="group flex items-center justify-between gap-4 rounded-lg border border-current px-4 py-2 text-[#00553A] transition-colors hover:bg-[#00553A] focus:outline-none focus:ring active:bg-[#00553A]"
													href="/"
												>
													<span class="font-medium transition-colors group-hover:text-white">
														Continue shopping
													</span>

													<span class="shrink-0 rounded-full border border-[#00553A] bg-white p-2 group-active:border-[#00553A]">
														<svg
															class="h-4 w-4 rtl:rotate-180"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M17 8l4 4m0 0l-4 4m4-4H3"
															/>
														</svg>
													</span>
												</Link>
											</div>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
					{!cartDetails ? (
						''
					) : (
						<div className="md:1/3 mt-16 md:mt-6">
							<header className="text-start flex flex-col w-full">
								<h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
									Shipping details
								</h1>
								<p className="mt-2 text-text text-lg">
									We use your account details for shipping.
								</p>
							</header>
							<div class="mx-auto max-w-xl p-4 border shadow-xl h-[400px] my-3">
								<div class="space-y-5">
									<div class="grid grid-cols-12 gap-5">
										<div class="col-span-6">
											<label class="mb-1 block text-sm font-medium text-text">
												Email
											</label>
											<input
												type="email"
												name="email"
												class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
												value={user.data.email}
												placeholder="Email"
											/>
										</div>
										<div class="col-span-6">
											<label class="mb-1 block text-sm font-medium text-text">
												Full Name
											</label>
											<input
												type="text"
												name="name"
												class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
												value={user.data.name}
												placeholder="Full name"
											/>
										</div>
										<div class="col-span-12">
											<label class="mb-1 block text-sm font-medium text-text">
												Address
											</label>
											<input
												type="text"
												name="address"
												className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
												placeholder="1864 Main Street"
												value={address}
												onChange={(ev) =>
													setAddress(ev.target.value)
												}
												required
											/>
										</div>
										<div class="col-span-6">
											<label class="mb-1 block text-sm font-medium text-text">
												State
											</label>
											<select
												id="stateSelect"
												value={city}
												onChange={handleChange}
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
										<div class="col-span-4">
											<label class="mb-1 block text-sm font-medium text-text">
												Country
											</label>
											<select
												id="stateSelect"
												value={country}
												onChange={handleChange}
												className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
											>
												{countries.map((country) => (
													<option
														key={country.code}
														value={country.code}
													>
														{country.code}
													</option>
												))}
											</select>
										</div>
										<div class="col-span-2">
											<label class="mb-1 block text-sm font-medium text-text">
												Zip
											</label>
											<input
												type="text"
												name="zip"
												class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
												placeholder=""
												value={zip}
												onChange={(ev) =>
													setZip(ev.target.value)
												}
												required
											/>
										</div>
										<div class="col-span-12 text-center w-full">
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
					)}
				</section>
			</>
		);
	}

	return (
		<>
			<div className="grid h-screen px-4 bg-white place-content-center">
				<div className="text-center">
					<p className="mt-4 text-text text-2xl">
						You should sign Up to view cart Items
					</p>

					<button
						onClick={() => router.push('/login')}
						className="inline-block px-5 py-3 mt-6 text-sm font-medium text-text bg-primary rounded hover:bg-primary focus:outline-none focus:ring"
					>
						Login / Register
					</button>
				</div>
			</div>
		</>
	);
}
