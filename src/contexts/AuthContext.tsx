import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  demoSignIn: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedDemo = localStorage.getItem('demo_admin_session');
      return savedDemo ? JSON.parse(savedDemo) : null;
    } catch {
      return null;
    }
  });
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('demo_admin_session'));
    } catch {
      return false;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminRole = async (userId: string) => {
    // If it's the demo user, keep admin true
    if (userId === 'demo-admin-id' || localStorage.getItem('demo_admin_session')) {
      setIsAdmin(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (!error && data) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.warn('Admin check fallback:', err);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Check if demo user is active
    if (localStorage.getItem('demo_admin_session')) {
      setIsLoading(false);
      return;
    }

    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const res = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (localStorage.getItem('demo_admin_session')) return;
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            setTimeout(() => {
              checkAdminRole(session.user.id);
            }, 0);
          } else {
            setIsAdmin(false);
          }
        }
      );
      subscription = res.data.subscription;
    } catch (e) {
      console.warn('Auth state change listener warning:', e);
    }

    supabase.auth.getSession().then(({ data }) => {
      if (localStorage.getItem('demo_admin_session')) {
        setIsLoading(false);
        return;
      }
      const session = data?.session ?? null;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
      setIsLoading(false);
    }).catch((err) => {
      console.warn('Get session error:', err);
      setIsLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const demoSignIn = () => {
    const mockDemoUser = {
      id: 'demo-admin-id',
      email: 'demo.admin@aplushustler.com',
      app_metadata: {},
      user_metadata: { name: 'Demo Administrator' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as unknown as User;

    localStorage.setItem('demo_admin_session', JSON.stringify(mockDemoUser));
    setUser(mockDemoUser);
    setIsAdmin(true);
  };

  const signIn = async (email: string, password: string) => {
    localStorage.removeItem('demo_admin_session');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string) => {
    localStorage.removeItem('demo_admin_session');
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl },
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    localStorage.removeItem('demo_admin_session');
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Signout warning:', e);
    }
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading, signIn, signUp, signOut, demoSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
