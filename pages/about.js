import { useRouter } from 'next/router';
import React from 'react';

const about = () => {
	const router = useRouter();
	const goToBuy = () => {
		router.push('/buy');
	};
	return (
		<div className="">
			{/* <CarouselList cards={imageUrls}/> */}

			<div className="flex w-full flex-col justify-between max-w-5xl mx-auto md:flex-row gap-3 lg:gap-52 pt-10 px-5 md:px-10">
				<div className="w-full lg:w-1/3 pt-10">
					<img
						src="https://res.cloudinary.com/dkhoomk9a/image/upload/v1706621835/yh1xvqz6xkposljzhvea.jpg"
						className="h-auto w-full rounded-lg max-w-full"
						alt=""
					/>
					<div className="text-left">
						<h1 className="font-bold text-2xl pt-5">
							{/* Buy a dozen cards... only pay for 10!
							 */}
							Free Shipping
						</h1>
						{/* <p className="text-gray-500 text-md pt-4 text-left leading-relaxed block">
							Tell us how many of each…. “fish” and “golf”
							rulers you need to make 12, we’ll ship them
							and your envelopes to you FREE.
						</p> */}

						<button
							onClick={goToBuy}
							className="bg-[#02533C] mt-3 w-30 px-5 py-2 rounded-md text-white font-bold text-md hover:underline hover:text-white "
						>
							Buy Now
						</button>
					</div>
				</div>
				<div className="text-left w-full lg:w-2/3">
					<h1 className="font-bold text-2xl pt-10">
						Finally, a greeting card you don’t throw away!
					</h1>
					<div>
						<p className="text-gray-500 text-md pt-4 text-left leading-relaxed block">
							Stop going to the store and looking over
							hundreds of cards just to pick one that will
							get thrown away! MEASURES OF FUN laminated
							cards are cards forever!
						</p>
						<p className="text-gray-500 text-md pt-4 text-left leading-relaxed block">
							So if it’s for birthdays, anniversaries,
							graduation, thank you, get well, I need a
							favor or just because I love you! Save your
							time, money and give them more than a card!
							Our card is a piece of art, something to keep
							on your end/coffee table, use as a straight
							edge or ruler and take to the golf course or
							fishing!
						</p>
						<p className="text-gray-500 text-md pt-4 text-left leading-relaxed block">
							Our mailing envelope is YOUR MESSAGE BOARD!
							You can fill out the form here online and
							we’ll fill it in for you or you can have us
							mail it to you, so you can fill it out
							yourself.
						</p>
						<p className="text-gray-500 text-md pt-4 text-left leading-relaxed block">
							What is it? A new greeting card! But MORE! An
							illustrated, laminated card with its own
							envelope. A humorous look at either a
							fisherman or a golfer. How they measure the
							fish they’ve caught or the golf ball they
							play. Laminated to last a long time and unlike
							most greeting cards… you don’t throw this
							away!
						</p>
						<p className="text-gray-500 text-md pt-4 text-left leading-relaxed block">
							Two cards to choose from: Our Marv and Bucks
							fish ruler! Do fishermen stretch the truth
							about how big their fish was? Well maybe? This
							laminated ruler gives two ________ (eye
							popping) examples of how your friend or family
							member… measures their fish! Our Marv and
							Bucks golf ruler can let your golf buddies
							know when that Gimme is due! And take a close
							look at all the things going on around your
							golf ball.
						</p>

						<p className="text-gray-500 text-md pt-4 pb-4 text-left leading-relaxed block">
							Did we say MORE than a card…? Yup, a card
							that’s laminated to keep (maybe forever)...
							and an actual straight edge ruler for
							projects. Our envelope… becomes your message
							board to whoever you’re giving it to. And
							we’ll fill it out and mail it too! There’s
							room for your message… plus choose from
							numerous humorous sayings to check off.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default about;
