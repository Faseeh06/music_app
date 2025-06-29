import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface SignUpFormProps {
  onSignUp?: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth(); // Added signup here
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
    const newErrors: Record<string, string> = {};    if (!formData.firstName.trim()) newErrors.firstName = '名前は必須です';
    if (!formData.lastName.trim()) newErrors.lastName = '姓は必須です';
    if (!formData.email.trim()) newErrors.email = 'メールアドレスは必須です';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'メールアドレスが無効です';
    if (!formData.password) newErrors.password = 'パスワードは必須です';
    else if (formData.password.length < 8) newErrors.password = 'パスワードは8文字以上である必要があります';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'パスワードが一致しません';
    if (!agreeTerms) newErrors.terms = '利用規約に同意する必要があります';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    try {
      const displayName = `${formData.firstName} ${formData.lastName}`.trim();
      await signup(formData.email, formData.password, displayName);
      // Successfully signed up, now navigate
      // You might want to navigate to a dashboard or a specific page after signup
      // For now, let's assume successful signup means the user can proceed.
      // If onSignUp prop is provided, call it. Otherwise, navigate to a default page.
      if (onSignUp) {
        onSignUp();
      } else {
        // Navigate to a dashboard or home page after successful signup
        // Or, if profile setup is still a separate step, navigate there,
        // but now the user is actually created in Firebase.
        navigate('/settings', { 
          state: { 
            email: formData.email, 
            // No need to pass password here anymore as user is created
            firstName: formData.firstName,
            lastName: formData.lastName,
          } 
        }); 
        // Or navigate('/'); if profile setup is part of the initial signup flow
      }    } catch (error) { // Changed error type to unknown for Firebase errors
      console.error('Error during sign up:', error);
      // Handle Firebase specific errors if needed
      if (error instanceof Error && 'code' in error && (error as Error & { code: string }).code === 'auth/email-already-in-use') {
        setErrors({ email: 'このメールアドレスは既に使用されています。' });
      } else if (error instanceof Error) {
        setErrors({ submit: error.message || 'サインアップに失敗しました。もう一度お試しください。' });
      } else {
        setErrors({ submit: '不明なエラーが発生しました。もう一度お試しください。' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrors({});

    try {
      const userCredential = await loginWithGoogle();
      // Extract first and last name from Google display name
      let firstName = '';
      let lastName = '';
      const displayName = userCredential.user.displayName;
      if (displayName) {
        const nameParts = displayName.split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }

      if (onSignUp) {
        onSignUp();
      } else {
        console.log('Navigating to settings page with Google user first and last name...');
        navigate('/settings', { 
          state: { 
            firstName: firstName, 
            lastName: lastName,
            isGoogleSignIn: true // Flag to indicate Google sign-in
          } 
        });
      }
    } catch (error: unknown) {
      console.error('Google sign in error:', error);
      const errorMessage = 'Googleでのサインインに失敗しました。もう一度お試しください。';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
            
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {errors.submit}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div>            <label className="block text-sm font-medium text-brand-dark mb-2">
              名前
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-colors ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="太郎"
              />
            </div>
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>            <label className="block text-sm font-medium text-brand-dark mb-2">
              姓
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-colors ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="田中"
              />
            </div>
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

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

        <div>          <label className="block text-sm font-medium text-brand-dark mb-2">
            パスワード確認
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-colors ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-1 mr-3 rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
          />          <label htmlFor="terms" className="text-sm text-gray-600">
            <a href="#" className="text-brand-brown hover:underline">利用規約</a>
            と
            <a href="#" className="text-brand-brown hover:underline">プライバシーポリシー</a>
            を読み、同意します
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-brand text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'アカウント作成中...' : 'サインアップ'}
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

export default SignUpForm;