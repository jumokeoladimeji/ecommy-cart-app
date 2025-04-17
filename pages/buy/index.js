import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { formatCurrencyString } from 'use-shopping-cart';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { City }  from 'country-state-city';

import { getCategories } from '@/pages/api/category';
import Category from '@/components/Category';
import { UserContext } from '@/context/UserContext';
import { CategoriesContext } from '@/context/CategoryContext';
import Spinner from '@/components/Spinner';
import Modal from '@/components/Modal';
import states from '@/data/states';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';

export default function Buy() {
	const router = useRouter();
	const [golfingQuantity, setGolfingQuantity] = useState(0);
	const [fishingQuantity, setFishingQuantity] = useState(0);
	const [selectedState, setselectedState] = useState('');
	const [cities, setCities] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAddressModalOpen, setIsAddressModalOpen] =
		useState(false);
	const countries = [
		{ name: 'United States of Ameria', code: 'US' },
	];

	useEffect(() => {
		if (selectedState) {
			let filteredState = states.find(state => state.name === selectedState);
			const data = City.getCitiesOfState('US', filteredState.abbreviation);
			setCities(data);
		}
	}, [selectedState])

	// form validation rules
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		phoneNumber: Yup.string()
			.matches(
				/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
				'Invalid phone number',
			)
			.required('Phone number is required'),
		zip: Yup.string()
			.matches(/^\d{5}(?:-\d{4})?$/, 'Invalid ZIP code')
			.required('ZIP code is required'),
	});
	const formOptions = {
		resolver: yupResolver(validationSchema),
	};

	const { register, handleSubmit, formState } =
		useForm(formOptions);
	const { errors } = formState;

	const storedToken = localStorage.getItem('token');
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);
	const { categories } = useContext(CategoriesContext);

	const cards = [];
	categories.map((category, ind) => {
		let card = category.cards.map(
			({
				stripe_product_id: id,
				id: card_id,
				...rest
			}) => ({
				id,
				card_id,
				...rest,
			}),
		);
		cards.push(...card);
	});

	const decreaseQuantity = (card) => {
		if (
			card.title === 'Fish Card' &&
			fishingQuantity >= 1
		) {
			setFishingQuantity(fishingQuantity - 1);
		}

		if (
			card.title === 'Golf Card' &&
			golfingQuantity >= 1
		) {
			setGolfingQuantity(golfingQuantity - 1);
		}
	};

	const increaseQuantity = (card) => {
		if (fishingQuantity + golfingQuantity === 12) {
			toast.error('You can only select 12 Cards');
			return;
		}
		if (card.title === 'Fish Card') {
			setFishingQuantity(fishingQuantity + 1);
		}

		if (card.title === 'Golf Card') {
			setGolfingQuantity(golfingQuantity + 1);
		}
	};

	const handleCardNumberSubmit = () => {
		setIsModalOpen(false);
		setIsAddressModalOpen(true);
	};

	async function onSubmit(address) {
		setIsAddressModalOpen(false);

		let quantity = 0;
		let cardsToBuy = {};

		const processCard = (card, specificQuantity) => {
			if (specificQuantity > 0) {
				quantity = specificQuantity;
				cardsToBuy[card.id] = {
					...card,
					price_data: {
						currency: 'USD',
						product_data: {
							name: card.title,
						},
						unit_amount: quantity * card.price,
					},
					product_data: {
						customMessages: [],
						shippingAddress: address,
					},
					quantity,
					value: card.price * quantity,
				};
			}
		};

		cards.forEach((card) => {
			switch (card.title) {
				case 'Fish Card':
					processCard(card, fishingQuantity);
					break;
				case 'Golf Card':
					processCard(card, golfingQuantity);
					break;
				default:
			}
		});
		stripeCheckout(cardsToBuy, address);
	}

	async function stripeCheckout(cartProducts, address) {
		const response = await axios.post(`/api/checkout`, {
			email: address.email,
			name: address.name,
			// user_id: user.data.id,
			phoneNumber: address.phoneNumber,
			address: address.address,
			state: address.state,
			country: address.country,
			zip: address.zip,
			token: storedToken,
			cartProducts,
			full_address: address,
			buy_twelve_pay_for_ten: true,
			recipient_name: address.rName,
		});

		if (response.data.url) {
			window.location = response.data.url;
		} else {
			toast.error('An error occured!!');
		}
	}

	return (
		<div className="bg-[#fff] pt-10 md:pt-0">
			<div className="px-5 md:px-10 text-center">
				{/* Buy 12 Modal  */}
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				>
					<div className="border-slate-200 rounded-lg p-6 border-2 overflow-y-scroll">
						<div className="flex flex-row justify-between items-center">
							<h1
								style={{ fontFamily: 'Lobster Two' }}
								className=" text-2xl"
							>
								Select Number of Cards
							</h1>
							<button onClick={() => setIsModalOpen(false)}>
								Close
							</button>
						</div>

						<div className="mx-auto mt-8">
							{cards.map((card, i) => (
								<div
									key={i}
									className="flex items-center gap-4 mb-3 mt-2"
								>
									<div>
										<img
											alt="product image"
											src={card?.front_img_url}
											className="h-14 w-14 rounded-md"
										/>
									</div>
									<div className="ml-auto">
										{card.title}
									</div>
									<div className="ml-auto">
										{formatCurrencyString({
											value: card?.price,
											currency: 'USD',
										})}
									</div>
									<div className="flex justify-around items-center mt-4 mb-2 ">
										<button
											onClick={() => decreaseQuantity(card)}
											className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
										>
											-
										</button>
										<span className="w-10 text-center rounded-md mx-3">
											{card.title === 'Fish Card'
												? fishingQuantity
												: golfingQuantity}
										</span>
										<button
											onClick={() => increaseQuantity(card)}
											className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
										>
											+
										</button>
									</div>
								</div>
							))}
						</div>
						<button
							disabled={
								fishingQuantity + golfingQuantity < 12
									? true
									: false
							}
							className="bg-[#005438] text-white text-sm px-4 py-2 rounded-md hover:bg-[#005438] transition duration-300"
							onClick={handleCardNumberSubmit}
						>
							Save and Add Shipping Details
						</button>
					</div>
				</Modal>

				{/* Shipping details modal  */}
				<Modal
					isOpen={isAddressModalOpen}
					onClose={() => setIsAddressModalOpen(false)}
					// className="lg:w-2/3"
				>
					<div className="py-10">
						<div className="flex flex-row justify-end">
							<button
								onClick={() =>
									setIsAddressModalOpen(false) &&
									setIsModalOpen(true)
								}
								className="bg-red-600 transition-colors duration-500 text-[#fff] rounded-md px-5 py-2"
							>
								X
							</button>
						</div>
						<header className="text-start flex flex-col w-full">
							<h1 className="text-xl font-bold text-gray-900 sm:text-3xl text-center">
								Shipping details
							</h1>
							{/* <p className="mt-2 text-text text-lg">
									Input the recipient
								</p> */}
						</header>
						<form
							className="mx-auto max-w-xl p-4 border border-1 text-left  my-3"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="space-y-5">
								<div className="grid grid-cols-12 gap-5">
									<div className="col-span-12">
										<label className="mb-1 block text-sm font-medium text-text">
											Full Name
										</label>
										<input
											type="text"
											name="name"
											className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
											{...register('name')}
											placeholder="Full name"
										/>
									</div>
									<div className="col-span-12">
										<label className="mb-1 block text-sm font-medium text-text">
											Your Email Address
										</label>
										<input
											type="text"
											name="email"
											className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
											{...register('email')}
											placeholder="Your email address"
										/>
										<div className="invalid-feedback text-red-600 text-sm">
											{errors.email?.message}
										</div>
									</div>
									<div className="col-span-12">
										<label className="mb-1 block text-sm font-medium text-text">
											Your Phone Number
										</label>
										<input
											type="text"
											name="phoneNumber"
											className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
											{...register('phoneNumber')}
											placeholder="Your phone number"
										/>
										<div className="invalid-feedback text-red-600 text-sm">
											{errors.phoneNumber?.message}
										</div>
									</div>
									{/* <div className="col-span-12">
										<label className="mb-1 block text-sm font-medium text-text">
											Recipient's Name
										</label>
										<input
											type="text"
											name="rName"
											className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
											{...register('rName')}
											placeholder="Recipient's name"
										/>
									</div> */}
									<div className="col-span-12">
										<label className="mb-1 block text-sm font-medium text-text">
											Your Address
										</label>
										<input
											type="text"
											name="address"
											className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
											placeholder="1864 Main Street"
											{...register('address')}
											required
										/>
									</div>
									<div className="col-span-6">
										<label className="mb-1 block text-sm font-medium text-text">
											State
										</label>
										<select
											id="stateSelect"
											{...register('state')}
											onChange={(e) => {
												setselectedState(e.target.value)
											}}
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
									<div className="col-span-8">
										<label className="mb-1 block text-sm font-medium text-text">
											City
										</label>
										<select
											id="citySelect"
											{...register('city')}
											className="block w-full rounded-md p-1 text-[18px] border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
										>
											<option value="">
												Select a City
											</option>
											{cities.map((city) => (
												<option
													key={city.name}
													value={city.name}
												>
													{city.name}
												</option>
											))}
										</select>
									</div>
									<div className="col-span-4">
										<label className="mb-1 block text-sm font-medium text-text">
											Country
										</label>
										<select
											id="countrySelect"
											{...register('country')}
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
									<div className="col-span-6">
										<label className="mb-1 block text-sm font-medium text-text">
											Zip
										</label>
										<input
											type="text"
											name="zip"
											className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
											placeholder=""
											{...register('zip')}
											required
										/>
										<div className="invalid-feedback text-red-600 text-sm">
											{errors.zip?.message}
										</div>
									</div>
									<div className="col-span-12 text-center w-full">
										<button
											type="submit"
											// onClick={addToCart}
											className="block rounded border border-[#00553A] bg-white p-2 px-5 py-3 text-md text-text transition hover:bg-[#00553A] hover:text-white w-full"
										>
											Checkout
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</Modal>

				{/* Cards to Buy  */}
				<div className="flex flex-col md:flex-row gap-2 md:gap-10 items-start">
					<div className="w-[100%] md:w-[60%] flex flex-col md:flex-col mt-1 md:mt-10 mb-3 md:mb-0 justify-center md:justify-start">
						<div className="hidden md:block">
							<h1
								style={{ fontFamily: 'Lobster Two' }}
								className="text-4xl text-center leading-snug w-[95%] font-normal  mx-3 lg:mx-0 lg:text-6xl lg:leading-snug"
							>
								The Big Card{' '} <br/>
								<span className="text-[#01533B] font-extrabold">
									4" x 14"
								</span>{' '}
							</h1>
							<span className="text-lg italic text-center">
								With Free Shipping
							</span>
							<p className="text-xl mt-8 px-5 md:px-0">
								Watch the video to learn how to buy.
							</p>
							<div className="flex flex-row justify-center">
								<MdOutlineKeyboardDoubleArrowDown
									size={40}
								/>
							</div>
						</div>

						<div className="hidden md:flex flex-col w-[100%] gap-3 bg-[#fff] p-0 md:p-2 rounded-lg shadow-md text-center mb-5">
							<iframe
								width="560"
								height="315"
								src="https://www.youtube.com/embed/FSiP61dtdZQ?si=TcQiqmlwccLnh9UN"
								title="YouTube video player"
								// frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
								className="w-full object-cover rounded-lg"
								referrerpolicy="strict-origin-when-cross-origin" 
							></iframe>
							
						</div>
						<div className="flex md:hidden flex-col w-[100%] bg-[#fff] p-0 md:p-2 rounded-lg shadow-md text-center mb-0">
							<iframe
								width="560"
								height="215"
								src="https://www.youtube.com/embed/FSiP61dtdZQ?si=TcQiqmlwccLnh9UN"
								title="YouTube video player"
								// frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
								referrerpolicy="strict-origin-when-cross-origin" 
								className="w-full object-cover rounded-lg"
							></iframe>
						</div>
					</div>
					<div className="">
						{!categories || categories?.length === 0 ? (
							<Spinner className="flex-1 justify-center align-middle text-center" />
						) : (
							categories?.map((category) => (
								<Category
									category={category}
									key={category.id}
								/>
							))
						)}
					</div>
				</div>
				{/* Promo Banner */}
				<div className="flex flex-col md:flex-row items-start mx-auto max-w-7xl pt-5 md:pt-5">
					<div className="py-0 px-0 md:px-0 md:flex flex-col items-center gap-3 lg:gap-5 w-[100%] md:w-[50%] mr-5">
						<div className="flex flex-col w-full gap-3 bg-[#fff] p-2 md:p-2 rounded-lg shadow-md text-center mb-5">
							<img src="/fishing1.jpeg" alt="" />
							<img src="/golfing1.jpeg" alt="" />
						</div>
					</div>
					<div className="landing-text text-left w-[100%] md:w-[50%] ml-0 md:ml-5">
						<h1
							style={{ fontFamily: 'Lobster Two' }}
							className="text-4xl leading-snug w-[90%] font-normal text-left mx-0 md:mx-3 lg:mx-0 lg:text-6xl lg:leading-snug"
						>
							Get{' '}
							<span className="text-[#01533B] font-extrabold">
								12 greeting cards
							</span>{' '}
							for the price of 10 
						</h1>
						<p className="text-left text-xl mt-2 md:px-0 px-0">
							Tell us how many of each “fish” and “golf”
							rulers you need to make 12, we’ll ship them
							and your envelopes to you{' '}
							<span className="text-[#005534] font-bold text-2xl">
								FREE!
							</span>
						</p>
						<p className="text-left text-xl mt-2 md:px-0 px-0">
						<span className="text-[#005534] font-bold text-2xl">
							Best Deal Yet:{' '}
						</span>Pay for 10, Get 12!
						</p>
						<button
							onClick={() => setIsModalOpen(true)}
							className="bg-[#00543A] hover:bg-[#f1f1f1] mt-5 hover:text-[#00543A] transition-colors duration-500 text-[#fff] rounded-md px-5 py-3 text-lg"
						>
							Buy Now!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

// export async function getServerSideProps(ctx) {
//     const categories = await getCategories();
//     return { props: { categories } };
// }
