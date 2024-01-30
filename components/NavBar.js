
import React, { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { FaBars, FaTimes } from "react-icons/fa";

import Image from 'next/image';
import Link from 'next/link';
import ShoppingCart from '@/components/ShoppingCart';
import Dropdown from '@/components/Dropdown';
import { useRouter } from 'next/router';

export default function NavBar() {
	const [nav, setNav] = useState(false);
	const { handleCartClick, cartCount } = useShoppingCart();
	const router = useRouter();

	const goToAbout = () => {
		router.push('/about');
	};

	const goToHome = () => {
		router.push('/');
	};

	// Function to hide nav on resize
	const handleResize = () => {
		if (window.innerWidth >= 768) { // Assuming 768px is your md breakpoint
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

	return (
		<div className="flex w-full pl-4 items-center py-2 lg:justify-start shadow-md fixed top-0 z-50 bg-white" nav="true">
			<div className="flex w-full max-w-7xl mx-auto items-center justify-between px-0">
				<ul className="hidden md:flex">
					<li
						className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
					>
						<Link href="/">
							<Image
								src={'/measures_of_fun_logo_small.jpg'}
								width={120}
								height={200}
								alt="Measures of Fun"
							/>
						</Link>
					</li>
					<li>
						<button
							onClick={goToAbout}
							className="bg-[#02533C] w-40 px-2 py-3 rounded-md text-white font-bold text-md hover:bg-[#fff] hover:border-[#02533C] border hover:text-[#02533C]"
						>
							About Us
						</button>
					</li>
				</ul>
				<div className="flex flex-row">
					<div
						onClick={() => setNav(!nav)}
						className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
					>
						{nav ? <FaTimes size={30} /> : <FaBars size={30} />}
					</div>
					{nav && (
						<ul className="flex flex-col justify-center items-center absolute top-0 left-0  h-80 w-32 bg-gradient-to-r from-green-400 via-green-100 to-green-200 text-gray-500">
						<li>
						<button onClick={goToHome} className="bg-[#02533C] m-2 w-30 px-2 py-2 rounded-md text-white font-bold text-md hover:bg-[#fff] hover:border-[#02533C] border hover:text-[#02533C] margin-top: 1em">
							Home
						</button>
						</li>
						<li>
							<button
							onClick={goToAbout}
							className="bg-[#02533C] w-30 px-2 py-2 rounded-md text-white font-bold text-md hover:bg-[#fff] hover:border-[#02533C] border hover:text-[#02533C] margin-top: 1em"
						>
							About Us
						</button>
						</li>
						</ul>
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
