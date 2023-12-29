import axios from 'axios';
const backendUrl =
	'https://ecommy.up.railway.app' ||
	'http://localhost:8000';
console.log(process.env.BACKEND_URL);

export const signup = async (userDetails) => {
	try {
		const response = await axios.post(
			`${backendUrl}/api/v1/users/signup`,
			userDetails,
		);
		console.log('signed up user', response);
		return response.data;
	} catch (error) {
		console.log(
			'error registering in user',
			error.response.data,
		);
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
		console.log(
			`process.env.NEXT_PUBLIC_BACKEND_URL, ${process.env.NEXT_PUBLIC_BACKEND_URL}, ::backendUrl::, ${backendUrl}`,
		);
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
	} catch (error) {
		console.log('error log in user', error.response);
		// return NextResponse.json({ error: err, success: false }, { status: 500 })
	}
};
