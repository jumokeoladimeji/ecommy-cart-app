import { getCategories } from "@/pages/api/category";
import CarouselList from "@/components/Carousel";
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { FaAngleDoubleDown } from 'react-icons/fa';
import Category from '@/components/Category';

export default function Home() {
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);

	const router = useRouter();
	const fishSlideImages = [
		{
			text: 'Fish Card (Front)',
			img: '/fishing1.jpeg',
		},
		{
			text: 'Fish Card (Back)',
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
						className="text-4xl leading-snug w-[95%] font-normal text-left mx-3 lg:mx-0 lg:text-6xl lg:leading-snug"
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
					<p className="text-left italic text-lg mt-2 px-5 md:px-0">
						With <span className="text-[#005534] font-bold">free shipping!</span>
					</p>
					<div className="hidden md:flex flex-col md:flex-row items-center mt-5 md:mt-6 mb-3 md:mb-0 justify-center md:justify-start">
						<div className="flex flex-col w-[90%] gap-3 bg-[#fff] p-0 md:p-2 rounded-lg shadow-md text-center mb-5">
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
					<div className="py-0 px-0 md:px-0 md:hidden flex-col items-center gap-3 lg:gap-5 w-[90%] mt-5 mx-auto md:w-[50%] ml-5">
						<div className="flex flex-col w-full gap-3 bg-none p-0 md:p-2 rounded-lg shadow-none text-center mb-5">
							<CarouselList cards={fishSlideImages} />
							<CarouselList cards={golfSlideImages} />
						</div>
					</div>
				</div>

				<div className="py-0 px-0 md:px-0 md:flex hidden flex-col items-center gap-3 lg:gap-5 w-[90%] md:w-[50%] ml-5">
					<div className="flex flex-col w-full gap-3 bg-[#fff] p-2 md:p-2 rounded-lg shadow-md text-center mb-5">
						<CarouselList cards={fishSlideImages} />
						<CarouselList cards={golfSlideImages} />
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
				{/* <Category
					category={categories[0]}
					key={categories[0].id}
				/> */}
				{/* <div className="hidden md:flex flex-col w-full gap-3 bg-[#fff] p-0 md:p-2 rounded-lg shadow-md text-center mb-5">
					<iframe
						width="500"
						height="615"
						src="https://www.youtube.com/embed/GENPXFaqy8o?si=0735NClaC6JdlaYh&amp;controls=0"
						title="YouTube video player"
						// frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
						className="w-full object-cover rounded-lg"
					></iframe>
				</div> */}

				{/* <Category category={categories[1]} key={categories[1].id} /> */}
			</div>
		</div>
	);
}
