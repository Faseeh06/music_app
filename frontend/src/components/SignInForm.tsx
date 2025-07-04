import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface SignInFormProps {
  onSignIn?: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { login, resetPassword, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};    if (!formData.email.trim()) newErrors.email = 'メールアドレスが必要です';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'メールアドレスが無効です';
    if (!formData.password) newErrors.password = 'パスワードが必要です';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await login(formData.email, formData.password);
      if (onSignIn) {
        onSignIn();
      } else {
        navigate('/dashboard');
      }    } catch (error: unknown) {
      console.error('Sign in error:', error);      const errorMessage = error instanceof Error && 'code' in error && error.code === 'auth/invalid-credential'
        ? 'メールアドレスまたはパスワードが無効です' 
        : 'サインインに失敗しました。もう一度お試しください。';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {    if (!formData.email) {
      setErrors({ email: '最初にメールアドレスを入力してください' });
      return;
    }

    try {
      await resetPassword(formData.email);
      alert('パスワードリセットメールが送信されました！受信箱をご確認ください。');} catch (error: unknown) {
      console.error('Password reset error:', error);      setErrors({ 
        submit: 'パスワードリセットメールの送信に失敗しました。もう一度お試しください。' 
      });
    }
  };
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrors({});

    try {
      await loginWithGoogle();
      // Navigation will be handled by the ProtectedRoute component
      // which will redirect to profile setup if needed
      if (onSignIn) {
        onSignIn();
      } else {
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      console.error('Google sign in error:', error);      setErrors({ 
        submit: 'Googleでのサインインに失敗しました。もう一度お試しください。' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        
      </div>      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {errors.submit}
          </div>
        )}
        
        <div>          <label className="block text-sm font-medium text-brand-dark mb-2">
            メールアドレス
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>          <label className="block text-sm font-medium text-brand-dark mb-2">
            パスワード
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-colors ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
            />            <label htmlFor="remember" className="text-sm text-gray-600">
              ログイン状態を保持
            </label>
          </div>          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-brand-brown hover:underline"
          >
            パスワードを忘れましたか？
          </button>
        </div>        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-brand text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'サインイン中...' : 'サインイン'}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-brand-light text-gray-500">または</span>
          </div>
        </div>        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-brown focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-4 h-4 mr-2"
          />          <span className="text-gray-700 font-medium">
            {loading ? 'サインイン中...' : 'Googleで続行'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default SignInForm;