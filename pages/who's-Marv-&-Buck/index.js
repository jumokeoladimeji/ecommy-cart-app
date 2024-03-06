import { useRouter } from 'next/router';
import React from 'react';

const markAndBuck = () => {
	const router = useRouter();
	const goToBuy = () => {
		router.push('/buy');
	};
	return (
		<div className="text-center">
            <h1 className="font-bold text-2xl pt-10">
            Measures of Fun - Who’s Marv and Buck you ask. . .
            </h1>
			<div className="flex w-full flex-col justify-between max-w-5xl mx-auto md:flex-row gap-3 lg:gap-30 pt-10 px-5 md:px-10">
				
				<div className="w-full lg:w-1/2 pt-10">
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
                        <img
                            src="/marv-and-buck.jpeg"
                            className="h-auto w-full rounded-lg max-w-full border-4 border-[#02533C]"
                            alt=""
                        />
						<p className="text-gray-500 text-lg pt-4 text-justify leading-relaxed block">
                        Well, Marv and Buck, whose names appear on the rulers, are the average everyday person’s
                         that love to fish and play golf, but they’re no professionals!  🤔🤪.  
                        They’re the typical “wannabe “ fisherman and golfers, just like you and me. 
                        Daydreamers of the next time to go golfing or fishing!
                        Oh, the stories they can tell! Share one of these laminated rulers (gifts) with your wannabe family/friends.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default markAndBuck;
