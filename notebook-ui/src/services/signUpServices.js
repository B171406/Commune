
export const signUp = async (formData) => {
    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const result = await response.json();
        const { accessToken } = result
        localStorage.setItem('accessToken', accessToken);
    } catch (error) {
        console.error('Error:', error);
        // Handle error
    }
  };