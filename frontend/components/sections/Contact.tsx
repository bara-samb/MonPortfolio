"use client";

import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '@/components/Icons';
import { PERSONAL_INFO } from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation controls
    const newErrors = { name: '', email: '', subject: '', message: '' };
    let hasError = false;

    if (formData.name.trim().length < 2) {
      newErrors.name = t('error_name_length');
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t('error_email_invalid');
      hasError = true;
    }

    if (formData.subject.trim().length < 4) {
      newErrors.subject = t('error_subject_length');
      hasError = true;
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = t('error_message_length');
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send message to email via FormSubmit API endpoint
      const response = await fetch("https://formsubmit.co/ajax/maambaara56@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `Nouveau message de ${formData.name} : ${formData.subject}`,
          message: formData.message,
          _captcha: "false"
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({ name: '', email: '', subject: '', message: '' });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        alert("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      alert("Impossible d'envoyer le message. Veuillez vérifier votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative bg-grid-pattern">
      {/* Background glow flare */}
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full radial-glow-indigo z-0 opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {t('contact_title').split(' ').map((word, i) => i === 1 ? <span key={i} className="text-sky-400"> {word}</span> : word)}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6"></div>
          <p className="text-slate-400">
            {t('contact_subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Contact Info */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            
            <h3 className="text-xl font-bold text-white font-display">
              {t('contact_info_title')}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('contact_info_subtitle')}
            </p>

            <div className="space-y-4 pt-4">
              {/* Email Card */}
              <div className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{t('contact_info_email')}</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-200 hover:text-sky-400 text-sm font-medium transition-colors break-all">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{t('contact_info_location')}</p>
                  <p className="text-slate-200 text-sm font-medium">{PERSONAL_INFO.location}</p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <WhatsappIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{t('contact_info_phone')}</p>
                  <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-emerald-400 text-sm font-medium transition-colors">
                    +221 78 017 16 88
                  </a>
                </div>
              </div>
            </div>

            {/* Social Grid */}
              <div className="flex gap-4 pt-4">
                <a 
                  href={PERSONAL_INFO.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all font-medium text-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
                <a 
                  href={PERSONAL_INFO.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all font-medium text-sm"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  LinkedIn
                </a>
                <a 
                  href={PERSONAL_INFO.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all font-medium text-sm text-emerald-400"
                >
                  <WhatsappIcon className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

          </div>

          {/* Right Panel: Interactive Form */}
          <div className="lg:col-span-7 p-5 sm:p-8 rounded-2xl glass-panel border border-white/5 relative order-1 lg:order-2">
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">{t('form_sent')}</h4>
                <p className="text-slate-400 text-sm max-w-sm">
                  {t('form_sent_desc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="flex items-center gap-2 text-slate-300 pb-2 border-b border-white/5 mb-4">
                  <MessageSquare className="w-5 h-5 text-sky-400" />
                  <span className="font-bold font-display">{t('form_send_message')}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {t('form_name')}
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-colors text-sm ${
                        errors.name 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' 
                          : 'border-white/5 focus:border-sky-500 focus:ring-sky-500'
                      }`}
                      placeholder="Mame Bara Samb"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {t('form_email')}
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-colors text-sm ${
                        errors.email 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' 
                          : 'border-white/5 focus:border-sky-500 focus:ring-sky-500'
                      }`}
                      placeholder="maambaara56@gmail.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {t('form_subject')}
                  </label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-colors text-sm ${
                      errors.subject 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' 
                        : 'border-white/5 focus:border-sky-500 focus:ring-sky-500'
                    }`}
                    placeholder={t('form_subject_placeholder')}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1 font-medium">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {t('form_message')}
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-colors text-sm resize-none ${
                      errors.message 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' 
                        : 'border-white/5 focus:border-sky-500 focus:ring-sky-500'
                    }`}
                    placeholder={t('form_message_placeholder')}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold hover:shadow-lg hover:shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>{isSubmitting ? t('form_sending') : t('form_submit')}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
