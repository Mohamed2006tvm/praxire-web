import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiBriefcase, FiMapPin, FiClock, FiUpload, FiCheckCircle, FiChevronLeft, FiAlertCircle } from 'react-icons/fi';
import { careersAPI, internshipsAPI } from '@/lib/api';
import { useLanguage } from '../lib/LanguageContext';

export default function Apply() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverNote: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    const fetchRole = async () => {
      try {
        let res;
        if (type === 'career') {
          res = await careersAPI.getById(id);
          setRole(res.data.career);
        } else if (type === 'internship') {
          res = await internshipsAPI.getById(id);
          setRole(res.data.role);
        } else {
          setError('Invalid application path.');
        }
      } catch (err) {
        console.error('Failed to load role details:', err);
        setError('Failed to load role details. The role may no longer be active or available.');
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [type, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setSubmitError(t.careers.applyModal.error || 'Please upload your resume.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('coverNote', formData.coverNote);
    submitData.append('resume', resumeFile);

    try {
      if (type === 'career') {
        await careersAPI.apply(id, submitData);
      } else {
        await internshipsAPI.apply(id, submitData);
      }
      setSubmitSuccess(true);
    } catch (err) {
      console.error('Failed to submit application:', err);
      setSubmitError(err.response?.data?.error || t.careers.applyModal.error || 'Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading position details...</p>
        </div>
      </div>
    );
  }

  if (error || !role) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-24 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-border shadow-xl text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-4">
            <FiAlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Error</h2>
          <p className="mt-3 text-text-secondary text-sm leading-relaxed">{error || 'Role not found.'}</p>
          <button
            onClick={() => navigate(type === 'internship' ? '/internships' : '/careers')}
            className="mt-6 w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold transition-all shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header Info */}
      <section className="bg-white py-12 border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={type === 'internship' ? '/internships' : '/careers'}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark mb-6 group transition-colors"
          >
            <FiChevronLeft className="transition-transform group-hover:-translate-x-1" />
            {type === 'internship' ? 'Back to Internships' : 'Back to Careers'}
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                {type === 'internship' ? 'Internship Opportunity' : 'Career Opening'}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3 tracking-tight">
                {role.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-text-secondary mt-3">
                <span className="flex items-center gap-1.5"><FiBriefcase className="text-slate-400" /> {role.department}</span>
                {type === 'career' ? (
                  <>
                    <span className="flex items-center gap-1.5"><FiMapPin className="text-slate-400" /> {role.location}</span>
                    <span className="flex items-center gap-1.5"><FiClock className="text-slate-400" /> {role.type}</span>
                  </>
                ) : (
                  <span className="flex items-center gap-1.5"><FiClock className="text-slate-400" /> {role.duration} ({t.internships.remoteFlexible})</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Details Column */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-border shadow-md">
            <h3 className="text-xl font-bold text-text-primary mb-4">Position Details</h3>
            <div className="prose prose-slate max-w-none text-sm text-text-secondary leading-relaxed mb-6">
              <p className="whitespace-pre-wrap">{role.description}</p>
            </div>

            {role.requirements && role.requirements.length > 0 && (
              <div>
                <h4 className="font-bold text-text-primary text-sm uppercase tracking-wider mb-3">Key Requirements</h4>
                <ul className="space-y-2">
                  {role.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-border shadow-md">
            {!submitSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-text-primary tracking-tight">Submit Your Application</h3>
                  <p className="text-text-secondary text-sm mt-1">Please complete the form below and attach your latest resume.</p>
                </div>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-text-primary uppercase tracking-wide mb-1.5">
                      {t.careers.applyModal.name} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.careers.applyModal.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-text-primary bg-slate-50/50 focus:bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-text-primary uppercase tracking-wide mb-1.5">
                      {t.careers.applyModal.email} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.careers.applyModal.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-text-primary bg-slate-50/50 focus:bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-text-primary uppercase tracking-wide mb-1.5">
                      {t.careers.applyModal.phone} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t.careers.applyModal.phonePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-text-primary bg-slate-50/50 focus:bg-white"
                    />
                  </div>

                  {/* Cover Note */}
                  <div>
                    <label className="block text-xs font-bold text-text-primary uppercase tracking-wide mb-1.5">
                      {t.careers.applyModal.coverNote}
                    </label>
                    <textarea
                      name="coverNote"
                      rows="4"
                      value={formData.coverNote}
                      onChange={handleInputChange}
                      placeholder={t.careers.applyModal.coverPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-text-primary resize-none bg-slate-50/50 focus:bg-white"
                    />
                  </div>

                  {/* Resume File Upload */}
                  <div>
                    <label className="block text-xs font-bold text-text-primary uppercase tracking-wide mb-1.5">
                      {t.careers.applyModal.resume} <span className="text-rose-500">*</span>
                    </label>
                    <label className="border-2 border-dashed border-slate-200 hover:border-primary/50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 bg-slate-50/30">
                      <input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <FiUpload className="w-10 h-10 text-slate-400 mb-3" />
                      <span className="text-sm font-semibold text-text-secondary text-center">
                        {t.careers.applyModal.dragDrop}
                      </span>
                      {resumeFile && (
                        <span className="mt-3 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {resumeFile.name}
                        </span>
                      )}
                    </label>
                  </div>
                </div>

                {submitError && (
                  <p className="text-xs font-semibold text-rose-500 bg-rose-50 p-4 rounded-xl border border-rose-100 flex items-center gap-2">
                    <FiAlertCircle className="shrink-0" /> {submitError}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t.careers.applyModal.submitting}
                      </>
                    ) : (
                      t.careers.applyModal.submit
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center py-12">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6 animate-bounce">
                  <FiCheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-extrabold text-text-primary tracking-tight">
                  {t.careers.applyModal.success}
                </h3>
                <p className="mt-3 text-text-secondary text-sm leading-relaxed max-w-md">
                  {t.careers.applyModal.successSub}
                </p>
                <button
                  onClick={() => navigate(type === 'internship' ? '/internships' : '/careers')}
                  className="mt-8 px-8 py-3.5 bg-text-primary hover:bg-black text-white rounded-xl text-sm font-bold transition-all shadow-md"
                >
                  {t.careers.applyModal.close}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
