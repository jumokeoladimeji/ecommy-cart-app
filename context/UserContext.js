import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		// Check if user data exists in local storage on initial load
		const userData = localStorage.getItem('userData');
		const storedToken = localStorage.getItem('token');

		if (userData && storedToken) {
			setUser(JSON.parse(userData));
			setToken(storedToken);
		}
	}, []);

	const loginUser = (userData, authToken) => {
		setUser(userData);
		setToken(authToken);

		// Store user data and token in local storage
		localStorage.setItem(
			'userData',
			JSON.stringify(userData),
		);
		localStorage.setItem('token', authToken);
	};

	const logoutUser = () => {
		setUser(null);
		setToken(null);

		// Clear user data and token from local storage
		localStorage.removeItem('userData');
		localStorage.removeItem('token');
	};

	return (
		<UserContext.Provider
			value={{ user, token, loginUser, logoutUser }}
		>
			{children}
		</UserContext.Provider>
	);
};
