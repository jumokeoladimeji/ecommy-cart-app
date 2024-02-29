import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed top-0 left-0 w-full min-h-screen h-80 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white px-2 pt-2 -pb-40 rounded-md shadow-md w-full lg:w-2/3 overflow-scroll">
				{children}
			</div>
		</div>
	);
};

export default Modal;
