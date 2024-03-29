import React, { Fragment, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const Dropdown = () => {
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);
	const router = useRouter();

	return (
		<div className="flex justify-between items-center px-1">
			<ul className="flex items-center">
				<li className="p-4">
					<Menu
						as="div"
						className="relative inline-block text-left"
					>
						<div>
							<Menu.Button className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[#00543A] text-sm font-medium text-[#fff] hover:bg-[#f1f1f1] hover:text-[#00543A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
								{user?.data.name}
								<ChevronDownIcon
									className="-mr-1 ml-2 h-5 w-5"
									aria-hidden="true"
								/>
							</Menu.Button>
						</div>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
								<div className="py-1">
									{user ? (
										<>
											{user?.data.role === 'admin' && (
												<Menu.Item>
													{({ active }) => (
														<a
															href="/admin"
															className={classNames(
																active
																	? 'bg-gray-100 text-gray-900'
																	: 'text-gray-700',
																'block px-4 py-2 text-sm',
																'rounded-md',
															)}
														>
															Admin
														</a>
													)}
												</Menu.Item>
											)}
											<Menu.Item>
												{({ active }) => (
													<a
														href="/profile"
														className={classNames(
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700',
															'block px-4 py-2 text-sm',
															'rounded-md',
														)}
													>
														Profile
													</a>
												)}
											</Menu.Item>
											<hr />
											<Menu.Item>
												{({ active }) => (
													<a
														onClick={() => {
															logoutUser();
															toast.success(
																'Logged out successfully',
															);
															router.push('/');
														}}
														href="#"
														className={classNames(
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700',
															'block px-4 py-2 text-sm',
														)}
													>
														Log Out
													</a>
												)}
											</Menu.Item>
										</>
									) : (
										<Menu.Item>
											{({ active }) => (
												<a
													href="/login"
													className={classNames(
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm',
													)}
												>
													Signin / Register
												</a>
											)}
										</Menu.Item>
									)}
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</li>
			</ul>
		</div>
	);
};

export default Dropdown;
