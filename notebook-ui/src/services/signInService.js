
import axios from 'axios';


export const signIn = async (formData) => {
    const { email, password } = formData;

    try {
        const response = await axios.post('http://localhost:5000/login', {
            email,
            password
        });

        console.log('Login successful:', response.data);
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
    } catch (error) {
        console.error('Login error:', error.response.data.error);
        // Handle error if login fails
    }
};
