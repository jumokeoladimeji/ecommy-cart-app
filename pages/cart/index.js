import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { CartContext } from '../../context/CartContext';
import Success from '../success';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';

export default function Cart() {
	const {
		cartProducts,
		removeProduct,
		addProduct,
		clearCart,
	} = useContext(CartContext);
	const [products, setProducts] = useState([]);
	const [address, setAddress] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [zip, setZip] = useState('');
	const [loading, setLoading] = useState(true);
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setLoading(true);
		if (cartProducts.length > 0) {
			axios
				.post('/api/cart', { ids: cartProducts })
				.then((response) => {
					setProducts(response.data);
					setLoading(false);
				});
		} else {
			setProducts([]);
			setLoading(false);
		}
	}, [cartProducts]);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}
		if (window?.location.href.includes('success')) {
			setIsSuccess(true);
			clearCart();
		}
	}, []);

	let total = 0;
	for (const productId of cartProducts) {
		const price =
			products.find((p) => p._id === productId)?.price || 0;
		total += price;
	}

	let subTotal = 0;
	for (const productId of cartProducts) {
		const price =
			cartProducts.find((p) => p.id === productId)?.price ||
			0;
		subTotal = total + total / 1000;
	}

	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		// Function to calculate total price
		const calculateTotalPrice = () => {
			let totalPrice = 0;

			// Iterate through each item in the cartProducts array
			cartProducts.forEach((item) => {
				// Check if the item has count and productId properties
				if (
					item.count &&
					item.productId &&
					item.productId.price
				) {
					// Multiply count by price and add to the total
					totalPrice += item.count * item.productId.price;
				}
			});

			// Update the state with the total price
			setTotalPrice(totalPrice);
		};

		// Call the function to calculate total price when cartProducts change
		calculateTotalPrice();
	}, [cartProducts]);

	function increaseProduct(id) {
		addProduct(id);
	}

	function decreaseProduct(id) {
		removeProduct(id);
		toast.success('Removed product!!');
	}
	function deleteCart(id) {
		clearCart();
		toast.success('Cart cleared!!');
	}

	const formatPrice = (price) => {
		return price
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	async function stripeCheckout() {
		const response = await axios.post('/api/checkout', {
			email: user.data.email,
			name: user.data.name,
			address,
			country,
			zip,
			city,
			cartProducts,
		});

		if (response.data.url) {
			window.location = response.data.url;
		} else {
			toast.error('An error occured!!');
		}
	}
	console.log(cartProducts);

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
						<div className=" mt-16 md:mt-6 ">
							<header className="text-center flex justify-between w-full">
								<h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
									Your Cart
								</h1>
							</header>
							{!loading ? (
								<div className="flex justify-center items-center h-screen">
									<p className="my-6 text-center ">
										Your cart is empty
									</p>
								</div>
							) : !cartProducts?.length ? (
								<p className="my-6 text-center ">
									Your cart is empty
								</p>
							) : (
								<>
									{cartProducts?.length > 0 &&
										cartProducts.map((product) => (
											<div
												key={product.productId.id}
												className="mt-8"
											>
												<ul className="space-y-4">
													<li className="flex items-center gap-4 justify-between">
														<img
															src={
																product.productId
																	.front_img_url
															}
															alt=""
															className="h-16 w-16 rounded object-cover"
														/>

														<div>
															<h3 className="text-md text-text max-w-md">
																{product.productId.title}
															</h3>

															<dl className="mt-0.5 space-y-px text-[10px] text-text">
																<p>
																	${' '}
																	{formatPrice(
																		product.productId
																			.price / 100,
																	) *
																		formatPrice(
																			product.count,
																		)}
																</p>
															</dl>
														</div>

														<div>
															<label
																htmlFor="Quantity"
																className="sr-only"
															>
																{' '}
																Quantity{' '}
															</label>

															<div className="flex items-center gap-1">
																<button
																	type="button"
																	className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border "
																>
																	X {product.count}
																</button>
															</div>
														</div>
													</li>
												</ul>
											</div>
										))}

									<div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
										<div className=" max-w-md space-y-4">
											<dl className="space-y-0.5 text-md text-gray-700">
												<div className="flex justify-end text-red-400 border-b mb-3">
													<button onClick={deleteCart}>
														Clear Cart
													</button>
												</div>
												<div className="flex justify-between">
													<dt>Subtotal</dt>
													<dd>$ {totalPrice / 100}</dd>
												</div>

												<strike className="flex justify-between">
													<dt>VAT</dt>
													<dd>
														$ {formatPrice(total / 1000)}
													</dd>
												</strike>

												<div className="flex justify-between !text-base font-medium">
													<dt>Total</dt>
													<dd>$ {totalPrice / 100}</dd>
												</div>
											</dl>

											<div className="flex justify-end">
												<Link
													class="group flex items-center justify-between gap-4 rounded-lg border border-current px-4 py-2 text-orange-600 transition-colors hover:bg-orange-600 focus:outline-none focus:ring active:bg-orange-500"
													href="/"
												>
													<span class="font-medium transition-colors group-hover:text-white">
														Continue shopping
													</span>

													<span class="shrink-0 rounded-full border border-orange-600 bg-white p-2 group-active:border-orange-500">
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
					{!cartProducts.length ? (
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
												class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
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
												City
											</label>
											<input
												type="text"
												name="city"
												class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
												placeholder=""
												value={city}
												onChange={(ev) =>
													setCity(ev.target.value)
												}
												required
											/>
										</div>
										<div class="col-span-4">
											<label class="mb-1 block text-sm font-medium text-text">
												State
											</label>
											<input
												type="text"
												name="state"
												class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
												placeholder=""
												value={country}
												onChange={(ev) =>
													setCountry(ev.target.value)
												}
												required
											/>
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
												className="block rounded border border-orange-600 bg-white p-2 px-5 py-3 text-md text-text transition hover:bg-orange-600 w-full"
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
