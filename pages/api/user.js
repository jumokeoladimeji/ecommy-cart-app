import axios from 'axios';
const backendUrl =
	'https://ecommy.up.railway.app' ||
	'http://localhost:8000';

export const signup = async (userDetails) => {
	try {
		const response = await axios.post(
			`${backendUrl}/api/v1/users/signup`,
			userDetails,
		);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const verifyUserToken = async (token) => {
	try {
		const response = await axios.get(
			`${backendUrl}/api/v1/users/verify/:token`,
			token,
		);
		return response.data;
	} catch (error) {
		console.log('error verying user', error.response.data);
	}
};

export const signin = async (userDetails, loginUser) => {
	try {

		const response = await axios.post(
			`${backendUrl}/api/v1/users/signin`,
			userDetails,
		);

		const loggedInUser = response.data;
		if (loggedInUser.token) {
			localStorage.setItem(
				'accessToken',
				loggedInUser.token,
			);
		}

		loginUser(loggedInUser, loggedInUser.token);
		return response.data;
	} catch (error) {
		// return NextResponse.json({ error: err, success: false }, { status: 500 })
		return error.response;
	}
};

export const updateUser = async (userId, userData) => {
	const response = await axios.put(
		`${backendUrl}/api/v1/users/${userId}`,
		userData,
	);
	return response.data;
};
