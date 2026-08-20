import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MousePointerClick } from 'lucide-react'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const handleClick = () => {
      onComplete()
    }

    document.addEventListener('click', handleClick, { once: true })
    return () => document.removeEventListener('click', handleClick)
  }, [onComplete])

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="splash-content">
        <motion.div
          className="splash-logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span className="logo-initial">AVM</span>
        </motion.div>

        <motion.h1
          className="splash-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Bienvenido
        </motion.h1>

        <motion.p
          className="splash-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Adolfo Javier Vera Matijasevic
        </motion.p>

        <motion.div
          className="splash-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        <motion.div
          className="splash-instruction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <MousePointerClick className="click-icon" size={24} />
          <span>Haz click para empezar</span>
        </motion.div>

        <motion.div
          className="splash-particles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.span
              key={i}
              className="particle"
              style={{
                '--delay': `${Math.random() * 2}s`,
                '--duration': `${3 + Math.random() * 4}s`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
              } as React.CSSProperties}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="splash-scroll-hint"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </motion.div>
  )
}