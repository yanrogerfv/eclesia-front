"use client"

import { useState, useEffect } from "react";

export default function useSessionStorage(key: string, initialValue: any) {
    const [storedValue, setStoredValue] = useState(() => {{
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.error(`Error reading sessionStorage key “${key}”:`, error);
            return initialValue;
        }
    }});

    const setValue = (value: any) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            sessionStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch (error) {
            console.error(`Error setting sessionStorage key “${key}”:`, error);
        }
    };

    return [storedValue, setValue];
}

// const [session, setSession] = useState(false);

// useEffect(() => {
//     // This code now runs only on the client side, avoiding the ReferenceError
//     const userAdmin = sessionStorage.getItem("role") === "ADMIN";
//     setSession(userAdmin);
// }, []);

// export { session };
