import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: (username, password) => {
        if (username === ADMIN_CREDENTIALS.username &&
          password === ADMIN_CREDENTIALS.password) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name)
      }
    }
  )
);

export default useAuthStore;