import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { useLanguage } from '../lib/LanguageContext';
import { newsletterAPI } from '../lib/api';

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const email = searchParams.get('email');

  useEffect(() => {
    if (!email) {
      setStatus('error');
      return;
    }

    const performUnsubscribe = async () => {
      try {
        await newsletterAPI.unsubscribe(email);
        setStatus('success');
      } catch (err) {
        console.error('Unsubscribe error:', err);
        setStatus('error');
      }
    };

    performUnsubscribe();
  }, [email]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl text-center"
      >
        <div>
          <span className="text-primary font-bold text-sm tracking-wider uppercase">
            {t.unsubscribe.title}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            {t.unsubscribe.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t.unsubscribe.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-6">
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="text-primary"
              >
                <FiLoader size={48} />
              </motion.div>
              <p className="text-gray-500 text-sm font-medium">
                {t.unsubscribe.unsubscribing}
              </p>
            </div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-pulse">
                <FiCheckCircle size={36} />
              </div>
              <p className="text-gray-700 font-semibold text-base px-2">
                {t.unsubscribe.success}
              </p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <FiAlertCircle size={36} />
              </div>
              <p className="text-gray-700 font-semibold text-base px-2">
                {t.unsubscribe.error}
              </p>
            </motion.div>
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            {t.unsubscribe.goHome}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
