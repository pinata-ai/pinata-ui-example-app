import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, saveUser, removeUser } from '../utils';

type AuthContextType = {
    user: any;
    login: (userData: any) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser().then(u => {
            if (u) setUser(u);
            setLoading(false);
        });
    }, []);

    const login = async (userData: any) => {
        await saveUser(userData);
        setUser(userData);
    };

    const logout = async () => {
        await removeUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
