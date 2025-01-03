import axios from "axios";
import { API_URL } from "../../constants/constant";

/**
 * Validates the user by sending a POST request to the authentication API.
 *
 * @param {Object} payload - The user credentials (e.g., email and password).
 * @returns {Promise<Object>} - The API response data if successful, or an error object.
 */
export const validateUser = async (payload) => {
    try {
        // Send POST request to the API
        const response = await axios.post(
            `${API_URL}/api/auth/login`, // Append endpoint explicitly
            payload,
            {
                headers: {
                    "Content-Type": "application/json", // Explicitly set headers
                },
            }
        );
        console.log(response);
        // Return response data if the request is successful
        return response?.data;
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Error during user validation:", err.message);

        // Return a custom error message or throw the error
        if (err.response) {
            // API responded with a status code outside 2xx
            console.error("Response error:", err.response.data);
            throw new Error(err.response.data.error || "Invalid response from server.");
        } else if (err.request) {
            // Request was made, but no response was received
            console.error("No response received:", err.request);
            throw new Error("No response received from the server.");
        } else {
            // Something else went wrong during setup
            throw new Error("Error setting up the request.");
        }
    }
};

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to register user');
    return await response;
};
