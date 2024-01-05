
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useShoppingCart } from "use-shopping-cart";

import Image from "next/image";
import Link from "next/link";
import ShoppingCart from "@/components/ShoppingCart";
import SearchBox from '@/components/SearchBox';
import Dropdown from '@/components/Dropdown';

export default function NavBar() {
  const { handleCartClick, cartCount } = useShoppingCart();
  return (
		<nav className="flex w-full pl-4 items-center py-2 lg:justify-start shadow-md fixed top-0 z-50 bg-white">
			<div className="flex w-full items-center justify-between px-0">
				<Link href="/">
					<p
						style={{ fontFamily: 'Lobster Two' }}
						className="bg-white text-xl md:text-2xl font-bold decoration-2 decoration-emerald-500"
					>
						Measures of Fun
					</p>
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
						<div className="rounded-full flex justify-center items-center bg-emerald-500 text-xs text-white absolute w-6 h-5 bottom-6 -right-1">
							{cartCount}
						</div>
					</button>
					<ShoppingCart />
					<Dropdown />
				</div>

				{/* <div onClick={userService.isSessionActive() ?  signOut : signIn} className="link">
                        <p>
                            {userService.isSessionActive() ? `Sign Out`:`Sign In`}
                        </p>
                        <p>
                            {userService.isSessionActive() ? `Hello, ${userService.userData.username}`:`Hello`}
                        </p>
                        {/* <p className="font-extrabold md:text-sm">Account</p> */}
				{/* </div>  */}

				{/* <div className="flex gap-8 items-center text-white">
        {menuItems.map((item) => {
          return item.hasOwnProperty("children") ? (
            <Dropdown item={item} key={item.title} />
            // <li key="{item}">{item}</li>
          ) : (
            <Link className="hover:text-blue-500" href={item?.route || ""}>
              {item.title}
            </Link>
          );
        })}
      </div> */}
				{/* {data ? (
        <NavDropdown title={data.name} id="username">
          <Link href="/profile" passHref>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </Link>
          <NavDropdown.Item onClick={() => logout()}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Link href="/login" passHref>
          <Nav.Link>
            <i className="fas fa-user"></i> Sign In
          </Nav.Link>
        </Link>
      )} */}

				{/* {data && data.isAdmin && (
        <NavDropdown title="Admin" id="username">
          <Link href="/admin/users" passHref>
            <NavDropdown.Item>Users</NavDropdown.Item>
          </Link>
          <Link href="/admin/products" passHref>
            <NavDropdown.Item>Products</NavDropdown.Item>
          </Link>
          <Link href="/admin/orders" passHref>
            <NavDropdown.Item>Orders</NavDropdown.Item>
          </Link>
        </NavDropdown>
      )} */}
			</div>
		</nav>
	);
}
