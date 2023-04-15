import { useState, useEffect } from "react";

export default function useApiCall(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("API call failed");
                }
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
