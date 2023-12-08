import axios from 'axios';
const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
console.log( process.env.BACKEND_URL)

export const signup = async (userDetails) => {
    console.log(process.env)
    const response = await axios.post(`${backendUrl}/api/v1/users/signup`, userDetails);
    return response.data;    
};

export const verifyUserToken = async (token) => {
    const response = await axios.get(`${backendUrl}/api/v1/users/verify/:token`, token);
    return response.data;
};

export const signin = async (userDetails) => {
    try {
        console.log(process.env) 
        const response = await axios.post(`${backendUrl}/api/v1/users/signin`, userDetails);
        console.log('logged in user', response.data)
        const loggedInUser = response.data
        cookies.set("token", loggedInUser.token)
        localStorage.setItem('accessToken', loggedInUser.token);
        return response.data;   
    } catch (error) {
        console.log('error log in user', error.response.data)
        // return NextResponse.json({ error: err, success: false }, { status: 500 })
    }
};
