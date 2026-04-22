import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

// TODO: Configure EmailJS credentials below
// 1. Create account at https://emailjs.com
// 2. Create a service, template, and get your public key
// 3. Replace the placeholder values below
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-2">
          Me <span className="text-[#e63946]">contacter</span>
        </h2>
        <div className="w-12 h-0.5 bg-[#e63946] mb-8" />

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <a
            href="mailto:caiolesnioski@gmail.com"
            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#e63946]/10 border border-[#e63946]/20 flex items-center justify-center">
              <Mail size={16} className="text-[#e63946]" />
            </div>
            <span className="text-sm">caiolesnioski@gmail.com</span>
          </a>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">
                Nom et prénom <span className="text-[#e63946]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Caio Lesnioski"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#e63946]/50 focus:ring-1 focus:ring-[#e63946]/30 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">
                Email <span className="text-[#e63946]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="email@exemple.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#e63946]/50 focus:ring-1 focus:ring-[#e63946]/30 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">
              Téléphone <span className="text-white/25">(optionnel)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+33 6 00 00 00 00"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#e63946]/50 focus:ring-1 focus:ring-[#e63946]/30 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">
              Message <span className="text-[#e63946]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Votre message..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#e63946]/50 focus:ring-1 focus:ring-[#e63946]/30 transition-colors resize-none"
            />
          </div>

          {/* Status messages */}
          {status === 'success' && (
            <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3">
              <CheckCircle size={16} />
              Message envoyé avec succès !
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              <AlertCircle size={16} />
              Une erreur est survenue. Réessayez ou envoyez un email directement.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="flex items-center gap-2 px-6 py-3 bg-[#e63946] hover:bg-[#d62f3c] text-white font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            {status === 'sending' ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
      </motion.div>
    </section>
  )
}
