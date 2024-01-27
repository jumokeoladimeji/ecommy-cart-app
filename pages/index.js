import { getCategories } from "@/pages/api/category";
import Category from "@/components/Category";
import About from "@/components/About";
import CarouselList from "@/components/Carousel";
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';

export default function Home({ categories }) {
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);
	
	const router = useRouter();

	const goToAbout = () => {
		router.push('/about');
	};

	return (
		<div className="bg-[#fff]">
			{/* <CarouselList cards={result}/> */}
			{/* <div>
				<div className="py-10 px-5 md:px-10 flex flex-col items-center gap-3 lg:gap-5">
					<img
						src="/landing.png"
						alt=""
						className="h-auto w-auto lg:w-1/2"
					/>
				</div>
			</div> */}
			<div className="px-5 md:px-10">
				<Category category={categories[0]} key={categories[0].id} />
				<div className="landing-text">
					<h1 className="text-3xl font-bold text-center mx-3 lg:mx-0 lg:text-3xl lg:leading-snug">
						Finally, a greeting card you don’t throw away!
					</h1>
					<p className="py-3 text-center leading-6 text-gray-600 lg:text-left lg:leading-7 lg:text-lg">
						Stop going to the store and looking over
						hundreds of cards just to pick one that will
						get thrown away!{' '}
						<span className="font-bold text-[#02533C]">
							MEASURES OF FUN
						</span>{' '}
						laminated cards are cards{' '}
						<span className="text-[#02533C] font-bold">
							forever!
						</span>{' '}
					</p>
					<div className="flex justify-center items-center lg:items-start lg:justify-start">
						<button
							onClick={goToAbout}
							className="bg-[#02533C] px-4 py-4 rounded-md text-white font-bold text-md hover:bg-[#fff] hover:border-[#02533C] border hover:text-[#02533C]"
						>
							<About/>
						</button>
					</div>
				</div>
				<Category category={categories[1]} key={categories[1].id} />
			</div>
		</div>
	);
}

export async function getServerSideProps(ctx) {
  const categories = await getCategories(process.env);
  return { props: { categories } };
}