import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export function Landing() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address (e.g., name@example.com)');
      return;
    }

    try {
      setLoading(true);
      // Insert email into the waitlist table
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (insertError) throw insertError;

      // Call the Edge Function to send a confirmation email
      const { error: functionError } = await supabase.functions.invoke('send-waitlist-confirmation', {
        body: JSON.stringify({ email })
      });

      if (functionError) throw functionError;

      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to join waitlist. Please try again or contact support.');
      console.error('Waitlist error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div 
      className="flex-grow flex flex-col items-center justify-center text-center p-4" 
      style={{
        // Light background color to complement the grid lines
        backgroundColor: '#F0F4F8', 
        backgroundImage: `
          linear-gradient(
            rgba(148, 163, 184, 0.1) 1px, 
            transparent 1px
          ),
          linear-gradient(
            90deg, 
            rgba(148, 163, 184, 0.1) 1px, 
            transparent 1px
          )
        `,
        backgroundSize: '20px 20px'
      }}
    >
      <div className="max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
          The Only Advanced Search Engine For University Discoveries
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
          Search through <span className="bg-blue-600 text-white px-2 py-0.5 rounded-lg">10,000+</span> technologies from leading universities ready for commercialization. Sign up to be notified when we launch open beta!
        </p>
        <form onSubmit={handleWaitlistSignup} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow w-full sm:w-auto"
            required
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Join Waitlist!'}
          </button>
        </form>
        <div className="w-full text-center">
          {error && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-500 text-sm mt-2 animate-fade-in">
              🎉 Thanks for joining! You'll be the first to know about new features.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}