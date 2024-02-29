import { getCategories } from "@/pages/api/category";
import CarouselList from "@/components/Carousel";
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { FaAngleDoubleDown } from 'react-icons/fa';

export default function Home() {
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);

	const router = useRouter();
	const fishSlideImages = [
		{
			text: 'Fishing Card (Front)',
			img: '/fishing1.jpeg',
		},
		{
			text: 'Fishing Card (Back)',
			img: '/fishing2.jpeg',
		},
	];
	const golfSlideImages = [
		{
			text: 'Golf Card (Front)',
			img: '/golfing1.jpeg',
		},
		{
			text: 'Golf Card (Back)',
			img: '/golfing2.jpeg',
		},
	];

	return (
		<div className="bg-[#fff]">
			<div className="flex flex-col md:flex-row items-start mx-auto max-w-7xl pt-10 md:pt-5">
				<div className="landing-text text-center w-[100%] md:w-[50%]">
					<h1
						style={{ fontFamily: 'Lobster Two' }}
						className="text-4xl leading-snug w-[90%] font-normal text-left mx-3 lg:mx-0 lg:text-6xl lg:leading-snug"
					>
						Finally, a{' '}
						<span className="text-[#01533B] font-extrabold">
							greeting card
						</span>{' '}
						you don’t throw away!
					</h1>
					<p className="text-left text-xl mt-2 px-5 md:px-0">
						<span className="text-[#005534] font-bold">
							MEASURES OF FUN
						</span>{' '}
						laminated cards are cards{' '}
						<span className="text-[#005534] font-bold">
							forever!
						</span>
					</p>
					<div className="flex flex-col md:flex-row items-center mt-5 md:mt-2 mb-3 md:mb-0 justify-center md:justify-end">
						<h1 className="md:text-2xl text-lg border px-2 py-2 md:px-4 md:py-6 rounded-full border-1 border-[#005534]">
							Watch the video to get started
						</h1>
						<img
							src="/arrow.png"
							alt=""
							className="h-40 w-40 ml-10 hidden md:block"
						/>
						<FaAngleDoubleDown
							size={30}
							className="block md:hidden mt-5 mb-3 text-slate-500"
						/>
					</div>
				</div>
				<div className="py-0 px-0 md:px-0 hidden md:flex flex-col items-center gap-3 lg:gap-5 w-[100%] md:w-[50%] ml-5">
					<div className="flex flex-col w-full gap-3 bg-[#fff] p-2 md:p-2 rounded-lg shadow-md text-center mb-5">
						<iframe
							width="560"
							height="350"
							src="https://www.youtube.com/embed/GENPXFaqy8o?si=0735NClaC6JdlaYh&amp;controls=0"
							title="YouTube video player"
							// frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
							className="w-full object-cover rounded-lg"
						></iframe>
					</div>
				</div>
				<div className="py-0 px-0 md:hidden md:px-0 flex flex-col items-center gap-3 lg:gap-5 w-[90%] md:w-[50%] ml-5">
					<div className="flex flex-col w-full gap-3 bg-[#fff] p-0 md:p-2 rounded-lg shadow-md text-center mb-5">
						<iframe
							width="500"
							height="315"
							src="https://www.youtube.com/embed/GENPXFaqy8o?si=0735NClaC6JdlaYh&amp;controls=0"
							title="YouTube video player"
							// frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
							className="w-full object-cover rounded-lg"
						></iframe>
					</div>
				</div>
			</div>
			<div className="px-5 md:px-10 mt-0 md:shadow-none md:rounded-none md:py-10 mb-10">
				<CarouselList cards={fishSlideImages} />
				{/* <Category category={categories[0]} key={categories[0].id} /> */}

				<CarouselList cards={golfSlideImages} />
				{/* <Category category={categories[1]} key={categories[1].id} /> */}
			</div>
		</div>
	);
}
