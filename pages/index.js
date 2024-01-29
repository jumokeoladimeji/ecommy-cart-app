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
			<div className="px-5 md:px-10">
				<Category category={categories[0]} key={categories[0].id} />
				<div className="py-10 px-5 md:px-10 flex flex-col items-center gap-3 lg:gap-5">
				<div className="flex flex-col gap-3 bg-[#fff] p-4 md:p-8 rounded-md shadow-md text-center mb-6">
					<img
						src="/landing.png"
						alt=""
						className="h-auto w-auto .max-w-full"
					/>
					</div>
				</div>
				<Category category={categories[1]} key={categories[1].id} />
				<div className="landing-text">
					<h1 className="text-3xl w-full font-bold text-center mx-3 lg:mx-0 lg:text-3xl lg:leading-snug">
						Finally, a greeting card you don’t throw away!
					</h1>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(ctx) {
  const categories = await getCategories(process.env);
  return { props: { categories } };
}