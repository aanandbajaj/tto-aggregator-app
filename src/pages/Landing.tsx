import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

export function Landing() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  // Commenting out the waitlist signup function
  /*
  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);

      // Check if email already exists in the waitlist
      const { data: existingEmails, error: fetchError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email);

      if (fetchError) throw fetchError;

      if (existingEmails && existingEmails.length > 0) {
        setError('This email is already on the waitlist.');
        return;
      }

      // Insert into waitlist table
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (insertError) throw insertError;

      // Send email using EmailJS
      const emailParams = {
        to_email: email,
        message: 'Thank you for joining our waitlist!',
      };

      await emailjs.send('service_3iswzli', 'template_vpciy1b', emailParams, 'YOUR_USER_ID');

      setSuccess(true);
      setSuccessMessage('🎉 Thank you for joining! You\'ll be the first to know about new features.');
      setEmail('');
      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      let errorMessage = 'Failed to join waitlist';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  */

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
        {/* Comment out the waitlist form */}
        {/* <form onSubmit={handleWaitlistSignup} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
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
        </form> */}
        <div className="w-full text-center">
          {error && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in">
              {error}
            </p>
          )}

          {successMessage && (
            <p className="text-green-500 text-sm mt-2 animate-fade-in">
              {successMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}