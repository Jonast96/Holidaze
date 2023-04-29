import { useState, useEffect } from "react";

export default function useApiCall(url, headers = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw errorData;
                }

                const responseData = await response.json();
                setData(responseData);
                setLoading(false);
            } catch (error) {
                console.log("Error:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, loading };
}
