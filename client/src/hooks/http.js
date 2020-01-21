import {
    useState,
    useCallback
} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setErr] = useState(null)
    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true)
        try {
            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, {
                method,
                body,
                headers
            })
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrtong')
            }
            setLoading(false)

            return data
        } catch (error) {
       
            setLoading(false)
            setErr(error.message)
            throw error
        }

    }, [])
    const clearError = useCallback(() => {
        setErr(null)
    }, [])
    return {
        loading,
        request,
        error,
        clearError
    }
}