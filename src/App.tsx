import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, ArrowRight, Mail, Phone, MapPin, Globe, Camera,
  GraduationCap, Award, Code, Server, Wrench, Folder,
  ExternalLink, Star, Send, ChevronRight, Eye, Heart,
  ArrowUp, Zap, Gamepad2, BookOpen, Rocket, Circle, Sun, Moon
} from 'lucide-react'

const fadeUp = { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } }
const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 } }
const stagger = { animate: { transition: { staggerChildren: 0.08 } } }
const slideLeft = { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } }
const slideRight = { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } }

type ViewKey = 'home' | 'about' | 'education' | 'skills' | 'projects' | 'contact'

const navItems: { key: ViewKey; label: string }[] = [
  { key: 'home', label: 'Inicio' },
  { key: 'about', label: 'Sobre Mí' },
  { key: 'education', label: 'Educación' },
  { key: 'skills', label: 'Habilidades' },
  { key: 'projects', label: 'Proyectos' },
  { key: 'contact', label: 'Contacto' },
]

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    color: ['var(--cyan)', 'var(--purple)', 'var(--blue)', 'var(--pink)'][i % 4],
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            opacity: 0.2,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [0.1, 0.3, 0.15, 0.25, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(124, 45, 212, 0.4)' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50,
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--gradient-main)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(124, 45, 212, 0.3)',
          }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [currentView, setCurrentView] = useState<ViewKey>('home')
  const [typedText, setTypedText] = useState('')
  const [titleIndex, setTitleIndex] = useState(0)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio-theme')
    return (saved === 'light' || saved === 'dark') ? saved : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  const titles = ['Desarrollador Web Full Stack', 'Ingeniero en Sistemas', 'Creador de Experiencias Digitales']

  useEffect(() => {
    if (showSplash) return
    const title = titles[titleIndex]
    let charIndex = 0
    setTypedText('')
    const typeInterval = setInterval(() => {
      if (charIndex <= title.length) {
        setTypedText(title.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setTitleIndex((prev) => (prev + 1) % titles.length)
        }, 2500)
      }
    }, 60)
    return () => clearInterval(typeInterval)
  }, [titleIndex, showSplash])

  const navigateTo = useCallback((view: ViewKey) => setCurrentView(view), [])

  return (
    <div className="app">
      <FloatingParticles />
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            className="splash-screen"
            onClick={() => setShowSplash(false)}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="splash-orbs">
              <div className="splash-orb splash-orb-1" />
              <div className="splash-orb splash-orb-2" />
              <div className="splash-orb splash-orb-3" />
            </div>
            <motion.div className="splash-content" {...fadeIn} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                style={{
                  width: 120, height: 120, borderRadius: '50%',
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, var(--cyan), var(--purple))'
                    : 'linear-gradient(135deg, var(--purple), var(--blue))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 2rem',
                  boxShadow: theme === 'dark'
                    ? '0 0 60px rgba(6, 214, 160, 0.3)'
                    : '0 0 60px rgba(124, 45, 212, 0.25)',
                }}
              >
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: theme === 'dark' ? '#000' : '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '3rem', fontWeight: 800, color: 'var(--purple)',
                }}>
                  AV
                </div>
              </motion.div>
              <motion.h1 className="splash-name" {...fadeUp} transition={{ duration: 0.8, delay: 0.3 }}>
                <span className="splash-hola">Hola, soy</span>
                <span className="splash-gradient-text">Adolfo Javier</span>
                <br />
                <span className="splash-gradient-text">Vera Matijasevic</span>
              </motion.h1>
              <motion.p className="splash-subtitle" {...fadeUp} transition={{ duration: 0.6, delay: 0.6 }}>
                Desarrollador Web Full Stack
              </motion.p>
              <motion.p className="splash-langs" {...fadeUp} transition={{ duration: 0.6, delay: 0.75 }}>
                Sucre, Bolivia
              </motion.p>
              <motion.button
                className="splash-btn"
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(6, 214, 160, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={18} />
                Empezar
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
            <motion.p className="splash-click-hint" {...fadeIn} transition={{ delay: 1.8, duration: 1 }}>
              haz click para empezar
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            className="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.nav
              className="navbar"
              initial={{ y: -80 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
            >
              <div className="navbar-inner">
                <motion.div
                  className="navbar-brand"
                  whileHover={{ scale: 1.05 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigateTo('home')}
                >
                  AV
                </motion.div>
                <div className="navbar-links">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      className={`nav-link ${currentView === item.key ? 'active' : ''}`}
                      onClick={() => navigateTo(item.key)}
                    >
                      {item.label}
                      {currentView === item.key && (
                        <motion.div className="nav-indicator" layoutId="navIndicator" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                      )}
                    </button>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    style={{
                      marginLeft: '0.75rem', width: 38, height: 38, borderRadius: '50%',
                      background: 'var(--bg-card)', border: '1px solid var(--glass-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: theme === 'dark' ? 'var(--yellow)' : 'var(--purple)',
                      cursor: 'pointer', transition: 'all 0.3s ease',
                    }}
                  >
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </motion.nav>

            <div className="portfolio-content">
              <AnimatePresence mode="wait">
                {/* ==================== HOME ==================== */}
                {currentView === 'home' && (
                  <motion.div key="home" className="view-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <section className="view home-view">
                      <div className="home-background">
                        <div className="bg-orb orb-1" />
                        <div className="bg-orb orb-2" />
                        <div className="bg-orb orb-3" />
                      </div>
                      <div className="home-content">
                        <div className="hero-layout">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.2 }}
                            style={{
                              width: 150, height: 150, borderRadius: '50%', flexShrink: 0,
                              background: theme === 'dark'
                                ? 'linear-gradient(135deg, var(--cyan), var(--purple))'
                                : 'linear-gradient(135deg, var(--purple), var(--blue))',
                              padding: 3,
                              boxShadow: theme === 'dark'
                                ? '0 0 50px rgba(6, 214, 160, 0.25)'
                                : '0 0 50px rgba(124, 45, 212, 0.2)',
                            }}
                          >
                            <div style={{
                              width: '100%', height: '100%', borderRadius: '50%',
                              background: theme === 'dark' ? 'var(--bg)' : '#ffffff',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '3.5rem', fontWeight: 800, color: 'var(--purple)',
                            }}>
                              AV
                            </div>
                          </motion.div>
                          <motion.div className="home-main" {...stagger} initial="initial" animate="animate" style={{ flex: 1, minWidth: 300 }}>
                            <motion.div className="greeting" variants={fadeUp} transition={{ duration: 0.5 }}>
                              <Sparkles size={16} className="sparkle" />
                              <span>Hola, bienvenido a mi portafolio</span>
                            </motion.div>
                            <motion.h1 className="name" variants={fadeUp} transition={{ duration: 0.6 }}>
                              Soy <span className="name-highlight">Adolfo Javier</span>
                              <br />Vera Matijasevic
                            </motion.h1>
                            <motion.div className="titles" variants={fadeUp} transition={{ duration: 0.5 }} style={{ minHeight: '1.5em' }}>
                              <span className="title-item" style={{ color: theme === 'dark' ? 'var(--cyan)' : 'var(--purple)' }}>{typedText}</span>
                              <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                style={{ color: theme === 'dark' ? 'var(--cyan)' : 'var(--purple)', fontWeight: 300 }}
                              >|</motion.span>
                            </motion.div>
                            <motion.p className="description" variants={fadeUp} transition={{ duration: 0.5 }}>
                              Desarrollador web con experiencia en la creación de aplicaciones modernas y responsivas.
                              Busco oportunidades para aplicar mis habilidades técnicas y creativas en proyectos desafiantes
                              que me permitan crecer profesionalmente mientras contribuyo al éxito del equipo.
                            </motion.p>
                            <motion.div className="home-actions" variants={fadeUp} transition={{ duration: 0.5 }}>
                              <motion.button
                                className="btn btn-primary"
                                onClick={() => navigateTo('projects')}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 214, 160, 0.3)' }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Folder size={18} />
                                Ver Proyectos
                              </motion.button>
                              <motion.button
                                className="btn btn-secondary"
                                onClick={() => navigateTo('contact')}
                                whileHover={{ scale: 1.05, borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Send size={18} />
                                Contacto
                              </motion.button>
                            </motion.div>
                            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                              {[
                                { icon: <Globe size={18} />, href: 'https://github.com/Fitooohhh', color: 'var(--cyan)', label: 'GitHub' },
                                { icon: <Camera size={18} />, href: 'https://instagram.com/Fitooooo_h0908', color: 'var(--pink)', label: 'Instagram' },
                                { icon: <Mail size={18} />, href: 'mailto:avm0098@gmail.com', color: 'var(--purple)', label: 'Email' },
                              ].map((social, i) => (
                                <motion.a
                                  key={i}
                                  href={social.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  whileHover={{ scale: 1.15, y: -3, boxShadow: `0 0 20px ${social.color}44` }}
                                  whileTap={{ scale: 0.9 }}
                                  style={{
                                    width: 42, height: 42, borderRadius: '50%',
                                    border: `1px solid var(--glass-border)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: social.color, transition: 'all 0.2s ease',
                                  }}
                                >
                                  {social.icon}
                                </motion.a>
                              ))}
                            </motion.div>
                          </motion.div>
                        </div>
                        <motion.div className="home-stats" {...stagger} initial="initial" animate="animate">
                          {[
                            { icon: <Code size={22} />, value: '6+', label: 'Proyectos', color: 'var(--cyan)' },
                            { icon: <Award size={22} />, value: '5', label: 'Certificaciones', color: 'var(--purple)' },
                            { icon: <GraduationCap size={22} />, value: '6to', label: 'Semestre', color: 'var(--blue)' },
                            { icon: <Star size={22} />, value: '3', label: 'Idiomas', color: 'var(--pink)' },
                          ].map((stat, i) => (
                            <motion.div
                              key={i}
                              className="stat-card"
                              variants={fadeUp}
                              transition={{ duration: 0.4 }}
                              whileHover={{ y: -6, boxShadow: `0 0 30px ${stat.color}22`, borderColor: stat.color }}
                            >
                              <span className="stat-icon" style={{ color: stat.color }}>{stat.icon}</span>
                              <span className="stat-value">{stat.value}</span>
                              <span className="stat-label">{stat.label}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </section>
                  </motion.div>
                )}

                {/* ==================== ABOUT ==================== */}
                {currentView === 'about' && (
                  <motion.div key="about" className="view-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <section className="view">
                      <motion.div className="section-header" {...fadeUp} transition={{ duration: 0.6 }}>
                        <h2>Sobre Mí</h2>
                        <p>Información personal y objetivo profesional</p>
                      </motion.div>
                      <div className="about-grid">
                        <motion.div className="about-card" {...slideLeft} transition={{ duration: 0.6, delay: 0.1 }} whileHover={{ borderColor: 'var(--glass-border-hover)' }}>
                          <h3>Información Personal</h3>
                          <div className="info-list">
                            {[
                              { icon: <Star size={18} />, label: 'Nombre', value: 'Adolfo Javier Vera Matijasevic', color: 'var(--cyan)' },
                              { icon: <Mail size={18} />, label: 'Email', value: 'avm0098@gmail.com', color: 'var(--purple)', href: 'mailto:avm0098@gmail.com' },
                              { icon: <Phone size={18} />, label: 'Teléfono', value: '+591 70333911', color: 'var(--blue)', href: 'tel:+59170333911' },
                              { icon: <MapPin size={18} />, label: 'Dirección', value: 'Emilio Mendizabal #309, Sucre', color: 'var(--pink)' },
                              { icon: <Globe size={18} />, label: 'GitHub', value: 'Fitruscus', color: 'var(--cyan)', href: 'https://github.com/Fitooohhh' },
                              { icon: <Camera size={18} />, label: 'Instagram', value: '@Fitooooo_h0908', color: 'var(--pink)', href: 'https://instagram.com/Fitooooo_h0908' },
                            ].map((item, i) => (
                              <motion.div
                                key={i}
                                className="info-item"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                whileHover={{ background: 'rgba(255,255,255,0.04)', x: 4 }}
                              >
                                <div className="info-icon" style={{ '--item-color': item.color } as React.CSSProperties}>{item.icon}</div>
                                <div className="info-content">
                                  <span className="info-label">{item.label}</span>
                                  {item.href ? (
                                    <a href={item.href} target="_blank" rel="noreferrer" className="info-value" style={{ color: item.color }}>{item.value}</a>
                                  ) : (
                                    <span className="info-value">{item.value}</span>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <motion.div className="about-card" {...slideRight} transition={{ duration: 0.6, delay: 0.2 }} whileHover={{ borderColor: 'var(--glass-border-hover)' }}>
                            <h3>Objetivo Profesional</h3>
                            <div className="bio-content">
                              <p>
                                <strong>Desarrollador web</strong> con experiencia en la creación de aplicaciones modernas y responsivas.
                              </p>
                              <p>
                                Busco oportunidades para aplicar mis habilidades técnicas y creativas en proyectos desafiantes
                                que me permitan crecer profesionalmente mientras contribuyo al éxito del equipo.
                              </p>
                              <p>
                                Actualmente cursando el <strong>6to semestre de Ingeniería de Sistemas</strong> en Univalle,
                                con foco en desarrollo web full stack, bases de datos y automatización.
                              </p>
                              <p>
                                Abierto a <strong>oportunidades de pasantías y empleo</strong>, tanto en Bolivia como en el exterior,
                                donde pueda seguir aprendiendo y aportando valor a equipos de desarrollo.
                              </p>
                            </div>
                          </motion.div>
                          <motion.div className="about-card" {...slideRight} transition={{ duration: 0.6, delay: 0.3 }} whileHover={{ borderColor: 'var(--glass-border-hover)' }}>
                            <h3>Lo que me apasiona</h3>
                            <div className="interests-grid">
                              {[
                                { icon: <Code size={20} />, label: 'Desarrollo Web', color: 'var(--cyan)' },
                                { icon: <Rocket size={20} />, label: 'Nuevas Tecnologías', color: 'var(--purple)' },
                                { icon: <Gamepad2 size={20} />, label: 'Videojuegos', color: 'var(--pink)' },
                                { icon: <Circle size={20} />, label: 'Jugar Fútbol', color: 'var(--orange)' },
                                { icon: <BookOpen size={20} />, label: 'Aprendizaje', color: 'var(--blue)' },
                                { icon: <Zap size={20} />, label: 'Automatización', color: 'var(--yellow)' },
                              ].map((interest, i) => (
                                <motion.div
                                  key={i}
                                  className="interest-category"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: i * 0.06 }}
                                  whileHover={{ scale: 1.05, borderColor: interest.color, boxShadow: `0 0 15px ${interest.color}22` }}
                                  style={{ textAlign: 'center', cursor: 'default' }}
                                >
                                  <div style={{ color: interest.color, marginBottom: '0.5rem' }}>{interest.icon}</div>
                                  <span style={{ color: 'var(--fg)', fontSize: '0.85rem', fontWeight: 500 }}>{interest.label}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </section>
                  </motion.div>
                )}

                {/* ==================== EDUCATION ==================== */}
                {currentView === 'education' && (
                  <motion.div key="education" className="view-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <section className="view">
                      <motion.div className="section-header" {...fadeUp} transition={{ duration: 0.6 }}>
                        <h2>Educación</h2>
                        <p>Mi formación académica y certificaciones</p>
                      </motion.div>
                      <motion.div className="about-card" {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Formación Académica</h3>
                        <div className="timeline">
                          {[
                            { year: '2024 - en curso', title: 'Ingeniería de Sistemas', place: 'Univalle', detail: 'Grado a obtener: Licenciatura', color: 'var(--cyan)' },
                            { year: '2011 - 2022', title: 'Bachiller en Humanidades', place: 'Colegio Pestalozzi', detail: 'Grado obtenido: Bachiller en Humanidades', color: 'var(--purple)' },
                          ].map((item, i) => (
                            <motion.div
                              key={i}
                              className="timeline-item"
                              initial={{ opacity: 0, x: -30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: i * 0.15 }}
                            >
                              <div className="timeline-marker" style={{ borderColor: item.color, color: item.color }}><GraduationCap size={10} /></div>
                              <div className="timeline-content">
                                <span className="timeline-year" style={{ color: item.color }}>{item.year}</span>
                                <h4>{item.title}</h4>
                                <p>{item.place}</p>
                                <p style={{ fontSize: '0.8rem', color: item.color, marginTop: '0.25rem' }}>{item.detail}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div className="about-card" {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Certificaciones y Cursos</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {[
                            { name: 'Introduction to Cybersecurity', issuer: 'Credly', color: 'var(--cyan)' },
                            { name: 'AI Fundamentals with IBM SkillsBuild', issuer: 'Credly', color: 'var(--purple)' },
                            { name: 'Python Essentials 1', issuer: 'Credly', color: 'var(--blue)' },
                            { name: 'Artificial Intelligence Fundamentals', issuer: 'Credly', color: 'var(--pink)' },
                            { name: 'Get Connected', issuer: 'Cisco', color: 'var(--orange)' },
                          ].map((cert, i) => (
                            <motion.div
                              key={i}
                              className="info-item"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: i * 0.08 }}
                              whileHover={{ background: 'rgba(255,255,255,0.04)', x: 4 }}
                            >
                              <div className="info-icon" style={{ '--item-color': cert.color } as React.CSSProperties}><Award size={18} /></div>
                              <div className="info-content">
                                <span className="info-value">{cert.name}</span>
                                <span className="info-label">{cert.issuer}</span>
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 15 }}
                                style={{ color: cert.color, marginLeft: 'auto' }}
                              >
                                <ExternalLink size={14} />
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </section>
                  </motion.div>
                )}

                {/* ==================== SKILLS ==================== */}
                {currentView === 'skills' && (
                  <motion.div key="skills" className="view-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <section className="view">
                      <motion.div className="section-header" {...fadeUp} transition={{ duration: 0.6 }}>
                        <h2>Habilidades</h2>
                        <p>Mis tecnologías, herramientas e idiomas</p>
                      </motion.div>
                      <motion.div className="skills-grid" {...stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
                        {[
                          { title: 'Frontend', icon: <Code size={22} />, color: 'var(--cyan)', gradient: 'linear-gradient(135deg, var(--cyan), var(--blue))', skills: [
                            { name: 'HTML5', level: 90 }, { name: 'CSS3', level: 85 }, { name: 'JavaScript', level: 80 },
                            { name: 'React.js', level: 75 }, { name: 'Bootstrap', level: 70 }, { name: 'Tailwind CSS', level: 65 }, { name: 'SASS / SCSS', level: 60 },
                          ]},
                          { title: 'Backend', icon: <Server size={22} />, color: 'var(--purple)', gradient: 'linear-gradient(135deg, var(--purple), var(--blue))', skills: [
                            { name: 'Node.js', level: 70 }, { name: 'Express.js', level: 68 }, { name: 'PostgreSQL', level: 75 },
                            { name: 'MySQL', level: 70 }, { name: 'MongoDB', level: 55 }, { name: 'REST APIs', level: 72 },
                          ]},
                          { title: 'Herramientas', icon: <Wrench size={22} />, color: 'var(--pink)', gradient: 'linear-gradient(135deg, var(--pink), var(--orange))', skills: [
                            { name: 'Git & GitHub', level: 75 }, { name: 'VS Code', level: 90 }, { name: 'Figma', level: 55 },
                            { name: 'Postman', level: 70 }, { name: 'Docker', level: 40 }, { name: 'Linux / Terminal', level: 60 },
                          ]},
                          { title: 'Soft Skills', icon: <Star size={22} />, color: 'var(--blue)', gradient: 'linear-gradient(135deg, var(--blue), var(--cyan))', skills: [
                            { name: 'Diseño Responsivo', level: 85 }, { name: 'Scrum / Agile', level: 60 }, { name: 'Resolución de Problemas', level: 80 },
                            { name: 'Trabajo en Equipo', level: 85 }, { name: 'Comunicación Efectiva', level: 75 },
                          ]},
                          { title: 'Móvil & Game Dev', icon: <Gamepad2 size={22} />, color: 'var(--yellow)', gradient: 'linear-gradient(135deg, var(--orange), var(--pink))', skills: [
                            { name: 'React Native', level: 50 }, { name: 'Android (Kotlin)', level: 40 }, { name: 'Unity 2D/3D', level: 65 },
                            { name: 'C# (Game Dev)', level: 70 }, { name: 'Diseño de Sprites', level: 60 }, { name: 'Mecánicas de Juego', level: 55 },
                          ]},
                        ].map((cat, ci) => (
                          <motion.div key={ci} className="skill-category" variants={fadeUp} transition={{ duration: 0.5, delay: ci * 0.1 }} whileHover={{ borderColor: cat.color, boxShadow: `0 0 20px ${cat.color}11` }}>
                            <div className="category-header">
                              <div className="category-icon" style={{ '--category-color': cat.color } as React.CSSProperties}>{cat.icon}</div>
                              <h3>{cat.title}</h3>
                            </div>
                            <div className="skills-list">
                              {cat.skills.map((skill, i) => (
                                <div key={i} className="skill-item">
                                  <div className="skill-info">
                                    <span className="skill-name">{skill.name}</span>
                                    <span className="skill-level">{skill.level}%</span>
                                  </div>
                                  <div className="skill-bar">
                                    <motion.div
                                      className="skill-progress"
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${skill.level}%` }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 1, delay: i * 0.06, ease: 'easeOut' }}
                                      style={{ background: cat.gradient }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} style={{ marginTop: '2rem', marginBottom: '3rem' }}>
                        <div className="about-card" style={{ textAlign: 'center' }}>
                          <h3 style={{ marginBottom: '1.25rem' }}>Tech Stack</h3>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                            {[
                              { label: 'HTML5', color: '#E34F26' }, { label: 'CSS3', color: '#1572B6' },
                              { label: 'JavaScript', color: '#F7DF1E' }, { label: 'React', color: '#61DAFB' },
                              { label: 'Bootstrap', color: '#7952B3' }, { label: 'Tailwind', color: '#06B6D4' },
                              { label: 'SASS', color: '#CC6699' }, { label: 'Node.js', color: '#339933' },
                              { label: 'Express', color: '#FFFFFF' }, { label: 'PostgreSQL', color: '#4169E1' },
                              { label: 'MySQL', color: '#4479A1' }, { label: 'MongoDB', color: '#47A248' },
                              { label: 'Git', color: '#F05032' }, { label: 'GitHub', color: '#FFFFFF' },
                              { label: 'VS Code', color: '#007ACC' }, { label: 'Figma', color: '#F24E1E' },
                              { label: 'Postman', color: '#FF6C37' }, { label: 'Docker', color: '#2496ED' },
                              { label: 'Linux', color: '#FCC624' }, { label: 'Arduino', color: '#00979D' },
                              { label: 'Unity', color: '#FFFFFF' }, { label: 'C#', color: '#68217A' },
                              { label: 'TypeScript', color: '#3178C6' }, { label: 'Vite', color: '#646CFF' },
                              { label: 'React Native', color: '#61DAFB' }, { label: 'Android', color: '#3DDC84' },
                              { label: 'Kotlin', color: '#7F52FF' }, { label: 'Game Dev', color: '#FF6B6B' },
                            ].map((tech, i) => (
                              <motion.span
                                key={i}
                                className="interest-tag"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.03 }}
                                whileHover={{ scale: 1.15, borderColor: tech.color, color: tech.color, boxShadow: `0 0 15px ${tech.color}33` }}
                                style={{ cursor: 'default', fontSize: '0.82rem', padding: '0.35rem 0.8rem' }}
                              >
                                {tech.label}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                      <motion.div className="skills-summary" {...fadeUp} transition={{ duration: 0.6, delay: 0.35 }}>
                        <h3>Idiomas</h3>
                      </motion.div>
                      <motion.div className="languages-grid" {...stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
                        {[
                          { flag: '\uD83C\uDDE6\uD83C\uDDF7', name: 'Español', level: 'Nativo', progress: 100, color: 'var(--cyan)' },
                          { flag: '\uD83C\uDDEC\uD83C\uDDE7', name: 'Inglés', level: 'Avanzado (B2/C1)', progress: 80, color: 'var(--purple)' },
                          { flag: '\uD83C\uDDE9\uD83C\uDDEA', name: 'Alemán', level: 'Básico (A1)', progress: 25, color: 'var(--blue)' },
                        ].map((lang, i) => (
                          <motion.div key={i} className="language-card" variants={fadeUp} transition={{ duration: 0.4 }} whileHover={{ y: -6, borderColor: lang.color, boxShadow: `0 0 20px ${lang.color}22` }}>
                            <motion.span className="lang-flag" whileHover={{ scale: 1.2, rotate: 10 }}>{lang.flag}</motion.span>
                            <div className="lang-info">
                              <span className="lang-name">{lang.name}</span>
                              <span className="lang-level">{lang.level}</span>
                            </div>
                            <div className="lang-bar">
                              <motion.div
                                className="lang-progress"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${lang.progress}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
                                style={{ background: lang.color }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </section>
                  </motion.div>
                )}

                {/* ==================== PROJECTS ==================== */}
                {currentView === 'projects' && (
                  <motion.div key="projects" className="view-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <section className="view">
                      <motion.div className="section-header" {...fadeUp} transition={{ duration: 0.6 }}>
                        <h2>Proyectos</h2>
                        <p>Mis proyectos académicos y profesionales</p>
                      </motion.div>
                      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Proyectos Académicos</h3>
                      </motion.div>
                      <motion.div className="projects-grid" {...stagger} initial="initial" whileInView="animate" viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
                        {[
                          {
                            title: 'Sistema de Control de Asistencia', category: 'Académico', year: '2025',
                            description: 'Desarrollo de una aplicación en C# con base de datos SQL para el control de asistencia.',
                            tags: ['C#', 'SQL', 'Biometría'], color: 'var(--cyan)', icon: <Zap size={20} />,
                            features: ['Desarrollo de una aplicación en C# con base de datos SQL', 'Implementación de biometría para el registro de asistencia'],
                          },
                          {
                            title: 'Página Web Productos de Limpieza', category: 'Académico', year: '2025',
                            description: 'Desarrollo de una página Web para productos de limpieza.',
                            tags: ['HTML', 'CSS', 'JavaScript'], color: 'var(--purple)', icon: <Globe size={20} />,
                            features: ['Desarrollo de una página Web para productos de limpieza'],
                          },
                          {
                            title: 'Casa Inteligente con Arduino', category: 'Académico', year: '2025',
                            description: 'Desarrollo de una casa Inteligente a escala totalmente automatizada.',
                            tags: ['Arduino', 'IoT', 'Automatización'], color: 'var(--blue)', icon: <Rocket size={20} />,
                            features: ['Desarrollo de una casa Inteligente a escala totalmente automatizada'],
                          },
                        ].map((project, i) => (
                          <motion.div
                            key={i}
                            className="project-card"
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -8, boxShadow: `0 12px 40px rgba(0,0,0,0.4)` }}
                          >
                            <div style={{
                              height: 6, background: `linear-gradient(90deg, ${project.color}, transparent)`,
                              borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                            }} />
                            <div className="project-content">
                              <div className="project-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                  <span style={{ color: project.color }}>{project.icon}</span>
                                  <span className="project-category">{project.category} · {project.year}</span>
                                </div>
                                <h4 className="project-title">{project.title}</h4>
                              </div>
                              <p className="project-description">{project.description}</p>
                              <div className="project-features">
                                {project.features.map((f, j) => (
                                  <div key={j} className="feature-item">
                                    <div className="feature-dot" style={{ background: project.color }} />
                                    <span>{f}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="project-tags">
                                {project.tags.map((tag, j) => (
                                  <motion.span key={j} className="tag" whileHover={{ scale: 1.1, borderColor: project.color, color: project.color }}>{tag}</motion.span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                      <motion.div {...fadeUp} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, background: 'var(--gradient-warm)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Proyectos Profesionales</h3>
                      </motion.div>
                      <motion.div className="projects-grid" {...stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
                        {[
                          {
                            title: 'MiniMarket Web', category: 'Profesional', url: 'https://mini-market-web-eta.vercel.app/',
                            description: 'Página Web para un Mini Market con base de datos PostgreSQL, sistema completo de gestión.',
                            tags: ['React', 'PostgreSQL', 'Node.js'], badge: null, color: 'var(--cyan)', icon: <Folder size={20} />,
                            features: ['Desarrollo de una página Web para un Mini Market con base de datos Postgre SQL', 'Implementación de un scanner para los productos', 'Implementación de validación de cercanía del personal para el marcaje de entrada y salida', 'Desarrollo de gestión de pedidos, personal y productos', 'Implementación de monitoreo de pedidos en tiempo real', 'Implementación de sistema de puntos de lealtad', 'Implementación de pasarela de pagos', 'Implementación de sistema de notificaciones para los repartidores', 'Desarrollo de reportes de inventario', 'Desarrollo de sistema de Gestión de compras', 'Desarrollo de un Chat Bot para consultas de los usuarios'],
                          },
                          {
                            title: 'Industrias Vivo', category: 'Profesional', url: 'https://industrias-vivo-web.vercel.app/',
                            description: 'Página Web sobre productos de limpieza con sistema multi-sucursal en desarrollo.',
                            tags: ['React', 'PostgreSQL', 'Node.js'], badge: 'En desarrollo', color: 'var(--orange)', icon: <Rocket size={20} />,
                            features: ['Desarrollo de una página Web sobre productos de limpieza con base de datos Postgre SQL', 'Implementación de monitoreo de pedidos en tiempo real', 'Desarrollo de reportes de inventario entre sucursales', 'Desarrollo de sistema de Gestión de compras', 'Implementación de verificación de usuarios mediante correo electrónico', 'Implementación de pasarela de pagos', 'Implementación de un sistema de control para el administrador de cada sucursal'],
                          },
                          {
                            title: 'Reconnect 43 Unity 2D', category: 'Profesional', url: null,
                            description: 'Desarrollo del juego Reconnect 43 con Unity en 2D, creado completamente desde cero.',
                            tags: ['Unity', 'C#', 'Game Dev'], badge: null, color: 'var(--pink)', icon: <Gamepad2 size={20} />,
                            features: ['Creación de los sprites del juego desde 0', 'Implementación y desarrollo de las mecánicas del juego', 'Modelado de escenarios del juego', 'Desarrollo e implementación de la historia del juego'],
                          },
                        ].map((project, i) => (
                          <motion.div
                            key={i}
                            className="project-card"
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -8, boxShadow: `0 12px 40px rgba(0,0,0,0.4)` }}
                          >
                            <div style={{
                              height: 6, background: `linear-gradient(90deg, ${project.color}, transparent)`,
                              borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                            }} />
                            <div className="project-content">
                              <div className="project-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                                  <span style={{ color: project.color }}>{project.icon}</span>
                                  <span className="project-category">{project.category}</span>
                                  {project.badge && <span className="in-dev-badge-inline">{project.badge}</span>}
                                </div>
                                <h4 className="project-title">{project.title}</h4>
                              </div>
                              <p className="project-description">{project.description}</p>
                              <div className="project-features">
                                {project.features.map((f, j) => (
                                  <div key={j} className="feature-item">
                                    <div className="feature-dot" style={{ background: project.color }} />
                                    <span>{f}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="project-tags">
                                {project.tags.map((tag, j) => (
                                  <motion.span key={j} className="tag" whileHover={{ scale: 1.1, borderColor: project.color, color: project.color }}>{tag}</motion.span>
                                ))}
                              </div>
                              {project.url && (
                                <div className="project-links">
                                  <motion.a href={project.url} target="_blank" rel="noreferrer" className="project-link" whileHover={{ scale: 1.05, borderColor: project.color, color: project.color }}>
                                    <Eye size={14} />
                                    Ver Proyecto
                                    <ExternalLink size={12} />
                                  </motion.a>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </section>
                  </motion.div>
                )}

                {/* ==================== CONTACT ==================== */}
                {currentView === 'contact' && (
                  <motion.div key="contact" className="view-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <section className="view">
                      <motion.div className="section-header" {...fadeUp} transition={{ duration: 0.6 }}>
                        <h2>Contacto</h2>
                        <p>Información de contacto y referencias</p>
                      </motion.div>
                      <div className="contact-grid">
                        <motion.div {...slideLeft} transition={{ duration: 0.6, delay: 0.1 }}>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Información de Contacto</h3>
                          <div className="contact-methods">
                            {[
                              { icon: <Mail size={18} />, label: 'Email', value: 'avm0098@gmail.com', color: 'var(--cyan)', href: 'mailto:avm0098@gmail.com' },
                              { icon: <Phone size={18} />, label: 'Teléfono', value: '+591 70333911', color: 'var(--purple)', href: 'tel:+59170333911' },
                              { icon: <MapPin size={18} />, label: 'Dirección', value: 'Emilio Mendizabal #309, Sucre', color: 'var(--pink)' },
                              { icon: <Globe size={18} />, label: 'GitHub', value: 'Fitruscus', color: 'var(--blue)', href: 'https://github.com/Fitooohhh' },
                              { icon: <Camera size={18} />, label: 'Instagram', value: '@Fitooooo_h0908', color: 'var(--pink)', href: 'https://instagram.com/Fitooooo_h0908' },
                            ].map((method, i) => (
                              <motion.div
                                key={i}
                                className="contact-method"
                                whileHover={{ borderColor: method.color, x: 4 }}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                              >
                                <motion.div className="method-icon" style={{ '--method-color': method.color } as React.CSSProperties} whileHover={{ scale: 1.15, rotate: 5 }}>{method.icon}</motion.div>
                                <div className="method-content">
                                  <span className="method-label">{method.label}</span>
                                  {method.href ? (
                                    <a href={method.href} target="_blank" rel="noreferrer" className="method-value" style={{ color: method.color }}>{method.value}</a>
                                  ) : (
                                    <span className="method-value">{method.value}</span>
                                  )}
                                </div>
                                {method.href && <motion.div whileHover={{ x: 4 }}><ChevronRight size={16} className="external-icon" /></motion.div>}
                              </motion.div>
                            ))}
                          </div>
                          <motion.div
                            className="availability"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <div className="availability-indicator">
                              <span className="status-dot" />
                              Disponible para oportunidades
                            </div>
                            <p>Abierto a propuestas laborales y colaboraciones en proyectos de desarrollo web.</p>
                          </motion.div>
                        </motion.div>
                        <motion.div {...slideRight} transition={{ duration: 0.6, delay: 0.2 }}>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Referencias</h3>
                          <div className="contact-methods">
                            {[
                              { name: 'Misael Condo Rodriguez', role: 'Docente en Univalle', email: 'mcondor@univalle.edu', phone: '+591 73421635', color: 'var(--cyan)' },
                              { name: 'Geovanna Olmos Cardenas', role: 'DIR. DPTO. DE SISTEMAS Y TECNOLOGIA INFORMATICA E INDUSTRIAS', email: 'golmosc@univalle.edu', phone: '+591 73897669', color: 'var(--purple)' },
                            ].map((ref, i) => (
                              <motion.div
                                key={i}
                                className="contact-method"
                                whileHover={{ borderColor: ref.color }}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.12 }}
                                style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                                  <motion.div className="method-icon" style={{ '--method-color': ref.color } as React.CSSProperties} whileHover={{ scale: 1.15 }}><GraduationCap size={18} /></motion.div>
                                  <div className="method-content">
                                    <span className="method-value" style={{ fontWeight: 600 }}>{ref.name}</span>
                                    <span className="method-label">{ref.role}</span>
                                  </div>
                                </div>
                                <div style={{ marginLeft: '3.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                  <a href={`mailto:${ref.email}`} style={{ color: ref.color, fontSize: '0.85rem' }}>{ref.email}</a>
                                  <span style={{ color: 'var(--fg-muted)', fontSize: '0.85rem' }}>{ref.phone}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                      <motion.footer
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="contact-footer"
                        style={{ marginTop: '4rem', textAlign: 'center' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                          {[
                            { icon: <Globe size={18} />, href: 'https://github.com/Fitooohhh', color: 'var(--cyan)' },
                            { icon: <Camera size={18} />, href: 'https://instagram.com/Fitooooo_h0908', color: 'var(--pink)' },
                            { icon: <Mail size={18} />, href: 'mailto:avm0098@gmail.com', color: 'var(--purple)' },
                          ].map((s, i) => (
                            <motion.a
                              key={i}
                              href={s.href}
                              target="_blank"
                              rel="noreferrer"
                              whileHover={{ scale: 1.2, y: -3, color: s.color }}
                              style={{ color: 'var(--fg-muted)', transition: 'color 0.2s' }}
                            >
                              {s.icon}
                            </motion.a>
                          ))}
                        </div>
                        <p>
                          Hecho con <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ display: 'inline-block' }}><Heart size={14} style={{ color: 'var(--pink)' }} /></motion.span> por Adolfo Javier Vera Matijasevic
                        </p>
                        <p className="copyright">&copy; 2025 Todos los derechos reservados</p>
                      </motion.footer>
                    </section>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}