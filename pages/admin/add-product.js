import React, { useState } from 'react';
import { getCategories } from '../api/category';
import { createCard } from '../api/card';
import toast from 'react-hot-toast';

export default function AddProduct({ categories }) {
	const [imageSrc, setImageSrc] = useState();
	const [backImgSrc, setBackImgSrc] = useState();
	const [uploadData, setUploadData] = useState();
	const [backUploadData, setBackUploadData] = useState();
	const [frontImgUrl, setFrontImgUrl] = useState('');
	const [backImgUrl, setBackImgUrl] = useState('');
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState(
		categories[0].id,
	);
	const [quantity, setQuantity] = useState(0);
	const [loading, setLoading] = useState(false);

	const Loading = () => {
		return (
			<div className="flex items-center justify-center flex-col">
				<div className="border-t-8 border-[#015438] border-solid rounded-full animate-spin w-12 h-12"></div>
				<p>Uploading. Please wait...</p>
			</div>
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (imageSrc && backImgSrc) {
			setLoading(true);
			try {
				const apiUrl =
					'https://api.cloudinary.com/v1_1/dkhoomk9a/image/upload';
				const formData = new FormData();
				formData.append('file', imageSrc); // Assuming imageSrc is a file object or URL
				formData.append('upload_preset', 'measures-of-fun');

				const response = await fetch(apiUrl, {
					method: 'POST',
					body: formData,
				});

				const apiUrl2 =
					'https://api.cloudinary.com/v1_1/dkhoomk9a/image/upload';
				const formData2 = new FormData();
				formData.append('file', backImgSrc); // Assuming imageSrc is a file object or URL
				formData.append('upload_preset', 'measures-of-fun');

				const response2 = await fetch(apiUrl, {
					method: 'POST',
					body: formData,
				});

				if (response.ok && response2.ok) {
					const data = await response.json();
					const data2 = await response2.json();
					setFrontImgUrl(data.secure_url);
					setBackImgUrl(data2.secure_url);

					const info = {
						title,
						description,
						price: parseFloat(price),
						front_img_url: data.secure_url,
						category_id: category,
						available_quantity: parseFloat(quantity),
						side_img_url: data.secure_url,
						back_img_url: data2.secure_url,
						img_url: data.secure_url,
						stripe_product_id:
							'price_1OHnnZBIztSkOPFMtSCrTzdB',
					};

					// Perform the next steps or make API calls using the info object
					await createCard(info);
					setLoading(false);
					toast.success('Product Successfully Added!');
				} else {
					setLoading(false);
				}
			} catch (error) {
				console.error('Error uploading image:', error);
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
	};

	function handleOnChange(changeEvent) {
		const reader = new FileReader();

		reader.onload = function (onLoadEvent) {
			setImageSrc(onLoadEvent.target.result);
			setUploadData(undefined);
		};

		reader.readAsDataURL(changeEvent.target.files[0]);
	}

	function handleOnChangeBack(changeEvent) {
		const reader = new FileReader();

		reader.onload = function (onLoadEvent) {
			setBackImgSrc(onLoadEvent.target.result);
			setBackUploadData(undefined);
		};

		reader.readAsDataURL(changeEvent.target.files[0]);
	}

	return (
		<div className=" overflow-y-auto mx-auto">
			<div className="flex items-end justify-center min-h-screen max-w-4xl mx-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
				&#8203;
				<div
					className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-1 sm:align-top sm:w-full"
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-headline"
				>
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<h2
							className="text-lg leading-6 font-medium text-gray-900"
							id="modal-headline"
						>
							Add Product
						</h2>
						<form
							onSubmit={handleSubmit}
							className="mt-4 space-y-6"
						>
							<div className="grid grid-cols-6 gap-6">
								<div className="col-span-6">
									<label
										htmlFor="title"
										className="block text-sm font-medium text-gray-700"
									>
										Card Name
									</label>
									<input
										type="text"
										id="title"
										name="title"
										value={title}
										onChange={(ev) =>
											setTitle(ev.target.value)
										}
										required
										className="mt-1 px-5 border border-b-2 py-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md"
									/>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="price"
										className="block text-sm font-medium text-gray-700"
									>
										Price
									</label>
									<input
										type="number"
										id="price"
										name="price"
										value={price}
										onChange={(ev) =>
											setPrice(ev.target.value)
										}
										required
										className="mt-1 py-4 px-5 border border-b-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md"
									/>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="description"
										className="block text-sm font-medium text-gray-700"
									>
										Description
									</label>
									<textarea
										id="description"
										name="description"
										value={description}
										onChange={(ev) =>
											setDescription(ev.target.value)
										}
										className="mt-1 py-4 px-5 border border-b-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md"
									></textarea>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="quantity"
										className="block text-sm font-medium text-gray-700"
									>
										Available Quantity
									</label>
									<input
										type="number"
										id="quantity"
										name="quantity"
										value={quantity}
										onChange={(ev) =>
											setQuantity(ev.target.value)
										}
										required
										className="mt-1 py-4 px-5 border border-b-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md"
									/>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="category"
										className="block text-sm font-medium text-gray-700"
									>
										Category
									</label>
									<select
										id="category"
										name="category"
										value={category}
										onChange={(ev) =>
											setCategory(ev.target.value)
										}
										className="mt-1 block w-full py-4 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									>
										{categories?.map((category, index) => (
											<option
												key={index}
												value={category.id}
											>
												{category.name}
											</option>
										))}
									</select>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="frontImage"
										className="block text-sm font-medium text-gray-700"
									>
										Front Image
									</label>

									<div className="flex flex-row items-center">
										<label className="w-24 h-24 mr-10 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
												/>
											</svg>
											<div>Add front image</div>
											<input
												type="file"
												onChange={handleOnChange}
												className="hidden"
											/>
										</label>
										{imageSrc && (
											<div key={imageSrc} className="">
												<img
													src={imageSrc || frontImgUrl}
													alt=""
													className="rounded-lg h-24 w-36"
												/>
											</div>
										)}
									</div>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="frontImage"
										className="block text-sm font-medium text-gray-700"
									>
										Back Image
									</label>

									<div className="flex flex-row items-center">
										<label className="w-24 h-24 mr-10 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
												/>
											</svg>
											<div>Add back image</div>
											<input
												type="file"
												onChange={handleOnChangeBack}
												className="hidden"
											/>
										</label>
										{backImgSrc && (
											<div key={backImgSrc}>
												<img
													src={backImgSrc || backImgUrl}
													alt=""
													className="rounded-lg h-24 w-36"
												/>
											</div>
										)}
									</div>
								</div>
							</div>
						</form>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						{loading ? (
							<Loading />
						) : (
							<button
								type="submit"
								className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#005438] text-base font-medium text-white hover:bg-[#005438] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
								onClick={handleSubmit}
							>
								Add Product
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(ctx) {
	const categories = await getCategories(process.env);
	return { props: { categories } };
}
