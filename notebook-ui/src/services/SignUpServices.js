
import axios from 'axios';


export const  signUp = async (formData) => {

    const { firstName, lastName, email, password} = formData;

    try {
        const response = await axios.post('http://localhost:5000/register', {
            firstName,
            lastName,
            email,
            password
        });
        return  response.data

    } catch (error) {
        console.error('Login error:', error.response.data.error);
        // Handle error if login fails
    }
};
