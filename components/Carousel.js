import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

export default function CarouselList({ cards }) {
	const slides = cards;
	const router = useRouter();

	const isBuy = router.pathname === '/buy';

	const [activeImage, setActiveImage] = useState(0);

	const clickNext = () => {
		activeImage === slides.length - 1
			? setActiveImage(0)
			: setActiveImage(activeImage + 1);
	};
	const clickPrev = () => {
		activeImage === 0
			? setActiveImage(slides.length - 1)
			: setActiveImage(activeImage - 1);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			clickNext();
		}, 5000);
		return () => {
			clearTimeout(timer);
		};
	}, [activeImage]);
	return (
		<main className="grid place-items-center md:grid-cols-1 w-full mx-auto border border-1 pt-5 px-5 max-w-5xl shadow-none mb-5 rounded-2xl">
			<div
				className={`w-full justify-center items-center transition-transform ease-in-out duration-300 md:rounded-2xl p-0 md:p-0`}
			>
				{slides.map((elem, idx) => (
					<div
						key={idx}
						className={`${
							idx === activeImage
								? 'w-full transition-all duration-300 ease-in-out'
								: 'hidden'
						}`}
					>
						<div>
							<img
								src={elem.img}
								alt=""
								width={400}
								height={400}
								className="w-full h-full rounded-lg"
							/>
							<div className="flex flex-row justify-between items-center mt-3">
								<h1
									style={{ fontFamily: 'Lobster Two' }}
									className="text-2xl mb-3 font-bold"
								>
									{elem.text}
								</h1>
								{!isBuy && (
									<Link
										href={'/buy'}
										className="bg-[#075133] text-[#fff] px-5 font-bold py-3 rounded-md mb-2"
									>
										Buy
									</Link>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
