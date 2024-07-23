import { useEffect, useState } from 'react';
import {
	formatCurrencyString,
	useShoppingCart,
} from 'use-shopping-cart';
import { useForm } from 'react-hook-form';
import { City }  from 'country-state-city';

import toast from 'react-hot-toast';
import CarouselList from './Carousel';
import Modal from './Modal';

import { messages } from '@/data/messages';
import states from '@/data/states';
import { useRouter } from 'next/router';

const itemsPerPage = 6;

export default function Product({ product }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAddressModalOpen, setIsAddressModalOpen] =
		useState(false);
	const [selectedState, setselectedState] = useState('');
	const [cities, setCities] = useState([])

	const countries = [
		{ name: 'United States of Ameria', code: 'US' },
	];
	const router = useRouter();

	const [customMessage, setCustomMessage] = useState('');
	const [customMessages, setCustomMessages] = useState([]);

	const { addItem, cartDetails, cartCount } =
		useShoppingCart();

	const { register, handleSubmit, formState, resetField } =
		useForm();

	const [currentPage, setCurrentPage] = useState(1);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const messagesForPage = messages?.slice(
		indexOfFirstItem,
		indexOfLastItem,
	);

	const totalPages = Math.ceil(
		messages.length / itemsPerPage,
	);

	// Function to handle page change
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const goToPrevPage = () => {
		setCurrentPage((prev) => prev - 1);
	};

	const goToNextPage = () => {
		setCurrentPage((prev) => prev + 1);
	};

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

	const addToCart = (address) => {
		const stringifiedArray = [
			JSON.stringify(customMessages),
			JSON.stringify(customMessage),
		];

		const array1 = JSON.parse(stringifiedArray[0]);
		const array2 = JSON.parse(stringifiedArray[1]);
		const customMessageArray = [...array1, array2];
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

		const productToAdd = {
			product,
			price_data: {
				currency: 'USD',
				product_data: {
					name: product.title,
				},
				unit_amount: quantity * product.price,
			},
			product_data: {
				customMessages: customMessageArray,
				shippingAddress: address,
			},
			quantity,
			value: product.price * quantity,
		};
		if (product.title === 'Fish Card') {
			const fishingCardsInCart =
				JSON.parse(
					localStorage.getItem('fishingCardItems'),
				) || [];
			fishingCardsInCart.push(productToAdd);
			localStorage.setItem(
				'fishingCardItems',
				JSON.stringify(fishingCardsInCart),
			);
		}

		if (product.title === 'Golf Card') {
			const golfingCardsInCart =
				JSON.parse(
					localStorage.getItem('golfingCardItems'),
				) || [];
			golfingCardsInCart.push(productToAdd);
			localStorage.setItem(
				'golfingCardItems',
				JSON.stringify(golfingCardsInCart),
			);
		}
		setQuantity(1);
		toast.success('Item added to cart');
		setCustomMessage('');
		setCustomMessages([]);
	};

	const slideImages = [
		{
			text: `${title} (Front)`,
			img: front_img_url,
		},
		{
			text: `${title} (Back)`,
			img: back_img_url,
		},
	];

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

	const handleCustomMessgSubmit = async (e) => {
		e.preventDefault();
		setIsModalOpen(false);
		setIsAddressModalOpen(true);
	};

	const handleCheckboxChange = (e) => {
		const { value } = e.target;
		if (customMessages.includes(value)) {
			// If already selected, remove it
			setCustomMessages(
				customMessages.filter((msg) => msg !== value),
			);
		} else {
			if (customMessages.length >= 4) {
				toast.error('You can only select 4 messages');
				return;
			}
			setCustomMessages([...customMessages, value]);
		}
	};

	useEffect(() => {
		if (selectedState) {
			let filteredState = states.find(state => state.name === selectedState);
			const data = City.getCitiesOfState('US', filteredState.abbreviation);
			setCities(data);
		}
	}, [selectedState])

	async function onSubmit(address) {
		setIsAddressModalOpen(false);
		addToCart(address);
		resetField('zip');
		resetField('rName');
		resetField('address');
		resetField('country');
		resetField('state');
		setTimeout(() => {
			router.push('/cart');
		}, 100);
	}

	return (
		<article className="flex flex-col gap-3 bg-[#fff] p-2 md:p-8 rounded-md md:shadow-xl border-2 md:border-none text-center my-6">
			<CarouselList cards={slideImages} />

			<div className="flex flex-col gap-2 font-bold text-[18px]">
				{formatCurrencyString({
					value: price,
					currency: 'USD',
				})}{' '}
				(FREE SHIPPING)
				<div className="flex flex-col sm:flex-col gap-3">
					<button
						onClick={() => setIsAddressModalOpen(true)}
						className="bg-[#00543A] mx-auto text-[18px] hover:bg-[#f1f1f1] hover:text-[#00543A] transition-colors duration-500 text-[#fff] rounded-md px-5 py-2"
					>
						Buy & Mail to yourself to fill it out
					</button>
					<button
						onClick={() => setIsModalOpen(true)}
						className="bg-[#00543A] mx-auto text-[18px] leading-tight hover:bg-[#f1f1f1] hover:text-[#00543A] transition-colors duration-500 text-[#fff] rounded-md px-5 py-2"
					>
						Buy & Customize a message to be mailed to your
						friend
					</button>
				</div>
				{/* Cutom message modal  */}
				<Modal
					isOpen={isModalOpen}
					// onClose={() => setIsModalOpen(false)}
					// className="z-10"
				>
					<div className="border-none md:border-slate-200 rounded-none md:rounded-lg p-2 md:border-2 -mt-10 py-8 pb-10">
						<div className="flex flex-row justify-between items-center pt-1 md:pt-0">
							<div>
								<div className="flex flex-row justify-between items-center">
									<h1
										style={{ fontFamily: 'Lobster Two' }}
										className=" text-3xl md:ml-20 text-left"
									>
										Add Custom Message To Shipping Envelope {' '}
										<span className="text-2xl font-bold">
											(Optional)
										</span>
									</h1>
								</div>
								<p className="text-[18px] leading-tight mt-3 md:ml-20 text-left">
									If you choose to customize the card, we
									can ship it to your family / friend
								</p>
							</div>
						</div>

						<div className="mx-auto mt-3 sm:px-20 px-0">
							<div className="space-y-4 -mb-1">
								<div className="col-span-12 pt-5 pl-3 font-normal">
									<label className="mb-1 block text-lg font-medium text-text text-left">
										Enter your handwritten message (up to 12
										words)
									</label>
									<textarea
										type="text"
										name="customMessage"
										className="block w-full rounded-md p-3 text-sm border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
										placeholder="Enter up to 12 words..."
										value={customMessage}
										onChange={handleInputChange}
										rows={4}
									/>
									<p className="text-sm text-left">
										Remaining words:{''}
										{12 -
											customMessage.trim().split(/\s+/)
												.length}
									</p>
									<div>
										<span className="font-bold text-[20px]">
											And
										</span>
										<p className="text-[18px]">
											{' '}
											Select from the options below.
											Check off up to 4 of the reasons you are sending it. (28 options)
										</p>
									</div>
									<div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-5 text-xs text-left">
										{messagesForPage.map(
											(message, index) => (
												<div
													key={index}
													className="flex items-start"
												>
													<input
														type="checkbox"
														id={message}
														value={message}
														checked={customMessages.includes(
															message,
														)}
														onChange={handleCheckboxChange}
														className="mr-2 mt-2 text-lg"
													/>
													<label
														htmlFor={message}
														className="text-lg font-bold"
													>
														{message}
													</label>
												</div>
											),
										)}
									</div>
								</div>
								<div className="flex justify-center mt-4 mb-5">
									<button
										onClick={goToPrevPage}
										disabled={currentPage === 1}
										className={`mx-1 px-3 py-1 rounded-md text-sm ${
											currentPage === 1
												? 'bg-gray-200 text-gray-500 cursor-not-allowed'
												: 'bg-[#005438] text-white'
										}`}
									>
										{'< Prev'}
									</button>
									<div className="mx-3">
										{currentPage} of {totalPages}
									</div>
									<button
										onClick={goToNextPage}
										disabled={currentPage === totalPages}
										className={`mx-1 px-3 py-1 rounded-md text-sm ${
											currentPage === totalPages
												? 'bg-gray-200 text-gray-500 cursor-not-allowed'
												: 'bg-[#005438] text-white'
										}`}
									>
										{'Next >'}
									</button>
								</div>
								<div className="flex flex-col gap-0 pt-10">
									<button
										type="submit"
										className="bg-[#005438] text-white text-lg mb-3 px-4 py-4 rounded-md hover:bg-[#005438] transition duration-300"
										onClick={handleCustomMessgSubmit}
									>
										Save and Add Shipping Details
									</button>
									<button
										onClick={() => {
											setIsModalOpen(false);
										}}
										className="cursor-pointer md:mr-0 bg-slate-400 text-white px-4 py-3 rounded-md text-xl"
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</Modal>
				{/* Shipping details modal  */}
				<Modal
					isOpen={isAddressModalOpen}
					onClose={() => setIsAddressModalOpen(false)}
					// className="lg:w-2/3"
				>
					<div className="py-10">
						<header className="text-start flex flex-col w-full">
							<h1 className="text-md font-bold text-gray-900 sm:text-3xl text-center">
								Enter Shipping details
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
											Recipient's Full Name
										</label>
										<input
											type="text"
											name="rName"
											className="block w-full text-[18px] rounded-md py-1 px-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
											{...register('rName')}
											placeholder="Full name"
										/>
									</div>
									<div className="col-span-12">
										<label className="mb-1 block text-sm font-medium text-text">
											Address
										</label>
										<input
											type="text"
											name="address"
											className="block w-full rounded-md py-1 px-3 text-[18px] border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
											placeholder="1864 Main Street"
											{...register('address')}
											required
										/>
									</div>
									<div className="col-span-8">
										<label className="mb-1 block text-sm font-medium text-text">
											State
										</label>
										<select
											id="stateSelect"
											{...register('state')}
											onChange={(e) => {
												setselectedState(e.target.value)
											}}
											className="block w-full rounded-md p-1 text-[18px] border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
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
											className="block w-full rounded-md p-1 text-[18px] border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
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
											className="block w-full rounded-md text-[18px] py-1 px-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
											placeholder=""
											{...register('zip')}
											required
										/>
									</div>
									<div className="col-span-12 text-center w-full">
										<button
											type="submit"
											// onClick={addToCart}
											className="block rounded border text-[18px] border-[#00553A] bg-white  px-5 py-1 text-md text-text transition hover:bg-[#00553A] hover:text-white w-full"
										>
											Add to cart
										</button>
										<button
											onClick={() =>
												setIsAddressModalOpen(false) &&
												setIsModalOpen(true)
											}
											className="bg-slate-600 block text-sm w-full mt-3 text-center hover:bg-[#f1f1f1] hover:text-[#00543A] transition-colors duration-500 text-[#fff] rounded-md px-5 py-2"
										>
											Close
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</Modal>
			</div>
		</article>
	);
}
