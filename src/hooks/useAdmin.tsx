import { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  token: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

function isValidAdminTokenShape(token: string | null): token is string {
  return !!token && token.split('.').length === 3;
}

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = sessionStorage.getItem('admin_token');
    if (isValidAdminTokenShape(storedToken)) return storedToken;
    sessionStorage.removeItem('admin_token');
    return null;
  });

  const isAuthenticated = isValidAdminTokenShape(token);

  const login = async (password: string): Promise<boolean> => {
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/admin-auth`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, action: 'login' }),
        }
      );
      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        sessionStorage.setItem('admin_token', data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('admin_token');
  };

  return (
    <AdminContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}
