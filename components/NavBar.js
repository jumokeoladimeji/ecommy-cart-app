
import React, { Fragment, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useShoppingCart } from 'use-shopping-cart';

import Image from 'next/image';
import Link from 'next/link';
import ShoppingCart from '@/components/ShoppingCart';
import SearchBox from '@/components/SearchBox';
import Dropdown from '@/components/Dropdown';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/router';

export default function NavBar() {
	const { handleCartClick, cartCount } = useShoppingCart();
	const router = useRouter();
	return (
		<nav className="flex w-full pl-4 items-center py-2 lg:justify-start shadow-md fixed top-0 z-50 bg-white">
			<div className="flex w-full max-w-7xl mx-auto items-center justify-between px-0">
				<Link href="/">
					<Image
						src={'/measures_of_fun_logo_small.jpg'}
						width={150}
						height={200}
						alt="Measures of Fun"
					/>
				</Link>
				{/* <SearchBox /> */}
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
		</nav>
	);
}
