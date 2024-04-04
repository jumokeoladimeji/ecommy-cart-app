import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 md:p-8 max-w-screen-lg w-full h-full overflow-y-auto">
				{children}
			</div>
		</div>
	);
};

export default Modal;
