'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { PORTFOLIO_DATA } from '@/lib/data'
import ContactTerminal from '@/components/ui/ContactTerminal'

const MechAvatar3D = dynamic(() => import('@/components/3d/MechAvatar3D'), {
  ssr: false,
  loading: () => null,
})

/* ── Palette ───────────────────────────────────────────────── */
const GOLD     = '#c8a96e'
const GOLD_DIM = '#7a6642'
const STEEL    = '#6b8fa8'
const CREAM    = '#ede8dc'
const MUTED    = '#8a8070'
const DIM      = '#4a4030'

/* ── Animation variants ────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ── Shared primitives ─────────────────────────────────────── */

function Label({ children, color = GOLD_DIM }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{
      fontFamily: 'DM Mono, monospace', fontSize: '10px',
      color, letterSpacing: '0.24em', marginBottom: '8px',
    }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'Playfair Display, serif',
      fontSize: 'clamp(28px, 4vw, 48px)',
      fontWeight: 700, color: CREAM, lineHeight: 1.1, margin: 0,
    }}>
      {children}
    </h2>
  )
}

function Divider({ color = GOLD }: { color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '16px 0 40px' }}>
      <div style={{ width: '36px', height: '1px', background: color, opacity: 0.6 }} />
      <div style={{ width: '5px',  height: '5px', borderRadius: '50%', background: color, opacity: 0.7 }} />
      <div style={{ width: '14px', height: '1px', background: color, opacity: 0.3 }} />
    </div>
  )
}

/** Dark warm glass card */
function Card({ children, accent = GOLD, style }: {
  children: React.ReactNode
  accent?: string
  style?: React.CSSProperties
}) {
  return (
    <div style={{
      position: 'relative',
      background: 'rgba(18, 14, 9, 0.88)',
      border: `1px solid ${accent}22`,
      borderRadius: '2px',
      padding: '26px',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      boxShadow: `0 6px 40px rgba(0,0,0,0.45)`,
      overflow: 'hidden',
      ...style,
    }}>
      {/* Top accent rule */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
      }} />
      {children}
    </div>
  )
}

