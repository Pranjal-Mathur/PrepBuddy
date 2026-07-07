import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{ user, setUser, isLoading, setIsLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};