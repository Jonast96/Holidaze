import { useState, useEffect } from "react";

/**
 * Custom hook for making API calls
 * @function useApiCall
 * @param {string} url - API endpoint URL
 * @returns {object} An object containing the API response data, error, and loading status
 */
export default function useApiCall(url) {
    /**
     * State for the API response data
     * @type {any}
     */
    const [data, setData] = useState(null);

    /**
     * State for any API error
     * @type {Error|null}
     */
    const [error, setError] = useState(null);

    /**
     * State for the API call loading status
     * @type {boolean}
     */
    const [loading, setLoading] = useState(true);

    /**
     * useEffect hook to fetch data from the API and update the state
     */
    useEffect(() => {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                setData(responseData);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return { data, error, loading };
}
