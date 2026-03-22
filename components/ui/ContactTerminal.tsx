'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_DATA } from '@/lib/data'

const BOOT_SEQUENCE = [
  '> system.initialize()',
  '  [OK] Neural interface connected',
  '> contact.load()',
  '  [OK] Communication channel open',
  '> security.verify()',
  '  [OK] Secure tunnel established',
  '> Ready to connect...',
]

export default function ContactTerminal() {
  const [bootLines, setBootLines] = useState<string[]>([])
  const [formVisible, setFormVisible] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let index = 0
    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const showNextLine = () => {
      if (cancelled) return
      if (index < BOOT_SEQUENCE.length) {
        // Capture value NOW before incrementing, so the updater always gets the right string
        const line = BOOT_SEQUENCE[index]
        index++
        setBootLines((prev) => [...prev, line])
        const t = setTimeout(showNextLine, index === BOOT_SEQUENCE.length ? 200 : 300)
        timeouts.push(t)
      } else {
        const t = setTimeout(() => { if (!cancelled) setFormVisible(true) }, 400)
        timeouts.push(t)
      }
    }

    const t = setTimeout(showNextLine, 300)
    timeouts.push(t)

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [bootLines, formVisible])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 2000)
  }

  return (
    <div
      className="terminal w-full max-w-xl mx-auto"
      style={{
        background: 'rgba(5, 5, 5, 0.97)',
        border: '1px solid #00f0ff',
        borderRadius: '4px',
        boxShadow:
          '0 0 20px rgba(0,240,255,0.3), 0 0 60px rgba(0,240,255,0.1), inset 0 0 20px rgba(0,240,255,0.02)',
      }}
    >
      {/* Terminal header bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: 'rgba(0,240,255,0.2)' }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        <span
          className="ml-4 text-xs tracking-widest"
          style={{ color: '#00f0ff', fontFamily: 'Share Tech Mono, monospace' }}
        >
          CONTACT_TERMINAL_v2.0
        </span>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="p-6 overflow-y-auto"
        style={{ maxHeight: '60vh', minHeight: '200px' }}
      >
        {/* Boot sequence */}
        {bootLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs mb-1"
            style={{
              fontFamily: 'Share Tech Mono, monospace',
              color: line?.startsWith('>') ? '#00f0ff' : '#4a8a6a',
            }}
          >
            {line}
          </motion.div>
        ))}

        {/* Contact form */}
        <AnimatePresence>
          {formVisible && !sent && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="mt-4 space-y-4"
            >
              {/* Name */}
              <div>
                <label
                  className="text-xs block mb-1"
                  style={{ color: '#8a2be2', fontFamily: 'Share Tech Mono, monospace' }}
                >
                  $ input.name:
                </label>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#00f0ff' }}>›</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your Name"
                    className="flex-1 bg-transparent text-xs outline-none border-b"
                    style={{
                      fontFamily: 'Share Tech Mono, monospace',
                      color: '#e0e0e0',
                      borderColor: 'rgba(0,240,255,0.3)',
                      paddingBottom: '4px',
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="text-xs block mb-1"
                  style={{ color: '#8a2be2', fontFamily: 'Share Tech Mono, monospace' }}
                >
                  $ input.email:
                </label>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#00f0ff' }}>›</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-xs outline-none border-b"
                    style={{
                      fontFamily: 'Share Tech Mono, monospace',
                      color: '#e0e0e0',
                      borderColor: 'rgba(0,240,255,0.3)',
                      paddingBottom: '4px',
                    }}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  className="text-xs block mb-1"
                  style={{ color: '#8a2be2', fontFamily: 'Share Tech Mono, monospace' }}
                >
                  $ input.message:
                </label>
                <div className="flex gap-2">
                  <span style={{ color: '#00f0ff' }}>›</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Your message..."
                    rows={3}
                    className="flex-1 bg-transparent text-xs outline-none border-b resize-none"
                    style={{
                      fontFamily: 'Share Tech Mono, monospace',
                      color: '#e0e0e0',
                      borderColor: 'rgba(0,240,255,0.3)',
                      paddingBottom: '4px',
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={sending}
                className="w-full py-3 text-xs tracking-widest"
                style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  background: sending
                    ? 'rgba(138, 43, 226, 0.1)'
                    : 'rgba(0, 240, 255, 0.05)',
                  border: `1px solid ${sending ? '#8a2be2' : '#00f0ff'}`,
                  color: sending ? '#8a2be2' : '#00f0ff',
                  boxShadow: `0 0 10px ${sending ? 'rgba(138,43,226,0.3)' : 'rgba(0,240,255,0.2)'}`,
                  cursor: sending ? 'not-allowed' : 'pointer',
                }}
              >
                {sending ? '> TRANSMITTING...' : '> contact.send()'}
              </motion.button>
            </motion.form>
          )}

          {sent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 text-center"
              style={{
                border: '1px solid #00f0ff',
                background: 'rgba(0,240,255,0.05)',
              }}
            >
              <div
                className="text-sm mb-2"
                style={{ color: '#00f0ff', fontFamily: 'Share Tech Mono, monospace' }}
              >
                [SUCCESS] Message transmitted.
              </div>
              <div
                className="text-xs"
                style={{ color: '#4a8a6a', fontFamily: 'Share Tech Mono, monospace' }}
              >
                Yogesh will respond shortly.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social links as terminal commands */}
        {formVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 pt-4 border-t space-y-2"
            style={{ borderColor: 'rgba(0,240,255,0.1)' }}
          >
            <div
              className="text-xs"
              style={{ color: '#4a4a6a', fontFamily: 'Share Tech Mono, monospace' }}
            >
              // Direct channels:
            </div>
            <a
              href={`mailto:${PORTFOLIO_DATA.contact.email}`}
              className="flex items-center gap-2 text-xs hover:text-cyan-400 transition-colors"
              style={{ color: '#8a2be2', fontFamily: 'Share Tech Mono, monospace' }}
            >
              <span style={{ color: '#00f0ff' }}>$</span> email.open('{PORTFOLIO_DATA.contact.email}')
            </a>
            <a
              href={`https://${PORTFOLIO_DATA.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs hover:text-purple-400 transition-colors"
              style={{ color: '#8a2be2', fontFamily: 'Share Tech Mono, monospace' }}
            >
              <span style={{ color: '#00f0ff' }}>$</span> linkedin.connect()
            </a>
            <a
              href={`tel:${PORTFOLIO_DATA.contact.phone}`}
              className="flex items-center gap-2 text-xs hover:text-pink-400 transition-colors"
              style={{ color: '#8a2be2', fontFamily: 'Share Tech Mono, monospace' }}
            >
              <span style={{ color: '#00f0ff' }}>$</span> phone.call('{PORTFOLIO_DATA.contact.phone}')
            </a>
          </motion.div>
        )}
      </div>
    </div>
  )
}
