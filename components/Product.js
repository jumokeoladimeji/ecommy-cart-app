import { useState } from 'react';
import {
	formatCurrencyString,
	useShoppingCart,
} from 'use-shopping-cart';
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';
import CarouselList from './Carousel';
import Modal from './Modal';

import { messages } from '@/data/messages';
import states from '@/data/states';
import { useRouter } from 'next/router';

const itemsPerPage = 5;

export default function Product({ product }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAddressModalOpen, setIsAddressModalOpen] =
		useState(false);
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

	async function onSubmit(address) {
		console.log(address);
		setIsAddressModalOpen(false);
		addToCart(address);
		router.push('/cart');
		resetField('zip');
		resetField('rName');
		resetField('address');
		resetField('country');
		resetField('state');
	}

	return (
		<article className="flex flex-col gap-3 bg-[#fff] p-4 md:p-8 rounded-md shadow-xl text-center my-6">
			<CarouselList cards={slideImages} />

			<div className="flex flex-col gap-2 font-bold text-2xl">
				{formatCurrencyString({
					value: price,
					currency: 'USD',
				})}{' '}
				(FREE SHIPPING)
				<div className="flex flex-col sm:flex-col gap-3">
					<button
						onClick={() => setIsAddressModalOpen(true)}
						className="bg-[#00543A] mx-auto text-lg hover:bg-[#f1f1f1] hover:text-[#00543A] transition-colors duration-500 text-[#fff] rounded-md px-5 py-2"
					>
						Buy & Mail to yourself to fill it out
					</button>
					<button
						onClick={() => setIsModalOpen(true)}
						className="bg-[#00543A] mx-auto text-lg hover:bg-[#f1f1f1] hover:text-[#00543A] transition-colors duration-500 text-[#fff] rounded-md px-5 py-2"
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
					<div className="border-none md:border-slate-200 rounded-none md:rounded-lg p-6 md:border-2 -mt-10 py-14 pb-10">
						<div className="flex flex-row justify-between items-center pt-10 md:pt-0">
							<div>
								<div className="flex flex-row justify-between items-center">
									<h1
										style={{ fontFamily: 'Lobster Two' }}
										className=" text-2xl md:ml-20 text-left"
									>
										Add Custom Message{' '}
										<span className="text-2xl font-bold">
											(Optional)
										</span>
									</h1>
									<button
										onClick={() => {
											setIsModalOpen(false);
										}}
										className="cursor-pointer md:mr-0 bg-red-600 text-white px-4 py-2 rounded-md text-sm"
									>
										Close
									</button>
								</div>
								<p className="text-md mt-3 md:ml-20 text-center">
									If you choose to customize the card, we
									can ship it to your recipient
								</p>
							</div>
						</div>

						<div className="mx-auto mt-8 sm:px-20 px-0">
							<div className="space-y-4 -mb-1">
								<div className="col-span-12 pt-5 pl-3 font-normal">
									<label className="mb-1 block text-md font-medium text-text text-left">
										Enter your handwritten message (up to 12
										words)
									</label>
									<input
										type="text"
										name="customMessage"
										className="block w-full rounded-md p-3 text-sm border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
										placeholder="Enter up to 12 words..."
										value={customMessage}
										onChange={handleInputChange}
									/>
									<p className="text-sm text-left">
										Remaining words:{''}
										{12 -
											customMessage.trim().split(/\s+/)
												.length}
									</p>
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
								<div className="flex justify-center mt-4 mb-4">
									{Array.from(
										{ length: totalPages },
										(_, i) => (
											<button
												key={i}
												onClick={() =>
													handlePageChange(i + 1)
												}
												className={`mx-1 px-3 py-1 rounded-md ${
													currentPage === i + 1
														? 'bg-green-900 text-white'
														: 'bg-gray-200 text-gray-700'
												}`}
											>
												{i + 1}
											</button>
										),
									)}
								</div>
								<button
									type="submit"
									className="bg-[#005438] text-white text-lg mb-10 px-4 py-4 rounded-md hover:bg-[#005438] transition duration-300"
									onClick={handleCustomMessgSubmit}
								>
									Save and Add Shipping Details
								</button>
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
						<button
							onClick={() =>
								setIsAddressModalOpen(false) &&
								setIsModalOpen(true)
							}
							className="bg-red-600 text-sm flex justify-start text-center hover:bg-[#f1f1f1] hover:text-[#00543A] transition-colors duration-500 text-[#fff] rounded-md px-5 py-2"
						>
							Close
						</button>
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
											className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
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
									</div>
									<div className="col-span-12 text-center w-full">
										<button
											type="submit"
											// onClick={addToCart}
											className="block rounded border border-[#00553A] bg-white p-2 px-5 py-3 text-md text-text transition hover:bg-[#00553A] hover:text-white w-full"
										>
											Add to cart
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
