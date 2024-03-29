import { useRouter } from 'next/router';
import React from 'react';

const faq = () => {
	const router = useRouter();
	const goToBuy = () => {
		router.push('/buy');
	};
	return (
		<div className="text-center">
					<h1 className="font-bold text-2xl pt-10">
					Measures of Fun - FREQUENTLY ASKED QUESTIONS
					</h1>
			<div className="flex w-full flex-col justify-between max-w-5xl mx-auto md:flex-row gap-3 lg:gap-30 pt-10 px-5 md:px-10">
				
				<div className="w-full lg:w-1/2 pt-15">
					<div>
					<img
						src="https://res.cloudinary.com/dkhoomk9a/image/upload/v1706621835/yh1xvqz6xkposljzhvea.jpg"
						className="h-auto w-full rounded-lg max-w-full"
						alt=""
					/>
					</div>
					<div>
					<img
						src="https://res.cloudinary.com/dkhoomk9a/image/upload/v1706621867/gfbeexajzzpzm125pdoh.jpg"
						className="h-auto w-full rounded-lg max-w-full"
						alt=""
					/>
					</div>
				
					<div className="text-left">
						<button
							onClick={goToBuy}
							className="bg-[#02533C] mt-3 w-30 px-5 py-2 rounded-md text-white font-bold text-md hover:underline hover:text-white "
						>
							Buy Now
						</button>
					</div>
				</div>
				<div className="text-left w-full lg:w-2/3">
					
					<div>
						<p className="text-gray-500 text-xl pt-4 text-left leading-relaxed block"><b>
							Q- How do I order more than one?</b>
						</p>
						<p className="text-gray-500 text-xl pt-4 text-left leading-relaxed block">
							A- You can add a card to your cart, fill in the information and before checking out it will direct you to continue buying?
						</p>
						<p className="text-gray-500 text-xl pt-4 text-left leading-relaxed block">
							<b>Q-Can I buy in bulk?</b>
						</p>

						<p className="text-gray-500 text-xl pt-4 text-left leading-relaxed block">
							A- Yes, there is a purchase option to buy 10 cards and get two FREE!
						</p>

						<p className="text-gray-500 text-xl pt-4 text-left leading-relaxed block">
						<b>Q- Can you mail to multiple people?</b>
						</p>

						<p className="text-gray-500 text-xl pt-4 text-left leading-relaxed block">
							A- YES, just follow the options after adding to your cart and it will allow you to ship to whomever for each card.
						</p>

						<p className="text-gray-500 text-xl pt-4 text-left leading-relaxed block">
							<b>Q- Are there other cards available?</b></p>

						<p className="text-gray-500 text-xl pt-4 text-left leading-relaxed block">
						  A- We plan on it! Launching the first two is our start, but we do plan on adding!
						</p>
						<p className="text-gray-500 text-xl pt-4 text-left leading-relaxed block">
						If you have an idea…..share!
						</p>

						<p className="text-gray-500 text-xl pt-4 text-left leading-relaxed block"> <b>Q- Why buy these cards?</b></p>

						<p className="text-gray-500 text-xl pt-4 text-left leading-relaxed block">
						A- “It's More than a Card”…a laminated card that lasts forever, a ruler, a straight edge and a GIFT!</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default faq;
