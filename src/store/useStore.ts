import { create } from 'zustand';

interface User {
    email: string | null;
    displayName: string | null;
    [key: string]: any;
}

interface AppState {
    user: User | null;
    isAdmin: boolean;
    setUser: (user: User | null) => void;
    setIsAdmin: (isAdmin: boolean) => void;
    logout: () => void;
}

const useStore = create<AppState>((set) => ({
    user: null,
    isAdmin: false,
    setUser: (user) => set({ user, isAdmin: user?.email === 'admin@farmhannong.com' || user?.isAdmin }),
    setIsAdmin: (isAdmin) => set({ isAdmin }),
    logout: () => set({ user: null, isAdmin: false }),
}));

export default useStore;
