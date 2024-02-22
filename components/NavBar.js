
import React, {
	useState,
	useEffect,
	useContext,
} from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { FaBars, FaTimes } from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';
import ShoppingCart from '@/components/ShoppingCart';
import Dropdown from '@/components/Dropdown';
import { useRouter } from 'next/router';
import { UserContext } from '../context/UserContext';

export default function NavBar() {
	const [nav, setNav] = useState(false);
	const { handleCartClick, cartCount } = useShoppingCart();
	const router = useRouter();
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);

	const goToAbout = () => {
		router.push('/about');
		setTimeout(() => {
			setNav(!nav);
		}, 1500);
	};

	const goToHome = () => {
		router.push('/');
		setTimeout(() => {
			setNav(!nav);
		}, 1500);
	};

	const goToBuy = () => {
		router.push('/buy');
		setTimeout(() => {
			setNav(!nav);
		}, 1500);
	};

	const goToFaq = () => {
		router.push('/faq');
		setTimeout(() => {
			setNav(!nav);
		}, 1500);
	};

	const goToProfile = () => {
		router.push('/profile');
		setTimeout(() => {
			setNav(!nav);
		}, 1500);
	};

	const logout = () => {
		logoutUser();
		setTimeout(() => {
			setNav(!nav);
			router.push('/');
		}, 1500);
	};

	const login = () => {
		router.push('/login');
		setTimeout(() => {
			setNav(!nav);
		}, 1500);
	};

	// Function to hide nav on resize
	const handleResize = () => {
		if (window.innerWidth >= 768) {
			// Assuming 768px is your md breakpoint
			setNav(false);
		}
	};

	// Set up event listener for window resize
	useEffect(() => {
		window.addEventListener('resize', handleResize);

		// Clean up the event listener
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const activeStyle =
		'bg-[#fff] rounded-md text-[#525151] font-bold text-lg mr-4 hover:bg-[#fff] underline underline-offset-2 hover:text-[#02533C]';
	const inactiveStyle =
		'bg-[#fff] rounded-md text-[#525151] font-normal hover:font-bold text-lg mr-4 hover:bg-[#fff] hover:underline hover:underline-offset-2 hover:text-[#02533C]';

	return (
		<div
			className="flex w-full pl-4 items-center py-2 lg:justify-start shadow-md fixed top-0 z-50 bg-white"
			nav="true"
		>
			<div className="flex w-full max-w-7xl mx-auto items-center justify-between px-0">
				<ul className="hidden md:flex items-center gap-4">
					<li className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline">
						<Link href="/">
							<Image
								src={'/measures_of_fun_logo_small.jpg'}
								width={120}
								height={200}
								alt="Measures of Fun"
							/>
						</Link>
					</li>
					<div>
						<button
							onClick={() => router.push('/')}
							className={
								router.pathname === '/'
									? activeStyle
									: inactiveStyle
							}
						>
							Home
						</button>
					</div>
					<div>
						<button
							onClick={() => router.push('/about')}
							className={
								router.pathname === '/about'
									? activeStyle
									: inactiveStyle
							}
						>
							About Us
						</button>
					</div>
					<div>
						<button
							onClick={() => router.push('/buy')}
							className={
								router.pathname === '/buy'
									? activeStyle
									: inactiveStyle
							}
						>
							Buy
						</button>
					</div>
					<div>
						<button
							onClick={() => router.push('/faq')}
							className={
								router.pathname === '/faq'
									? activeStyle
									: inactiveStyle
							}
						>
							faq
						</button>
					</div>
				</ul>
				<div className="flex flex-row">
					<div
						onClick={() => setNav(!nav)}
						className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
					>
						{nav ? (
							<div className="z-20">
								<FaTimes className="z-20" size={30} />
							</div>
						) : (
							<FaBars size={30} />
						)}
					</div>
					{nav && (
						<div className="justify-start items-start flex flex-col gap-4">
							<ul className="flex divide-y flex-col justify-start pt-7 z-10 items-start px-5 bg-white absolute top-0 left-0 shadow-lg min-h-screen w-56 text-gray-500">
								<div
									className="z-20 flex items-start mb-7"
									onClick={() => setNav(!nav)}
								>
									<FaTimes className="z-20" size={30} />
								</div>
								<div>
									<button
										onClick={goToHome}
										className="bg-[#fff] m-2 w-30 px-2 py-2 rounded-md text-[#02533C] font-bold text-md hover:underline hover:text-[#02533C] margin-top: 1em"
									>
										Home
									</button>
								</div>

								<div>
									<button
										onClick={goToAbout}
										className="bg-[#fff] m-2 w-30 px-2 py-2 rounded-md text-[#02533C] font-bold text-md hover:underline hover:text-[#02533C] margin-top: 1em"
									>
										About Us
									</button>
								</div>

								<div>
									<button
										onClick={goToBuy}
										className="bg-[#fff] m-2 w-30 px-2 py-2 rounded-md text-[#02533C] font-bold text-md hover:underline hover:text-[#02533C] margin-top: 1em"
									>
										Buy
									</button>
								</div>

								<div>
									<button
										onClick={goToFaq}
										className="bg-[#fff] m-2 w-30 px-2 py-2 rounded-md text-[#02533C] font-bold text-md hover:underline hover:text-[#02533C] margin-top: 1em"
									>
										Faq
									</button>
								</div>

								{user ? (
									<>
										<div>
											<button
												onClick={goToProfile}
												className="bg-[#fff] m-2 w-30 px-2 py-2 rounded-md text-[#02533C] font-bold text-md hover:underline hover:text-[#02533C] margin-top: 1em"
											>
												Profile
											</button>
										</div>
										<div>
											<button
												onClick={logout}
												className="bg-[#fff] m-2 w-30 px-2 py-2 rounded-md text-[#e65050] font-bold text-md hover:underline hover:text-[#02533C] margin-top: 1em"
											>
												Logout
											</button>
										</div>
									</>
								) : (
									<div>
										<button
											onClick={login}
											className="bg-[#02533C] m-2 w-30 px-2 py-2 rounded-md text-[#fff] font-bold text-md hover:text-[#fff] mt-3"
										>
											Login
										</button>
									</div>
								)}
							</ul>
						</div>
					)}
				</div>
				<div className="flex items-center">
					<button
						className="relative"
						onClick={() => handleCartClick()}
					>
						<Image
							src="./cart.svg"
							width={30}
							height={30}
							alt="shopping cart icon"
						/>
						<div className="rounded-full flex justify-center items-center bg-[#02533C] text-xs text-white absolute w-6 h-5 bottom-6 -right-1">
							{cartCount}
						</div>
					</button>
					<ShoppingCart />
					<Dropdown />
				</div>
			</div>
		</div>
	);
}