/* ── Section wrapper ───────────────────────────────────────── */
function Section({ id, children, minHeight = '100vh' }: {
  id: string; children: React.ReactNode; minHeight?: string
}) {
  return (
    <section id={id} style={{
      minHeight,
      display: 'flex', alignItems: 'center',
      padding: 'clamp(80px,10vh,120px) clamp(20px,8vw,120px)',
      /* Solid dark layer so 3D canvas can't bleed through */
      background: 'rgba(10, 9, 6, 0.82)',
      backdropFilter: 'blur(2px)',
      WebkitBackdropFilter: 'blur(2px)',
    }}>
      {children}
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════════════════ */

export function HeroSection() {
  return (
    <Section id="hero" minHeight="100vh">
      <div style={{
        display: 'flex', alignItems: 'center', width: '100%',
        gap: 'clamp(24px, 5vw, 64px)', flexWrap: 'wrap',
      }}>

        {/* Left: text */}
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ flex: '1 1 360px', minWidth: 0 }}>

          <motion.p variants={fadeUp} style={{
            fontFamily: 'DM Mono, monospace', fontSize: '10px',
            color: GOLD_DIM, letterSpacing: '0.28em', marginBottom: '22px',
          }}>
            Software Engineer · .NET | Azure · Pune, India
          </motion.p>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(52px, 9vw, 100px)',
            fontWeight: 900, lineHeight: 0.95, margin: 0, color: CREAM,
          }}>
            Yogesh
          </motion.h1>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(52px, 9vw, 100px)',
            fontWeight: 900, lineHeight: 0.95, margin: '0 0 22px',
            color: GOLD,
          }}>
            Kadav
          </motion.h1>

          {/* Ornamental rule */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{ width: '64px', height: '1px', background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: GOLD, opacity: 0.6 }} />
          </motion.div>

          <motion.p variants={fadeUp} style={{
            fontFamily: 'Lato, sans-serif', fontSize: '15px',
            color: MUTED, lineHeight: 1.8, maxWidth: '500px', marginBottom: '8px',
          }}>
            I build the backend systems enterprise products depend on —
            REST APIs, event-driven cloud pipelines, and automation that
            replaces manual work. 4 years shipping production .NET software.
          </motion.p>

          {/* Tech pills */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '22px 0 38px' }}>
            {['C#', '.NET Core', 'ASP.NET', 'Azure', 'Docker', 'REST APIs'].map(t => (
              <span key={t} style={{
                fontFamily: 'DM Mono, monospace', fontSize: '10px',
                padding: '5px 14px',
                border: `1px solid ${GOLD}40`,
                color: GOLD_DIM, letterSpacing: '0.08em',
                background: 'rgba(14, 11, 7, 0.90)',
              }}>{t}</span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#contact" style={{
              padding: '13px 32px',
              background: GOLD, color: '#0a0906',
              fontFamily: 'Lato, sans-serif', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.14em', textDecoration: 'none', display: 'inline-block',
              boxShadow: `0 0 24px rgba(200,169,110,0.30)`,
            }}>
              GET IN TOUCH
            </a>
            <a href="#projects" style={{
              padding: '13px 32px',
              border: `1px solid ${GOLD}45`, color: GOLD,
              fontFamily: 'Lato, sans-serif', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.14em', textDecoration: 'none', display: 'inline-block',
              background: 'rgba(200,169,110,0.04)',
            }}>
              VIEW WORK
            </a>
          </motion.div>

        </motion.div>

        {/* Right: split-face 3D avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.90 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: 'easeOut', delay: 0.35 }}
          style={{ flex: '0 0 clamp(280px, 40vw, 540px)', height: 'clamp(380px, 52vw, 660px)' }}
        >
          <MechAvatar3D />
        </motion.div>

      </div>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════════════
   2. ABOUT
══════════════════════════════════════════════════════════════ */

export function AboutSection() {
  return (
    <Section id="about">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} style={{ width: '100%' }}>

        <motion.div variants={fadeUp}>
          <Label>01</Label>
          <SectionTitle>About <span style={{ color: GOLD }}>Me</span></SectionTitle>
          <Divider />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '20px' }}>

          <motion.div variants={fadeUp}>
            <Card accent={GOLD}>
              <Label>Summary</Label>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: MUTED, lineHeight: 1.85, margin: 0 }}>
                {PORTFOLIO_DATA.summary}
              </p>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card accent={STEEL} style={{ height: '100%' }}>
              <Label color={STEEL}>Education</Label>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: 600, color: CREAM, margin: '0 0 4px' }}>
                {PORTFOLIO_DATA.education.degree}
              </p>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', color: STEEL, margin: '0 0 2px' }}>
                {PORTFOLIO_DATA.education.institution}
              </p>
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: DIM, margin: '0 0 22px' }}>
                {PORTFOLIO_DATA.education.location}
              </p>

              <div style={{ borderTop: `1px solid ${STEEL}22`, paddingTop: '18px' }}>
                <Label color={STEEL}>Contact</Label>
                {[PORTFOLIO_DATA.contact.email, PORTFOLIO_DATA.contact.phone, PORTFOLIO_DATA.contact.location].map(v => (
                  <p key={v} style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', color: MUTED, margin: '0 0 5px' }}>{v}</p>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card accent={GOLD}>
              <Label>Quick Stats</Label>
              {[
                { value: '4+',  label: 'Years Experience' },
                { value: '3',   label: 'Companies' },
                { value: '15+', label: 'Technologies' },
                { value: '6+',  label: 'Live Projects' },
              ].map(s => (
                <div key={s.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderBottom: `1px solid rgba(200,169,110,0.08)`,
                }}>
                  <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', color: MUTED }}>{s.label}</span>
                  <span style={{
                    fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 700,
                    color: GOLD,
                  }}>{s.value}</span>
                </div>
              ))}
            </Card>
          </motion.div>

        </div>

        {/* Philosophy / Personal Edge */}
        <motion.div variants={fadeUp} style={{ marginTop: '20px' }}>
          <Card accent={GOLD_DIM} style={{ borderLeft: `2px solid ${GOLD}55` }}>
            <Label>Philosophy</Label>
            <p style={{
              fontFamily: 'Playfair Display, serif', fontSize: '15px',
              color: CREAM, lineHeight: 1.9, margin: 0, fontStyle: 'italic',
            }}>
              &ldquo;{PORTFOLIO_DATA.philosophy}&rdquo;
            </p>
          </Card>
        </motion.div>

      </motion.div>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════════════
   3. PROJECTS
══════════════════════════════════════════════════════════════ */

export function ProjectsSection() {
  const accent = (i: number) => [GOLD, STEEL, '#8a7a5a', GOLD, STEEL, '#8a7a5a'][i % 6]

  return (
    <Section id="projects" minHeight="auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} style={{ width: '100%' }}>

        <motion.div variants={fadeUp}>
          <Label>02</Label>
          <SectionTitle>Selected <span style={{ color: GOLD }}>Projects</span></SectionTitle>
          <Divider />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '20px' }}>
          {PORTFOLIO_DATA.projects.map((project, idx) => {
            const ac = accent(idx)
            return (
              <motion.div
                key={project.id}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card accent={ac} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontFamily: 'DM Mono, monospace', fontSize: '9px',
                    padding: '3px 10px', border: `1px solid ${ac}40`,
                    color: ac, letterSpacing: '0.16em',
                    alignSelf: 'flex-start', marginBottom: '14px',
                    background: `${ac}0c`,
                  }}>{project.category}</span>

                  <h3 style={{
                    fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 600,
                    color: CREAM, margin: '0 0 10px', lineHeight: 1.3,
                  }}>{project.title}</h3>

                  <p style={{
                    fontFamily: 'Lato, sans-serif', fontSize: '13px', color: MUTED,
                    lineHeight: 1.75, flex: 1, margin: '0 0 16px',
                  }}>{project.description}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.tech.map(t => (
                      <span key={t} style={{
                        fontFamily: 'DM Mono, monospace', fontSize: '9px', padding: '3px 9px',
                        border: `1px solid ${ac}35`, color: ac,
                        background: `${ac}08`,
                      }}>{t}</span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

      </motion.div>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════════════
   4. SKILLS
══════════════════════════════════════════════════════════════ */

export function SkillsSection() {
  const cats = [
    { label: 'Languages',      skills: PORTFOLIO_DATA.skills.languages,   color: GOLD  },
    { label: 'Frameworks',     skills: PORTFOLIO_DATA.skills.frameworks,   color: STEEL },
    { label: 'Cloud & DevOps', skills: PORTFOLIO_DATA.skills.cloud,        color: GOLD  },
    { label: 'Databases',      skills: PORTFOLIO_DATA.skills.databases,    color: STEEL },
    { label: 'Microsoft 365',  skills: PORTFOLIO_DATA.skills.microsoft365, color: GOLD  },
    { label: 'Architecture',   skills: PORTFOLIO_DATA.skills.architecture, color: STEEL },
  ]

  return (
    <Section id="skills">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} style={{ width: '100%' }}>

        <motion.div variants={fadeUp}>
          <Label>03</Label>
          <SectionTitle>Skills &amp; <span style={{ color: GOLD }}>Expertise</span></SectionTitle>
          <Divider />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {cats.map((cat, ci) => (
            <motion.div key={cat.label} variants={fadeUp}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <span style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '10px',
                  color: cat.color, letterSpacing: '0.18em', whiteSpace: 'nowrap',
                }}>{cat.label}</span>
                <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${cat.color}30, transparent)` }} />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: ci * 0.04 + si * 0.03, duration: 0.3 }}
                    viewport={{ once: true }}
                    style={{
                      fontFamily: 'Lato, sans-serif', fontSize: '12px', fontWeight: 400,
                      padding: '7px 16px',
                      border: `1px solid ${cat.color}40`,
                      color: CREAM, background: 'rgba(14, 11, 7, 0.92)',
                      cursor: 'default', display: 'inline-block',
                      letterSpacing: '0.04em',
                    }}
                  >{skill}</motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════════════
   5. EXPERIENCE
══════════════════════════════════════════════════════════════ */

export function ExperienceSection() {
  return (
    <Section id="experience" minHeight="auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} style={{ width: '100%' }}>

        <motion.div variants={fadeUp}>
          <Label>04</Label>
          <SectionTitle>Work <span style={{ color: GOLD }}>Experience</span></SectionTitle>
          <Divider />
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: '28px' }}>
          {/* Vertical timeline line */}
          <div style={{
            position: 'absolute', left: 0, top: '8px', bottom: '24px', width: '1px',
            background: `linear-gradient(to bottom, ${GOLD}80, ${STEEL}50, transparent)`,
          }} />

          {PORTFOLIO_DATA.experience.map((exp, i) => (
            <motion.div key={exp.id} variants={fadeUp} style={{ marginBottom: '28px', position: 'relative' }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: '-33px', top: '22px',
                width: '9px', height: '9px', borderRadius: '50%',
                background: i === 0 ? GOLD : STEEL,
                boxShadow: `0 0 8px ${i === 0 ? GOLD : STEEL}88`,
              }} />

              <Card accent={i === 0 ? GOLD : STEEL}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px',
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 600,
                      color: CREAM, margin: '0 0 4px',
                    }}>{exp.role}</h3>
                    <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', color: i === 0 ? GOLD : STEEL, margin: 0 }}>
                      {exp.company}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: DIM }}>{exp.period}</span>
                    {exp.current && (
                      <span style={{
                        fontFamily: 'DM Mono, monospace', fontSize: '9px', padding: '2px 9px',
                        border: `1px solid ${GOLD}50`, color: GOLD,
                        background: `rgba(200,169,110,0.07)`, letterSpacing: '0.12em',
                      }}>CURRENT</span>
                    )}
                  </div>
                </div>

                <div style={{ borderTop: `1px solid rgba(200,169,110,0.1)`, paddingTop: '14px', marginBottom: '14px' }}>
                  {exp.bullets.map((b, bi) => (
                    <div key={bi} style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                      <span style={{ color: GOLD_DIM, fontSize: '14px', flexShrink: 0, lineHeight: 1.65 }}>–</span>
                      <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', color: MUTED, lineHeight: 1.7 }}>{b}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {exp.tech.map(t => (
                    <span key={t} style={{
                      fontFamily: 'DM Mono, monospace', fontSize: '9px', padding: '3px 9px',
                      border: `1px solid rgba(200,169,110,0.22)`, color: GOLD_DIM,
                      background: 'rgba(200,169,110,0.04)', letterSpacing: '0.06em',
                    }}>{t}</span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════════════
   6. CONTACT
══════════════════════════════════════════════════════════════ */

export function ContactSection() {
  return (
    <Section id="contact">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} style={{ width: '100%' }}>

        <motion.div variants={fadeUp}>
          <Label>05</Label>
          <SectionTitle>Let&apos;s <span style={{ color: GOLD }}>Connect</span></SectionTitle>
          <Divider />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '40px' }}>

          <motion.div variants={fadeUp}>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '15px', color: MUTED, lineHeight: 1.85, marginBottom: '34px' }}>
              Open to full-time roles, freelance projects, and interesting collaborations.
              Let&apos;s build something meaningful together.
            </p>

            {[
              { label: 'Email',    value: PORTFOLIO_DATA.contact.email,  href: `mailto:${PORTFOLIO_DATA.contact.email}` },
              { label: 'Phone',    value: PORTFOLIO_DATA.contact.phone,  href: `tel:${PORTFOLIO_DATA.contact.phone}` },
              { label: 'LinkedIn', value: 'yogesh-kadav-471427215',      href: `https://${PORTFOLIO_DATA.contact.linkedin}` },
            ].map(link => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ x: 5, transition: { duration: 0.15 } }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '18px',
                  padding: '14px 18px', marginBottom: '10px', textDecoration: 'none',
                  border: `1px solid rgba(200,169,110,0.14)`,
                  background: 'rgba(200,169,110,0.03)',
                }}
              >
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: GOLD_DIM, letterSpacing: '0.18em', minWidth: '72px' }}>
                  {link.label}
                </span>
                <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', color: MUTED }}>
                  {link.value}
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <ContactTerminal />
          </motion.div>

        </div>

        {/* Footer */}
        <motion.div variants={fadeUp} style={{ marginTop: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '1px', height: '36px', background: `linear-gradient(to bottom, rgba(200,169,110,0.4), transparent)` }} />
          <p style={{
            fontFamily: 'DM Mono, monospace', fontSize: '10px', color: DIM,
            letterSpacing: '0.2em', textAlign: 'center',
          }}>
            Built with Next.js · React Three Fiber · Framer Motion
          </p>
        </motion.div>

      </motion.div>
    </Section>
  )
}
