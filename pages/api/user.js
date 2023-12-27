import axios from 'axios';
const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
console.log('process.env.BACKEND_URL', process.env.BACKEND_URL)

export const signup = async (userDetails) => {
    try {
        const response = await axios.post(`${backendUrl}/api/v1/users/signup`, userDetails);
        console.log('signed up user', response)
        return response.data;   
    } catch (error) {
        console.log('error registering in user', error.response.data) 
    } 
};

export const verifyUserToken = async (token) => {
    try {
        const response = await axios.get(`${backendUrl}/api/v1/users/verify/:token`, token);
        return response.data;
    } catch (error) {
        console.log('error verying user', error.response.data) 
    }

};

export const signin = async (userDetails) => {
    try {
		console.log(`process.env.BACKEND_URL, ${process.env.BACKEND_URL}, ::backendUrl::, ${backendUrl}`)
		const response = await axios.post(
			`${backendUrl}/api/v1/users/signin`,
			userDetails,
		);
		console.log('logged in user', response.data);
		const loggedInUser = response.data;
		localStorage.setItem(
			'accessToken',
			loggedInUser.token,
		);
		return response.data;
	} catch (error) {
	console.log('error log in user', error.response.data);
	// return NextResponse.json({ error: err, success: false }, { status: 500 })
    }
};
