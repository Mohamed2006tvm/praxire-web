import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiInbox, FiBriefcase, FiLogOut, FiSearch, FiEye, FiTrash2,
  FiDownload, FiPlus, FiEdit2, FiToggleLeft, FiToggleRight,
  FiX, FiCheck, FiAlertTriangle, FiMenu, FiChevronRight,
  FiMail, FiPhone, FiHome, FiClock, FiUser, FiRefreshCw,
  FiCheckCircle, FiMapPin, FiType, FiList, FiFileText, FiMessageSquare
} from 'react-icons/fi';
import { contactsAPI, careersAPI, testimonialsAPI, internshipsAPI } from '@/lib/api';

// ─── Helpers ─────────────────────────────────────────────
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

// ─── Sub-component: Stat Card ─────────────────────────────
function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className={`bg-[#131c30] border border-white/5 rounded-2xl p-5 flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-white text-2xl font-extrabold mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ─── Sub-component: Contact Modal ─────────────────────────
function ContactModal({ contact, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-[#131c30] border border-white/10 rounded-3xl p-8 w-full max-w-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-white text-xl font-bold">{contact.name}</h3>
              <p className="text-slate-400 text-sm mt-0.5">{formatDate(contact.createdAt)}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <FiX size={20} />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <FiMail className="text-blue-400 shrink-0" size={16} />
              <a href={`mailto:${contact.email}`} className="text-blue-400 hover:underline">{contact.email}</a>
            </div>
            {contact.phone && (
              <div className="flex items-center gap-3 text-sm">
                <FiPhone className="text-slate-400 shrink-0" size={16} />
                <span className="text-slate-200">{contact.phone}</span>
              </div>
            )}
            {contact.companyName && (
              <div className="flex items-center gap-3 text-sm">
                <FiHome className="text-slate-400 shrink-0" size={16} />
                <span className="text-slate-200">{contact.companyName}</span>
              </div>
            )}
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Message</p>
            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{contact.message}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <a
              href={`mailto:${contact.email}?subject=Re: Your Praxire Enquiry`}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm text-center transition-all"
            >
              Reply via Email
            </a>
            <button onClick={onClose} className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm transition-all">
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Sub-component: Career Modal ──────────────────────────
function CareerModal({
  career,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(
    career || { title: '', department: '', location: '', type: 'Full-time', experience: '', description: '', requirements: [], isActive: true }
  );
  const [reqInput, setReqInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const addReq = () => {
    if (reqInput.trim()) {
      setForm((f) => ({ ...f, requirements: [...(f.requirements || []), reqInput.trim()] }));
      setReqInput('');
    }
  };

  const removeReq = (idx) => {
    setForm((f) => ({ ...f, requirements: (f.requirements || []).filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    if (!form.title || !form.department || !form.location || !form.description) {
      setError('Title, Department, Location, and Description are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave(form);
      onClose();
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60 transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-[#131c30] border border-white/10 rounded-3xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-xl font-bold">{career ? 'Edit Opening' : 'Add New Opening'}</h3>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <FiX size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className={labelClass}>Job Title *</label>
              <div className="relative">
                <FiType className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input className={`${inputClass} pl-10`} value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Senior Full-Stack Developer" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Department *</label>
              <input className={inputClass} value={form.department || ''} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="e.g. Engineering" />
            </div>
            <div>
              <label className={labelClass}>Location *</label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input className={`${inputClass} pl-10`} value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Remote / Hybrid" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Job Type</label>
              <select className={inputClass} value={form.type || 'Full-time'} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Experience</label>
              <input className={inputClass} value={form.experience || ''} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 2-4 years" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={4}
                value={form.description || ''}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the role and responsibilities..."
              />
            </div>

            {/* Requirements */}
            <div className="sm:col-span-2">
              <label className={labelClass}>
                <FiList className="inline mr-1" size={13} /> Requirements
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  className={`${inputClass} flex-1`}
                  value={reqInput}
                  onChange={(e) => setReqInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addReq())}
                  placeholder="Add a requirement and press Enter..."
                />
                <button onClick={addReq} className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shrink-0">
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(form.requirements || []).map((req, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/15 border border-blue-500/20 text-blue-300 text-xs font-medium">
                    {req}
                    <button onClick={() => removeReq(i)} className="text-blue-400 hover:text-white transition-colors ml-0.5">
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Active toggle */}
            <div className="sm:col-span-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, isActive: !form.isActive })}
                className={`relative w-12 h-6 rounded-full transition-colors ${form.isActive ? 'bg-emerald-500' : 'bg-slate-600'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.isActive ? 'left-7' : 'left-1'}`} />
              </button>
              <span className="text-slate-300 text-sm font-medium">
                {form.isActive ? 'Active (visible on website)' : 'Inactive (hidden from website)'}
              </span>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-2">
              <FiAlertTriangle size={14} /> {error}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? <><FiRefreshCw className="animate-spin" size={14} /> Saving...</> : <><FiCheck size={16} /> {career ? 'Update Opening' : 'Create Opening'}</>}
            </button>
            <button onClick={onClose} className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm transition-all">
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Sub-component: Testimonial Modal ────────────────────
function TestimonialModal({ testimonial, onClose, onSave }) {
  const [form, setForm] = useState(
    testimonial || { name: '', position: '', company: '', rating: 5, content: '', avatar: '', isActive: true }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!form.name || !form.position || !form.company || !form.content) {
      setError('Name, Position, Company, and Content are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave(form);
      onClose();
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60 transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-[#131c30] border border-white/10 rounded-3xl p-8 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-xl font-bold">{testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <FiX size={20} />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className={labelClass}>Client Name *</label>
              <input className={inputClass} value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Nishanth" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Position *</label>
                <input className={inputClass} value={form.position || ''} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="e.g. Founder" />
              </div>
              <div>
                <label className={labelClass}>Company *</label>
                <input className={inputClass} value={form.company || ''} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. Dropzii" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Rating (1-5)</label>
                <select className={inputClass} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Avatar Image URL (Optional)</label>
                <input className={inputClass} value={form.avatar || ''} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="e.g. /images/avatar.png" />
              </div>
            </div>

            <div>
              <label className={labelClass}>Content *</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={4}
                value={form.content || ''}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write the testimonial content..."
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, isActive: !form.isActive })}
                className={`relative w-12 h-6 rounded-full transition-colors ${form.isActive ? 'bg-emerald-500' : 'bg-slate-600'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.isActive ? 'left-7' : 'left-1'}`} />
              </button>
              <span className="text-slate-300 text-sm font-medium">
                {form.isActive ? 'Active (visible on website)' : 'Inactive (hidden from website)'}
              </span>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-2">
              <FiAlertTriangle size={14} /> {error}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? <><FiRefreshCw className="animate-spin" size={14} /> Saving...</> : <><FiCheck size={16} /> {testimonial ? 'Update Testimonial' : 'Create Testimonial'}</>}
            </button>
            <button onClick={onClose} className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm transition-all">
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Sub-component: Application Modal ────────────────────
function ApplicationModal({ application, onClose, onUpdateStatus }) {
  const backendBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
  const resumeLink = application.resumeUrl?.startsWith('http')
    ? application.resumeUrl
    : `${backendBaseUrl}${application.resumeUrl}`;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-[#131c30] border border-white/10 rounded-3xl p-8 w-full max-w-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-white text-xl font-bold">{application.name}</h3>
              <p className="text-slate-400 text-sm mt-0.5">
                Applied for <span className="text-blue-400 font-semibold">{application.career?.title || 'Position'}</span>
              </p>
              <p className="text-slate-500 text-xs mt-1">{formatDate(application.createdAt)}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <FiX size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Details</p>
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center gap-2 text-xs">
                  <FiMail className="text-blue-400 shrink-0" size={13} />
                  <a href={`mailto:${application.email}`} className="text-blue-400 hover:underline truncate">{application.email}</a>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <FiPhone className="text-slate-400 shrink-0" size={13} />
                  <span className="text-slate-200 truncate">{application.phone}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Application Status</p>
              <select
                value={application.status}
                onChange={(e) => onUpdateStatus(application.id, e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="PENDING" className="bg-[#131c30]">Pending</option>
                <option value="REVIEWING" className="bg-[#131c30]">Reviewing</option>
                <option value="ACCEPTED" className="bg-[#131c30]">Accepted</option>
                <option value="REJECTED" className="bg-[#131c30]">Rejected</option>
              </select>
            </div>
          </div>

          {application.coverNote && (
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Cover Note</p>
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{application.coverNote}</p>
            </div>
          )}

          <div className="flex gap-3">
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <FiDownload size={15} /> View Resume / CV
            </a>
            <button onClick={onClose} className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm transition-all">
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Sub-component: Internship Modal ──────────────────────
function InternshipModal({
  internship,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(
    internship || { title: '', department: '', duration: '', description: '', requirements: [], isActive: true }
  );
  const [reqInput, setReqInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const addReq = () => {
    if (reqInput.trim()) {
      setForm((f) => ({ ...f, requirements: [...(f.requirements || []), reqInput.trim()] }));
      setReqInput('');
    }
  };

  const removeReq = (idx) => {
    setForm((f) => ({ ...f, requirements: (f.requirements || []).filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    if (!form.title || !form.department || !form.duration || !form.description) {
      setError('Title, Department, Duration, and Description are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave(form);
      onClose();
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60 transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-[#131c30] border border-white/10 rounded-3xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-xl font-bold">{internship ? 'Edit Internship Role' : 'Add New Internship Role'}</h3>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <FiX size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className={labelClass}>Internship Title *</label>
              <div className="relative">
                <FiType className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input className={`${inputClass} pl-10`} value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Front-End Web Development Intern" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Department *</label>
              <input className={inputClass} value={form.department || ''} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="e.g. Engineering" />
            </div>
            <div>
              <label className={labelClass}>Duration *</label>
              <div className="relative">
                <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input className={`${inputClass} pl-10`} value={form.duration || ''} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 3 Months / 6 Months" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={4}
                value={form.description || ''}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the internship scope, tools to learn, and responsibilities..."
              />
            </div>

            {/* Requirements */}
            <div className="sm:col-span-2">
              <label className={labelClass}>
                <FiList className="inline mr-1" size={13} /> Requirements / Skills
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  className={`${inputClass} flex-1`}
                  value={reqInput}
                  onChange={(e) => setReqInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addReq())}
                  placeholder="Add a skill/requirement and press Enter..."
                />
                <button onClick={addReq} className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shrink-0">
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(form.requirements || []).map((req, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/15 border border-blue-500/20 text-blue-300 text-xs font-medium">
                    {req}
                    <button onClick={() => removeReq(i)} className="text-blue-400 hover:text-white transition-colors ml-0.5">
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Active toggle */}
            <div className="sm:col-span-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, isActive: !form.isActive })}
                className={`relative w-12 h-6 rounded-full transition-colors ${form.isActive ? 'bg-emerald-500' : 'bg-slate-600'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.isActive ? 'left-7' : 'left-1'}`} />
              </button>
              <span className="text-slate-300 text-sm font-medium">
                {form.isActive ? 'Active (visible on website)' : 'Inactive (hidden from website)'}
              </span>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-2">
              <FiAlertTriangle size={14} /> {error}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? <><FiRefreshCw className="animate-spin" size={14} /> Saving...</> : <><FiCheck size={16} /> {internship ? 'Update Role' : 'Create Role'}</>}
            </button>
            <button onClick={onClose} className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm transition-all">
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Sub-component: Internship Application Modal ──────────
function InternshipApplicationModal({ application, onClose, onUpdateStatus }) {
  const backendBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
  const resumeLink = application.resumeUrl?.startsWith('http')
    ? application.resumeUrl
    : `${backendBaseUrl}${application.resumeUrl}`;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-[#131c30] border border-white/10 rounded-3xl p-8 w-full max-w-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-white text-xl font-bold">{application.name}</h3>
              <p className="text-slate-400 text-sm mt-0.5">
                Applied for <span className="text-blue-400 font-semibold">{application.role?.title || 'Internship Role'}</span>
              </p>
              <p className="text-slate-500 text-xs mt-1">{formatDate(application.createdAt)}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <FiX size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Details</p>
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center gap-2 text-xs">
                  <FiMail className="text-blue-400 shrink-0" size={13} />
                  <a href={`mailto:${application.email}`} className="text-blue-400 hover:underline truncate">{application.email}</a>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <FiPhone className="text-slate-400 shrink-0" size={13} />
                  <span className="text-slate-200 truncate">{application.phone}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Application Status</p>
              <select
                value={application.status}
                onChange={(e) => onUpdateStatus(application.id, e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="PENDING" className="bg-[#131c30]">Pending</option>
                <option value="REVIEWING" className="bg-[#131c30]">Reviewing</option>
                <option value="ACCEPTED" className="bg-[#131c30]">Accepted</option>
                <option value="REJECTED" className="bg-[#131c30]">Rejected</option>
              </select>
            </div>
          </div>

          {application.coverNote && (
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Cover Note</p>
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{application.coverNote}</p>
            </div>
          )}

          <div className="flex gap-3">
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <FiDownload size={15} /> View Resume / CV
            </a>
            <button onClick={onClose} className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm transition-all">
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Dashboard Component ─────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState('leads');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── Leads State
  const [contacts, setContacts] = useState([]);
  const [contactsTotal, setContactsTotal] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [search, setSearch] = useState('');
  const [contactsLoading, setContactsLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // ── Careers State
  const [careers, setCareers] = useState([]);
  const [careersLoading, setCareersLoading] = useState(false);
  const [careerModal, setCareerModal] = useState(undefined);
  // undefined = closed, null = new, Career = edit

  // ── Applications State
  const [applications, setApplications] = useState([]);
  const [applicationsTotal, setApplicationsTotal] = useState(0);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('');

  // ── Internships State
  const [internships, setInternships] = useState([]);
  const [internshipsLoading, setInternshipsLoading] = useState(false);
  const [internshipModal, setInternshipModal] = useState(undefined);

  // ── Internship Applications State
  const [internshipApplications, setInternshipApplications] = useState([]);
  const [internshipApplicationsTotal, setInternshipApplicationsTotal] = useState(0);
  const [internshipApplicationsLoading, setInternshipApplicationsLoading] = useState(false);
  const [selectedInternshipApplication, setSelectedInternshipApplication] = useState(null);
  const [internshipAppSearch, setInternshipAppSearch] = useState('');
  const [internshipAppStatusFilter, setInternshipAppStatusFilter] = useState('');

  // ── Load Testimonials
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [testimonialModal, setTestimonialModal] = useState(undefined);

  // ── Auth
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('praxire_user') || '{}'); } catch { return {}; }
  })();

  // ── Derived FAQ vs Contact Leads
  const generalContacts = contacts.filter((c) => c.type !== 'faq');
  const faqContacts = contacts.filter((c) => c.type === 'faq');
  const generalUnreadCount = contacts.filter((c) => c.type !== 'faq' && !c.isRead).length;
  const faqUnreadCount = contacts.filter((c) => c.type === 'faq' && !c.isRead).length;

  const logout = () => {
    localStorage.removeItem('praxire_token');
    localStorage.removeItem('praxire_user');
    navigate('/founders-room/login');
  };

  // ── Load Contacts
  const loadContacts = useCallback(async (q = '') => {
    setContactsLoading(true);
    try {
      const res = await contactsAPI.getAll({ search: q || undefined, limit: 50 });
      const list = res.data.contacts;
      setContacts(list);
      setContactsTotal(res.data.pagination.total);
      setUnreadCount(list.filter((c) => !c.isRead).length);
    } catch {
      // silently fail
    } finally {
      setContactsLoading(false);
    }
  }, []);

  // ── Load Careers
  const loadCareers = useCallback(async () => {
    setCareersLoading(true);
    try {
      const res = await careersAPI.getAdminAll();
      setCareers(res.data.careers || []);
    } catch {
      // silently fail
    } finally {
      setCareersLoading(false);
    }
  }, []);

  // ── Load Applications
  const loadApplications = useCallback(async (statusFilter = '') => {
    setApplicationsLoading(true);
    try {
      const res = await careersAPI.getApplications({ status: statusFilter || undefined, limit: 100 });
      setApplications(res.data.applications || []);
      setApplicationsTotal(res.data.pagination.total || res.data.applications.length);
    } catch {
      // silently fail
    } finally {
      setApplicationsLoading(false);
    }
  }, []);

  // ── Load Internships
  const loadInternships = useCallback(async () => {
    setInternshipsLoading(true);
    try {
      const res = await internshipsAPI.getAdminAll();
      setInternships(res.data.roles || []);
    } catch {
      // silently fail
    } finally {
      setInternshipsLoading(false);
    }
  }, []);

  // ── Load Internship Applications
  const loadInternshipApplications = useCallback(async (statusFilter = '') => {
    setInternshipApplicationsLoading(true);
    try {
      const res = await internshipsAPI.getApplications({ status: statusFilter || undefined, limit: 100 });
      setInternshipApplications(res.data.applications || []);
      setInternshipApplicationsTotal(res.data.pagination?.total || res.data.applications.length);
    } catch {
      // silently fail
    } finally {
      setInternshipApplicationsLoading(false);
    }
  }, []);

  // ── Load Testimonials
  const loadTestimonials = useCallback(async () => {
    setTestimonialsLoading(true);
    try {
      const res = await testimonialsAPI.getAll();
      setTestimonials(res.data.testimonials || []);
    } catch {
      // silently fail
    } finally {
      setTestimonialsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContacts();
    loadCareers();
    loadApplications();
    loadInternships();
    loadInternshipApplications();
    loadTestimonials();
  }, [loadContacts, loadCareers, loadApplications, loadInternships, loadInternshipApplications, loadTestimonials]);

  // ── Debounce search
  useEffect(() => {
    const t = setTimeout(() => loadContacts(search), 350);
    return () => clearTimeout(t);
  }, [search, loadContacts]);

  // ── Mark as read
  const markRead = async (id) => {
    try {
      await contactsAPI.markRead(id);
      setContacts((prev) => prev.map((c) => c.id === id ? { ...c, isRead: true } : c));
      setUnreadCount((n) => Math.max(0, n - 1));
    } catch {/**/}
  };

  // ── Delete contact
  const deleteContact = async (id) => {
    try {
      await contactsAPI.delete(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setContactsTotal((n) => n - 1);
      setDeleteConfirmId(null);
    } catch {/**/}
  };

  // ── View contact
  const viewContact = async (contact) => {
    setSelectedContact(contact);
    if (!contact.isRead) await markRead(contact.id);
  };

  // ── Export CSV
  const exportCSV = () => {
    const link = document.createElement('a');
    link.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/contacts/export/csv`;
    link.setAttribute('download', 'praxire-leads.csv');
    const token = localStorage.getItem('praxire_token');
    fetch(link.href, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'praxire-leads.csv';
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  // ── Toggle career active
  const toggleCareer = async (career) => {
    try {
      await careersAPI.update(career.id, { isActive: !career.isActive });
      setCareers((prev) => prev.map((c) => c.id === career.id ? { ...c, isActive: !c.isActive } : c));
    } catch {/**/}
  };

  // ── Save career (create or update)
  const saveCareer = async (data) => {
    if (careerModal?.id) {
      const res = await careersAPI.update(careerModal.id, data);
      setCareers((prev) => prev.map((c) => c.id === careerModal.id ? res.data.career : c));
    } else {
      const res = await careersAPI.create(data);
      setCareers((prev) => [res.data.career, ...prev]);
    }
  };

  // ── Delete career
  const deleteCareer = async (id) => {
    try {
      await careersAPI.delete(id);
      setCareers((prev) => prev.filter((c) => c.id !== id));
    } catch {/**/}
  };

  // ── Update Application Status
  const updateApplicationStatus = async (appId, newStatus) => {
    try {
      await careersAPI.updateStatus(appId, newStatus);
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );
      setSelectedApplication((prev) => prev && prev.id === appId ? { ...prev, status: newStatus } : prev);
    } catch {/**/}
  };

  // ── Toggle testimonial active
  const toggleTestimonial = async (testimonial) => {
    try {
      const updated = await testimonialsAPI.update(testimonial.id, { isActive: !testimonial.isActive });
      setTestimonials((prev) => prev.map((t) => t.id === testimonial.id ? updated.data.testimonial : t));
    } catch {/**/}
  };

  // ── Save testimonial (create or update)
  const saveTestimonial = async (data) => {
    if (testimonialModal?.id) {
      const { id, createdAt, updatedAt, isActive, ...updateData } = data;
      updateData.isActive = data.isActive;
      const res = await testimonialsAPI.update(testimonialModal.id, updateData);
      setTestimonials((prev) => prev.map((t) => t.id === testimonialModal.id ? res.data.testimonial : t));
    } else {
      const res = await testimonialsAPI.create(data);
      setTestimonials((prev) => [res.data.testimonial, ...prev]);
    }
  };

  // ── Delete testimonial
  const deleteTestimonial = async (id) => {
    try {
      await testimonialsAPI.delete(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch {/**/}
  };

  // ── Toggle internship active
  const toggleInternship = async (internship) => {
    try {
      await internshipsAPI.update(internship.id, { isActive: !internship.isActive });
      setInternships((prev) => prev.map((item) => item.id === internship.id ? { ...item, isActive: !item.isActive } : item));
    } catch {/**/}
  };

  // ── Save internship (create or update)
  const saveInternship = async (data) => {
    if (internshipModal?.id) {
      const res = await internshipsAPI.update(internshipModal.id, data);
      setInternships((prev) => prev.map((item) => item.id === internshipModal.id ? res.data.role : item));
    } else {
      const res = await internshipsAPI.create(data);
      setInternships((prev) => [res.data.role, ...prev]);
    }
  };

  // ── Delete internship
  const deleteInternship = async (id) => {
    try {
      await internshipsAPI.delete(id);
      setInternships((prev) => prev.filter((item) => item.id !== id));
    } catch {/**/}
  };

  // ── Update Internship Application Status
  const updateInternshipApplicationStatus = async (appId, newStatus) => {
    try {
      await internshipsAPI.updateStatus(appId, newStatus);
      setInternshipApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );
      setSelectedInternshipApplication((prev) => prev && prev.id === appId ? { ...prev, status: newStatus } : prev);
    } catch {/**/}
  };

  // ── Client-side search for applications
  const filteredApplications = applications.filter((app) => {
    const searchLower = appSearch.toLowerCase();
    const nameMatch = app.name?.toLowerCase().includes(searchLower);
    const emailMatch = app.email?.toLowerCase().includes(searchLower);
    const jobMatch = app.career?.title?.toLowerCase().includes(searchLower);
    return nameMatch || emailMatch || jobMatch;
  });

  // ── Client-side search for internship applications
  const filteredInternshipApplications = internshipApplications.filter((app) => {
    const searchLower = internshipAppSearch.toLowerCase();
    const nameMatch = app.name?.toLowerCase().includes(searchLower);
    const emailMatch = app.email?.toLowerCase().includes(searchLower);
    const jobMatch = app.role?.title?.toLowerCase().includes(searchLower);
    return nameMatch || emailMatch || jobMatch;
  });

  // ─────────────────────────── Render ──────────────────────────────
  return (
    <div className="flex h-screen bg-[#0B1120] overflow-hidden font-sans">

      {/* ── Sidebar ─────────────────────────────────────── */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 72 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="bg-[#0d1527] border-r border-white/5 flex flex-col shrink-0 overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <FiShieldIcon />
          </div>
          {sidebarOpen && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white font-extrabold text-base tracking-tight">
              Praxire Admin
            </motion.span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <FiMenu size={16} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {[
            { id: 'leads', label: 'Leads / Inbox', icon: FiInbox, badge: generalUnreadCount },
            { id: 'faq_inquiries', label: 'FAQ Inquiries', icon: FiMessageSquare, badge: faqUnreadCount },
            { id: 'careers', label: 'Career Openings', icon: FiBriefcase, badge: 0 },
            { id: 'applications', label: 'Job Applications', icon: FiFileText, badge: applications.filter(a => a.status === 'PENDING').length },
            { id: 'internships', label: 'Internship Roles', icon: FiBriefcase, badge: 0 },
            { id: 'internship_applications', label: 'Internship Apps', icon: FiFileText, badge: internshipApplications.filter(a => a.status === 'PENDING').length },
            { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare, badge: 0 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm font-semibold group ${
                view === item.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 text-left whitespace-nowrap">
                  {item.label}
                </motion.span>
              )}
              {sidebarOpen && item.badge > 0 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-auto px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0"
                >
                  {item.badge}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-white/5 p-3 space-y-1">
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-3 py-2">
              <p className="text-white text-sm font-bold truncate">{user.name || 'Admin'}</p>
              <p className="text-slate-500 text-xs truncate">{user.role}</p>
            </motion.div>
          )}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all text-sm font-semibold"
          >
            <FiLogOut size={18} className="shrink-0" />
            {sidebarOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Sign Out</motion.span>}
          </button>
        </div>
      </motion.aside>

      {/* ── Main Content ─────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        {/* ══ LEADS VIEW ══════════════════════════════════ */}
        {view === 'leads' && (
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <span>Admin</span><FiChevronRight size={12} /><span className="text-white">Leads</span>
                </div>
                <h1 className="text-white text-2xl font-extrabold">Contact Leads</h1>
                <p className="text-slate-400 text-sm mt-0.5">{generalContacts.length} total submissions</p>
              </div>
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm border border-white/10 transition-all shrink-0"
              >
                <FiDownload size={16} /> Export CSV
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard label="Total Leads" value={generalContacts.length} icon={FiInbox} accent="bg-blue-500/15 text-blue-400" />
              <StatCard label="Unread" value={generalUnreadCount} icon={FiMail} accent="bg-amber-500/15 text-amber-400" />
              <StatCard label="Read" value={generalContacts.length - generalUnreadCount} icon={FiCheckCircle} accent="bg-emerald-500/15 text-emerald-400" />
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#131c30] border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/40 text-sm transition-all"
              />
              {contactsLoading && (
                <FiRefreshCw className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 animate-spin" size={15} />
              )}
            </div>

            {/* Table */}
            <div className="bg-[#131c30] border border-white/5 rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-white/5">
                <div className="col-span-3">Name / Company</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Phone</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Rows */}
              {generalContacts.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  {contactsLoading ? 'Loading leads...' : 'No leads found.'}
                </div>
              ) : (
                generalContacts.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`grid grid-cols-12 px-5 py-4 items-center border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group ${!c.isRead ? 'border-l-2 border-l-blue-500' : ''}`}
                  >
                    <div className="col-span-3">
                      <div className="flex items-center gap-2.5">
                        {!c.isRead && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />}
                        <div>
                          <p className="text-white text-sm font-semibold truncate">{c.name}</p>
                          {c.companyName && <p className="text-slate-500 text-xs truncate">{c.companyName}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <a href={`mailto:${c.email}`} className="text-blue-400 hover:underline text-sm truncate block">{c.email}</a>
                    </div>
                    <div className="col-span-2 text-slate-400 text-sm">{c.phone || '—'}</div>
                    <div className="col-span-2 text-slate-500 text-xs">{formatDate(c.createdAt)}</div>
                    <div className="col-span-2 flex items-center justify-end gap-1.5">
                      <button
                        title="View message"
                        onClick={() => viewContact(c)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 transition-all"
                      >
                        <FiEye size={14} />
                      </button>
                      {!c.isRead && (
                        <button
                          title="Mark as read"
                          onClick={() => markRead(c.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-emerald-600/20 text-slate-400 hover:text-emerald-400 transition-all"
                        >
                          <FiCheck size={14} />
                        </button>
                      )}
                      {deleteConfirmId === c.id ? (
                        <>
                          <button
                            onClick={() => deleteContact(c.id)}
                            className="p-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-all"
                          >
                            <FiCheck size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 transition-all"
                          >
                            <FiX size={14} />
                          </button>
                        </>
                      ) : (
                        <button
                          title="Delete"
                          onClick={() => setDeleteConfirmId(c.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 transition-all"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ══ FAQ INQUIRIES VIEW ════════════════════════════ */}
        {view === 'faq_inquiries' && (
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <span>Admin</span><FiChevronRight size={12} /><span className="text-white">FAQ Inquiries</span>
                </div>
                <h1 className="text-white text-2xl font-extrabold">FAQ Inquiries</h1>
                <p className="text-slate-400 text-sm mt-0.5">{faqContacts.length} total questions</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard label="Total Inquiries" value={faqContacts.length} icon={FiMessageSquare} accent="bg-indigo-500/15 text-indigo-400" />
              <StatCard label="Unread" value={faqUnreadCount} icon={FiMail} accent="bg-amber-500/15 text-amber-400" />
              <StatCard label="Read" value={faqContacts.length - faqUnreadCount} icon={FiCheckCircle} accent="bg-emerald-500/15 text-emerald-400" />
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#131c30] border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/40 text-sm transition-all"
              />
              {contactsLoading && (
                <FiRefreshCw className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 animate-spin" size={15} />
              )}
            </div>

            {/* Table */}
            <div className="bg-[#131c30] border border-white/5 rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-white/5">
                <div className="col-span-3">Name / Company</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Phone</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Rows */}
              {faqContacts.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  {contactsLoading ? 'Loading inquiries...' : 'No FAQ inquiries found.'}
                </div>
              ) : (
                faqContacts.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`grid grid-cols-12 px-5 py-4 items-center border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group ${!c.isRead ? 'border-l-2 border-l-indigo-500' : ''}`}
                  >
                    <div className="col-span-3">
                      <div className="flex items-center gap-2.5">
                        {!c.isRead && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />}
                        <div>
                          <p className="text-white text-sm font-semibold truncate">{c.name}</p>
                          {c.companyName && <p className="text-slate-500 text-xs truncate">{c.companyName}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <a href={`mailto:${c.email}`} className="text-blue-400 hover:underline text-sm truncate block">{c.email}</a>
                    </div>
                    <div className="col-span-2 text-slate-400 text-sm">{c.phone || '—'}</div>
                    <div className="col-span-2 text-slate-500 text-xs">{formatDate(c.createdAt)}</div>
                    <div className="col-span-2 flex items-center justify-end gap-1.5">
                      <button
                        title="View message"
                        onClick={() => viewContact(c)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-indigo-600/20 text-slate-400 hover:text-indigo-400 transition-all"
                      >
                        <FiEye size={14} />
                      </button>
                      {!c.isRead && (
                        <button
                          title="Mark as read"
                          onClick={() => markRead(c.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-emerald-600/20 text-slate-400 hover:text-emerald-400 transition-all"
                        >
                          <FiCheck size={14} />
                        </button>
                      )}
                      {deleteConfirmId === c.id ? (
                        <>
                          <button
                            onClick={() => deleteContact(c.id)}
                            className="p-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-all"
                          >
                            <FiCheck size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 transition-all"
                          >
                            <FiX size={14} />
                          </button>
                        </>
                      ) : (
                        <button
                          title="Delete"
                          onClick={() => setDeleteConfirmId(c.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 transition-all"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ══ CAREERS VIEW ════════════════════════════════ */}
        {view === 'careers' && (
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <span>Admin</span><FiChevronRight size={12} /><span className="text-white">Career Openings</span>
                </div>
                <h1 className="text-white text-2xl font-extrabold">Career Openings</h1>
                <p className="text-slate-400 text-sm mt-0.5">{careers.filter(c => c.isActive).length} active positions</p>
              </div>
              <button
                onClick={() => setCareerModal(null)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/20 shrink-0"
              >
                <FiPlus size={16} /> Add Opening
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard label="Total Positions" value={careers.length} icon={FiBriefcase} accent="bg-blue-500/15 text-blue-400" />
              <StatCard label="Active" value={careers.filter(c => c.isActive).length} icon={FiCheckCircle} accent="bg-emerald-500/15 text-emerald-400" />
              <StatCard label="Inactive" value={careers.filter(c => !c.isActive).length} icon={FiToggleLeft} accent="bg-slate-500/15 text-slate-400" />
            </div>

            {/* Cards Grid */}
            {careersLoading ? (
              <div className="text-center py-16 text-slate-500">Loading positions...</div>
            ) : careers.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                No positions found. Click "Add Opening" to create one.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {careers.map((career) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-[#131c30] border rounded-2xl p-6 transition-all ${career.isActive ? 'border-white/5' : 'border-white/[0.03] opacity-60'}`}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${career.isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-500/15 text-slate-400'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${career.isActive ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                            {career.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/15">{career.type}</span>
                        </div>
                        <h3 className="text-white font-bold text-lg leading-tight truncate">{career.title}</h3>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { icon: FiHome, val: career.department },
                        { icon: FiMapPin, val: career.location },
                        { icon: FiUser, val: career.experience },
                        { icon: FiClock, val: formatDate(career.createdAt).split(',')[0] },
                      ].map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                          <m.icon size={12} className="shrink-0 text-slate-500" />
                          <span className="truncate">{m.val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">{career.description}</p>

                    {/* Requirements */}
                    {career.requirements.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {career.requirements.slice(0, 4).map((req, i) => (
                          <span key={i} className="px-2 py-1 rounded-lg bg-white/5 text-slate-400 text-xs border border-white/5">{req}</span>
                        ))}
                        {career.requirements.length > 4 && (
                          <span className="px-2 py-1 rounded-lg bg-white/5 text-slate-500 text-xs">+{career.requirements.length - 4} more</span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                      <button
                        onClick={() => setCareerModal(career)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 text-xs font-semibold transition-all border border-white/5"
                      >
                        <FiEdit2 size={13} /> Edit
                      </button>
                      <button
                        onClick={() => toggleCareer(career)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border ${
                          career.isActive
                            ? 'bg-white/5 hover:bg-amber-600/20 text-slate-400 hover:text-amber-400 border-white/5'
                            : 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border-emerald-500/15'
                        }`}
                      >
                        {career.isActive ? <><FiToggleLeft size={13} /> Deactivate</> : <><FiToggleRight size={13} /> Activate</>}
                      </button>
                      <button
                        onClick={() => deleteCareer(career.id)}
                        className="ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-all border border-white/5"
                      >
                        <FiTrash2 size={13} /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ APPLICATIONS VIEW ═══════════════════════════ */}
        {view === 'applications' && (
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <span>Admin</span><FiChevronRight size={12} /><span className="text-white">Applications</span>
                </div>
                <h1 className="text-white text-2xl font-extrabold">Job Applications</h1>
                <p className="text-slate-400 text-sm mt-0.5">{applicationsTotal} total candidates</p>
              </div>
              <div className="flex gap-2">
                <select
                  value={appStatusFilter}
                  onChange={(e) => {
                    setAppStatusFilter(e.target.value);
                    loadApplications(e.target.value);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#131c30] border border-white/5 text-slate-300 font-semibold text-sm focus:outline-none focus:border-blue-500/40 transition-all cursor-pointer"
                >
                  <option value="" className="bg-[#131c30]">All Statuses</option>
                  <option value="PENDING" className="bg-[#131c30]">Pending</option>
                  <option value="REVIEWING" className="bg-[#131c30]">Reviewing</option>
                  <option value="ACCEPTED" className="bg-[#131c30]">Accepted</option>
                  <option value="REJECTED" className="bg-[#131c30]">Rejected</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Applicants" value={applications.length} icon={FiUser} accent="bg-blue-500/15 text-blue-400" />
              <StatCard label="Pending" value={applications.filter(a => a.status === 'PENDING').length} icon={FiClock} accent="bg-amber-500/15 text-amber-400" />
              <StatCard label="Reviewing" value={applications.filter(a => a.status === 'REVIEWING').length} icon={FiSearch} accent="bg-indigo-500/15 text-indigo-400" />
              <StatCard label="Accepted" value={applications.filter(a => a.status === 'ACCEPTED').length} icon={FiCheckCircle} accent="bg-emerald-500/15 text-emerald-400" />
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by candidate name, email, or job title..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#131c30] border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/40 text-sm transition-all"
              />
              {applicationsLoading && (
                <FiRefreshCw className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 animate-spin" size={15} />
              )}
            </div>

            {/* Table */}
            <div className="bg-[#131c30] border border-white/5 rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-white/5">
                <div className="col-span-3">Candidate / Position</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Phone</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Rows */}
              {filteredApplications.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  {applicationsLoading ? 'Loading candidates...' : 'No applications found.'}
                </div>
              ) : (
                filteredApplications.map((app) => {
                  const backendBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
                  const resumeLink = `${backendBaseUrl}${app.resumeUrl}`;
                  
                  // Status pill colors
                  const statusColors = {
                    PENDING: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
                    REVIEWING: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
                    ACCEPTED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
                    REJECTED: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
                  };

                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`grid grid-cols-12 px-5 py-4 items-center border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group`}
                    >
                      <div className="col-span-3">
                        <div className="flex items-center gap-2.5">
                          <div>
                            <p className="text-white text-sm font-semibold truncate">{app.name}</p>
                            <p className="text-slate-500 text-xs truncate font-medium">{app.career?.title || 'Position'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <a href={`mailto:${app.email}`} className="text-blue-400 hover:underline text-sm truncate block">{app.email}</a>
                      </div>
                      <div className="col-span-2 text-slate-400 text-sm">{app.phone || '—'}</div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${statusColors[app.status] || 'bg-slate-500/15 text-slate-400'}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-1.5">
                        <button
                          title="View Application Details"
                          onClick={() => setSelectedApplication(app)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 transition-all border border-white/5"
                        >
                          <FiEye size={14} />
                        </button>
                        <a
                          title="Download Resume"
                          href={resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white/5 hover:bg-emerald-600/20 text-slate-400 hover:text-emerald-400 transition-all border border-white/5"
                        >
                          <FiFileText size={14} />
                        </a>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ══ TESTIMONIALS VIEW ════════════════════════════ */}
        {view === 'testimonials' && (
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <span>Admin</span><FiChevronRight size={12} /><span className="text-white">Testimonials</span>
                </div>
                <h1 className="text-white text-2xl font-extrabold">Client Testimonials</h1>
                <p className="text-slate-400 text-sm mt-0.5">{testimonials.filter(t => t.isActive).length} active testimonials</p>
              </div>
              <button
                onClick={() => setTestimonialModal(null)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/20 shrink-0"
              >
                <FiPlus size={16} /> Add Testimonial
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard label="Total Testimonials" value={testimonials.length} icon={FiMessageSquare} accent="bg-blue-500/15 text-blue-400" />
              <StatCard label="Active" value={testimonials.filter(t => t.isActive).length} icon={FiCheckCircle} accent="bg-emerald-500/15 text-emerald-400" />
              <StatCard label="Inactive" value={testimonials.filter(t => !t.isActive).length} icon={FiToggleLeft} accent="bg-slate-500/15 text-slate-400" />
            </div>

            {/* List / Cards */}
            {testimonialsLoading ? (
              <div className="text-center py-16 text-slate-500">Loading testimonials...</div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                No testimonials found. Click "Add Testimonial" to create one.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-[#131c30] border rounded-2xl p-6 transition-all ${t.isActive ? 'border-white/5' : 'border-white/[0.03] opacity-60'}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-sm shrink-0 border border-white/10 overflow-hidden">
                          {t.avatar ? (
                            <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                          ) : (
                            t.name.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-base leading-tight">{t.name}</h3>
                          <p className="text-slate-400 text-xs mt-0.5">{t.position}, {t.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${t.isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-500/15 text-slate-400'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${t.isActive ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                          {t.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-amber-400 text-xs font-bold">{'★'.repeat(t.rating)}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>

                    <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                      <button
                        onClick={() => setTestimonialModal(t)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 text-xs font-semibold transition-all border border-white/5"
                      >
                        <FiEdit2 size={13} /> Edit
                      </button>
                      <button
                        onClick={() => toggleTestimonial(t)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border border-white/5 ${
                          t.isActive
                            ? 'bg-white/5 hover:bg-amber-600/20 text-slate-400 hover:text-amber-400'
                            : 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border-emerald-500/15'
                        }`}
                      >
                        {t.isActive ? <><FiToggleLeft size={13} /> Deactivate</> : <><FiToggleRight size={13} /> Activate</>}
                      </button>
                      <button
                        onClick={() => deleteTestimonial(t.id)}
                        className="ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-all border border-white/5"
                      >
                        <FiTrash2 size={13} /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ INTERNSHIP ROLES VIEW ═══════════════════════ */}
        {view === 'internships' && (
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <span>Admin</span><FiChevronRight size={12} /><span className="text-white">Internship Roles</span>
                </div>
                <h1 className="text-white text-2xl font-extrabold">Internship Roles</h1>
                <p className="text-slate-400 text-sm mt-0.5">{internships.filter(i => i.isActive).length} active roles</p>
              </div>
              <button
                onClick={() => setInternshipModal(null)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/20 shrink-0"
              >
                <FiPlus size={16} /> Add Internship Role
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard label="Total Roles" value={internships.length} icon={FiBriefcase} accent="bg-blue-500/15 text-blue-400" />
              <StatCard label="Active" value={internships.filter(i => i.isActive).length} icon={FiCheckCircle} accent="bg-emerald-500/15 text-emerald-400" />
              <StatCard label="Inactive" value={internships.filter(i => !i.isActive).length} icon={FiToggleLeft} accent="bg-slate-500/15 text-slate-400" />
            </div>

            {/* Cards Grid */}
            {internshipsLoading ? (
              <div className="text-center py-16 text-slate-500">Loading roles...</div>
            ) : internships.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                No internship roles found. Click "Add Internship Role" to create one.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {internships.map((internship) => (
                  <motion.div
                    key={internship.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-[#131c30] border rounded-2xl p-6 transition-all ${internship.isActive ? 'border-white/5' : 'border-white/[0.03] opacity-60'}`}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${internship.isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-500/15 text-slate-400'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${internship.isActive ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                            {internship.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-lg leading-tight truncate">{internship.title}</h3>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { icon: FiHome, val: internship.department },
                        { icon: FiClock, val: internship.duration },
                        { icon: FiClock, val: formatDate(internship.createdAt).split(',')[0] },
                      ].map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                          <m.icon size={12} className="shrink-0 text-slate-500" />
                          <span className="truncate">{m.val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">{internship.description}</p>

                    {/* Requirements */}
                    {internship.requirements && internship.requirements.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {internship.requirements.slice(0, 4).map((req, i) => (
                          <span key={i} className="px-2 py-1 rounded-lg bg-white/5 text-slate-400 text-xs border border-white/5">{req}</span>
                        ))}
                        {internship.requirements.length > 4 && (
                          <span className="px-2 py-1 rounded-lg bg-white/5 text-slate-500 text-xs">+{internship.requirements.length - 4} more</span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                      <button
                        onClick={() => setInternshipModal(internship)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 text-xs font-semibold transition-all border border-white/5"
                      >
                        <FiEdit2 size={13} /> Edit
                      </button>
                      <button
                        onClick={() => toggleInternship(internship)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border ${
                          internship.isActive
                            ? 'bg-white/5 hover:bg-amber-600/20 text-slate-400 hover:text-amber-400 border-white/5'
                            : 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border-emerald-500/15'
                        }`}
                      >
                        {internship.isActive ? <><FiToggleLeft size={13} /> Deactivate</> : <><FiToggleRight size={13} /> Activate</>}
                      </button>
                      <button
                        onClick={() => deleteInternship(internship.id)}
                        className="ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-all border border-white/5"
                      >
                        <FiTrash2 size={13} /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ INTERNSHIP APPLICATIONS VIEW ════════════════ */}
        {view === 'internship_applications' && (
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <span>Admin</span><FiChevronRight size={12} /><span className="text-white">Internship Applications</span>
                </div>
                <h1 className="text-white text-2xl font-extrabold">Internship Applications</h1>
                <p className="text-slate-400 text-sm mt-0.5">{internshipApplicationsTotal} total candidates</p>
              </div>
              <div className="flex gap-2">
                <select
                  value={internshipAppStatusFilter}
                  onChange={(e) => {
                    setInternshipAppStatusFilter(e.target.value);
                    loadInternshipApplications(e.target.value);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#131c30] border border-white/5 text-slate-300 font-semibold text-sm focus:outline-none focus:border-blue-500/40 transition-all cursor-pointer"
                >
                  <option value="" className="bg-[#131c30]">All Statuses</option>
                  <option value="PENDING" className="bg-[#131c30]">Pending</option>
                  <option value="REVIEWING" className="bg-[#131c30]">Reviewing</option>
                  <option value="ACCEPTED" className="bg-[#131c30]">Accepted</option>
                  <option value="REJECTED" className="bg-[#131c30]">Rejected</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Applied" value={internshipApplications.length} icon={FiFileText} accent="bg-blue-500/15 text-blue-400" />
              <StatCard label="Pending" value={internshipApplications.filter(a => a.status === 'PENDING').length} icon={FiClock} accent="bg-amber-500/15 text-amber-400" />
              <StatCard label="Accepted" value={internshipApplications.filter(a => a.status === 'ACCEPTED').length} icon={FiCheckCircle} accent="bg-emerald-500/15 text-emerald-400" />
              <StatCard label="Rejected" value={internshipApplications.filter(a => a.status === 'REJECTED').length} icon={FiX} accent="bg-rose-500/15 text-rose-400" />
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by candidate name, email, or role..."
                value={internshipAppSearch}
                onChange={(e) => setInternshipAppSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#131c30] border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/40 text-sm transition-all"
              />
              {internshipApplicationsLoading && (
                <FiRefreshCw className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 animate-spin" size={15} />
              )}
            </div>

            {/* Table */}
            <div className="bg-[#131c30] border border-white/5 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-white/5">
                <div className="col-span-3">Candidate</div>
                <div className="col-span-3">Role / Dept</div>
                <div className="col-span-2">Applied Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {filteredInternshipApplications.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  {internshipApplicationsLoading ? 'Loading applications...' : 'No applications found.'}
                </div>
              ) : (
                filteredInternshipApplications.map((app) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-12 px-5 py-4 items-center border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                  >
                    <div className="col-span-3 min-w-0 pr-2">
                      <p className="text-white text-sm font-semibold truncate">{app.name}</p>
                      <a href={`mailto:${app.email}`} className="text-slate-500 hover:text-blue-400 text-xs truncate block mt-0.5 transition-colors">{app.email}</a>
                    </div>
                    <div className="col-span-3 min-w-0 pr-2">
                      <p className="text-slate-200 text-sm truncate font-medium">{app.role?.title || 'Intern'}</p>
                      <p className="text-slate-500 text-xs truncate mt-0.5">{app.role?.department || 'Engineering'}</p>
                    </div>
                    <div className="col-span-2 text-slate-400 text-sm">{formatDate(app.createdAt).split(',')[0]}</div>
                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        app.status === 'PENDING' ? 'bg-amber-500/15 text-amber-400' :
                        app.status === 'REVIEWING' ? 'bg-blue-500/15 text-blue-400' :
                        app.status === 'ACCEPTED' ? 'bg-emerald-500/15 text-emerald-400' :
                        'bg-rose-500/15 text-rose-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          app.status === 'PENDING' ? 'bg-amber-400' :
                          app.status === 'REVIEWING' ? 'bg-blue-400' :
                          app.status === 'ACCEPTED' ? 'bg-emerald-400' :
                          'bg-rose-400'
                        }`} />
                        {app.status}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-1.5">
                      <button
                        title="View details & resume"
                        onClick={() => setSelectedInternshipApplication(app)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 transition-all border border-white/5"
                      >
                        <FiEye size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* ── Modals ───────────────────────────────────────── */}
      {selectedContact && (
        <ContactModal contact={selectedContact} onClose={() => setSelectedContact(null)} />
      )}
      {careerModal !== undefined && (
        <CareerModal
          career={careerModal}
          onClose={() => setCareerModal(undefined)}
          onSave={saveCareer}
        />
      )}
      {selectedApplication && (
        <ApplicationModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onUpdateStatus={updateApplicationStatus}
        />
      )}
      {testimonialModal !== undefined && (
        <TestimonialModal
          testimonial={testimonialModal}
          onClose={() => setTestimonialModal(undefined)}
          onSave={saveTestimonial}
        />
      )}
      {internshipModal !== undefined && (
        <InternshipModal
          internship={internshipModal}
          onClose={() => setInternshipModal(undefined)}
          onSave={saveInternship}
        />
      )}
      {selectedInternshipApplication && (
        <InternshipApplicationModal
          application={selectedInternshipApplication}
          onClose={() => setSelectedInternshipApplication(null)}
          onUpdateStatus={updateInternshipApplicationStatus}
        />
      )}
    </div>
  );
}

// Inline shield icon to avoid extra import
function FiShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
