import axios from "axios"
import { API_URL } from "../utility/constant"

export const getAllProducts = async (token) => {
    try {

        const response = await axios.get(`${API_URL}/api/products`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const createProduct = async (token, payload) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/products`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                }
            }
        );
        return response?.data;
    } catch (err) {
        console.log(err);
    }
}

export const updateProduct = async (token, id, payload) => {
    try {
        const response = await axios.put(
            `${API_URL}/api/products/${id}`,
            payload, // Pass the payload as the body
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (id, token) => {
    try {
        const response = await axios.delete(
            `${API_URL}/api/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}` // Pass the Bearer token
                }
            }
        );
        return response.data; // Return the response data if needed
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};

export const validateUser = async (payload) => {
    try {
        // Send POST request to the API
        const response = await axios.post(
            `http://localhost:7878/api/auth/login`, // Append endpoint explicitly
            payload,
            {
                headers: {
                    "Content-Type": "application/json", // Explicitly set headers
                },
            }
        );
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