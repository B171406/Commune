
import axios from 'axios';


export const signIn = async (formData) => {

    const { email, password } = formData;

    try {
        const response = await axios.post('http://localhost:5000/login', {
            email,
            password
        });
        return  response.data

    } catch (error) {
        console.error('Login error:', error.response.data.error);
        // Handle error if login fails
    }
};
