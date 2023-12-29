import { getCategories } from "@/pages/api/category";
import Category from "@/components/Category";
import CarouselList from "@/components/Carousel";
import { UserContext } from './context/userContext';
import { useContext } from 'react';

export default function Home({ categories }) {
	// console.log('orv=====2', process.env)
	// var result = categories.map(category =>
	//   category.cards.map(card => ({ parentId: category.id, ...card }))
	// ).flat();
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);

	return (
		<div className="bg-[#fff]">
			{/* <CarouselList cards={result}/> */}
			<div
				className="relative h-96 bg-cover bg-center mb-10 rounded-md"
				style={{
					backgroundImage:
						"url('https://static.vecteezy.com/system/resources/thumbnails/019/039/523/small/access-element-for-valentine-s-day-and-mother-s-day-greeting-card-3d-rendering-of-celebrations-on-special-days-png.png')",
				}}
			>
				<div className="absolute inset-0 bg-black opacity-30"></div>
				<div className="absolute inset-0 flex flex-col justify-center px-5 items-start md:items-center text-white">
					<h1
						style={{ fontFamily: 'Lobster Two' }}
						className="text-5xl font-bold mb-4"
					>
						Welcome to Handmade Cards Emporium!
					</h1>
					<p className="text-lg mb-8">
						Discover unique handmade cards for every
						occasion.
					</p>
					<a
						href="/"
						className="bg-white text-gray-900 py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-300 transition duration-300"
					>
						Shop Now
					</a>
				</div>
			</div>
			<div className="px-5 md:px-10">
				{categories.map((category) => (
					<Category category={category} key={category.id} />
				))}
			</div>
		</div>
	);
}

export async function getServerSideProps(ctx) {
  const categories = await getCategories(process.env);
  return { props: { categories } };
}