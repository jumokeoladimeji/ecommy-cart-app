import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatCurrencyString } from 'use-shopping-cart';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios from 'axios';

import { getCategories } from "@/pages/api/category";
import Category from "@/components/Category";
import { UserContext } from '@/context/UserContext';
import { CategoriesContext } from '@/context/CategoryContext';
import Spinner from '@/components/Spinner';
import Modal from '@/components/Modal';
import states from "@/data/states";

export default function Buy() {
    const router = useRouter();
    const [golfingQuantity, setGolfingQuantity] = useState(0);
    const [fishingQuantity, setFishingQuantity] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const countries = [
		{ name: 'United States of Ameria', code: 'US' },
    ];

    const { register, handleSubmit, formState } =
	useForm();

    const storedToken = localStorage.getItem('token');
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);
    const { categories } = useContext(CategoriesContext);

    const cards = [];
    categories.map((category, ind) => {
        let card = category.cards.map(({
            stripe_product_id: id,
            id: card_id,
            ...rest
        }) => ({
            id,
            card_id,
            ...rest
        }));
        cards.push(...card)
    })


    const decreaseQuantity = (card) => {
        if (card.title  ===  "Fishing Card" && fishingQuantity >= 1) {
            setFishingQuantity(fishingQuantity - 1);
        }

        if (card.title  ===  "Golfing Card" && golfingQuantity >= 1) {
            setGolfingQuantity(golfingQuantity - 1);
        }
	};

	const increaseQuantity = (card) => {
        if (fishingQuantity + golfingQuantity === 12) {
            toast.error('You can only select 12 Cards');
            return
        }
        if (card.title  ===  "Fishing Card") {
            setFishingQuantity(fishingQuantity + 1);
        }

        if (card.title  ===  "Golfing Card") {
            setGolfingQuantity(golfingQuantity + 1);
        }
	};

    const  handleCardNumberSubmit = () => {
        setIsModalOpen(false)
        setIsAddressModalOpen(true)
    }

	async function onSubmit(address) {
		setIsAddressModalOpen(false);

        let quantity = 0;
        let cardsToBuy = {}

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
              case 'Fishing Card':
                processCard(card, fishingQuantity);
                break;
              case 'Golfing Card':
                processCard(card, golfingQuantity);
                break;
              default:
            }
          });
        stripeCheckout(cardsToBuy, address)
	}

    async function stripeCheckout(cartProducts, address) {    
		const response = await axios.post(`/api/checkout`, {
			email: user.data.email,
			name: user.data.name,
			user_id: user.data.id,
			phone_number: user.data.phone_number,
			address: address.address,
            state: address.state,
			country: address.country,
			zip: address.zip,
			token: storedToken,
			cartProducts,
            full_address: address,
            buy_twelve_pay_for_ten: true
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
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#00543A] mx-auto hover:bg-[#f1f1f1] hover:text-[#00543A] transition-colors duration-500 text-[#fff] rounded-md px-5 py-2"
                >
                    Deal For A Dozen Cards
                </button>
                <Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				>
					<div className="border-slate-200 rounded-lg p-6 border-2">
						<div className="flex flex-row justify-between items-center">
							<h1
								style={{ fontFamily: 'Lobster Two' }}
								className=" text-2xl"
							>
								Select Number of Cards
							</h1>
							<button
								onClick={() => setIsModalOpen(false)}
							>
								Close
							</button>
						</div>

						<div className="mx-auto mt-8">
                            {cards.map(
                                (card, i) => (
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
                                                {card.title === "Fishing Card" ?
                                                    fishingQuantity :
                                                    golfingQuantity
                                                }
                                                </span>
                                            <button
                                            onClick={() => increaseQuantity(card)}
                                            className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
                                            >
                                            +
                                            </button>
                                        </div>    
                                    </div>
                                )
                            )}
						</div>
                        <button
                            disabled={
                              (fishingQuantity + golfingQuantity < 12)
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
				<Modal
					isOpen={isAddressModalOpen}
					onClose={() => setIsAddressModalOpen(false)}
				>
						<div className="md:1/3 mt-16 md:mt-6">
							{/* <button
								onClick=
								className="bg-[#00543A] mx-auto hover:bg-[#f1f1f1] hover:text-[#00543A] transition-colors duration-500 text-[#fff] rounded-md px-5 py-2"
							>
								Back
							</button> */}
							<header className="text-start flex flex-col w-full">
								<h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
									Shipping details
								</h1>
							</header>
							<form
								className="mx-auto max-w-xl p-4 border shadow-xl h-[400px] my-3"
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
												className="block rounded border border-[#00553A] bg-white p-2 px-5 py-3 text-md text-text transition hover:bg-[#00553A] hover:text-white w-full"
											>
												checkout
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
				</Modal>
                <p className="text-gray-500 text-md pt-4 font-bold leading-relaxed block">
                    Tell us how many of each…. “fish” and “golf”
                    rulers you need to make 12, we’ll ship them
                    and your envelopes to you FREE.
                </p>
                <div className="text-center">
                    {(!categories || categories?.length === 0)
                        ? <Spinner className="text-center"/>
                        : categories?.map((category) => (
                        <Category category={category} key={category.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// export async function getServerSideProps(ctx) {
//     const categories = await getCategories();
//     return { props: { categories } };
// }
