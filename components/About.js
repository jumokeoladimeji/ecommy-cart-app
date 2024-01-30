import React from 'react';

const About = () => {
	return (
		<div className="relative">
			{/* <CarouselList cards={imageUrls}/> */}
			<article className="flex flex-col gap-3 bg-white p-8  text-center mb-6">
				<div className="text-2xl font-semibold mt-auto">
					<div className="flex flex-col md:flex-row gap-3 lg:gap-10">
						<img
							src="/about.png"
							className="h-96 w-full object-cover rounded-lg"
							// h-auto max-w-full rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30
							alt=""
						/>
						<div className="text-left">
							<h1>
								Finally, a greeting card you don’t throw
								away!
							</h1>
							<p className="text-gray-500 text-sm pt-4 text-left line-clamp-3 block">
								Stop going to the store and looking over
								hundreds of cards just to pick one that will
								get thrown away! MEASURES OF FUN laminated
								cards are cards forever!
							</p>
							<p className="text-gray-500 text-sm pt-4 text-left line-clamp-3 block">
								So if it’s for birthdays, anniversaries,
								graduation, thank you, get well, I need a
								favor or just because I love you! Save your
								time, money and give them more than a card!
								Our card is a piece of art, something to
								keep on your end/coffee table, use as a
								straight edge or ruler and take to the golf
								course or fishing!
							</p>
							<p className="text-gray-500 text-sm pt-4 text-left line-clamp-3 block">
								Our mailing envelope is YOUR MESSAGE BOARD!
								You can fill out the form here online and
								we’ll fill it in for you or you can have us
								mail it to you, so you can fill it out
								yourself.
							</p>
							<p className="text-gray-500 text-sm pt-4 text-left line-clamp-3 block">
								What is it? A new greeting card! But MORE!
								An illustrated, laminated card with its own
								envelope. A humorous look at either a
								fisherman or a golfer. How they measure the
								fish they’ve caught or the golf ball they
								play. Laminated to last a long time and
								unlike most greeting cards… you don’t throw
								this away!
							</p>
							<p className="text-gray-500 text-sm pt-4 text-left line-clamp-3 block">
								Two cards to choose from: Our Marv and Bucks
								fish ruler! Do fishermen stretch the truth
								about how big their fish was? Well maybe?
								This laminated ruler gives two ________ (eye
								popping) examples of how your friend or
								family member… measures their fish! Our Marv
								and Bucks golf ruler can let your golf
								buddies know when that Gimme is due! And
								take a close look at all the things going on
								around your golf ball.
							</p>

							<p className="text-gray-500 text-sm pt-4 text-left line-clamp-3 block">
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
			</article>
		</div>
	);
};

export default About;
