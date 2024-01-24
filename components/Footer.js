import React, { useEffect, useState } from 'react';

const Footer = () => {
	const [currentYear, setCurrentYear] = useState(
		new Date().getFullYear(),
	);

	useEffect(() => {
		// Update the current year when the component mounts
		setCurrentYear(new Date().getFullYear());
	}, []);

	return (
		<div>
			<div>
				<div className="py-6 shadow-md bg-gray-50">
					<p className="text-center text-md text-gray-500">
						&copy; {currentYear} Measures of Fun. All Rights
						Reserved.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
