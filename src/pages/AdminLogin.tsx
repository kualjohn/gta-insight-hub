import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const success = await login(password);
    setLoading(false);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-7 h-7 text-accent" />
            </div>
            <h1 className="font-display text-3xl text-foreground mb-2">Admin</h1>
            <p className="font-body text-sm text-muted-foreground">Enter your password to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-transparent border-b border-border py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
            {error && <p className="font-body text-sm text-destructive">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground py-3 font-body text-xs tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
