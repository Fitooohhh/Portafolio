import { motion } from 'framer-motion'

export default function HomeView() {
  const handleVerProyectos = () => {
    window.location.hash = 'proyectos'
  }

  const handleContactar = () => {
    window.location.hash = 'contacto'
  }

  return (
    <section className="view home-view">
      <motion.h1 className="home-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
        Adolfo Javier
        <br />
        <span className="home-subtitle">Vera Matijasevic</span>
      </motion.h1>

      <motion.p className="home-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
        Ingeniero en Sistemas Informáticos apasionado por la tecnología, el desarrollo de software y la creación de soluciones innovadoras. Siempre en busca de nuevos retos y oportunidades para crecer.
      </motion.p>

      <motion.div className="home-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
        <motion.button
          className="btn btn-primary"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleVerProyectos}
        >
          Ver Proyectos
        </motion.button>
        <motion.button
          className="btn btn-secondary"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContactar}
        >
          Contactar
        </motion.button>
      </motion.div>

      <motion.div className="home-stats" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
        <div className="stat-item">
          <span className="stat-value">22</span>
          <span className="stat-label">Años</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">6to</span>
          <span className="stat-label">Semestre</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">3</span>
          <span className="stat-label">Idiomas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">∞</span>
          <span className="stat-label">Proyectos</span>
        </div>
      </motion.div>
    </section>
  )
}