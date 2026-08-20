import { motion } from 'framer-motion'

export default function AboutView() {
  return (
    <section className="view about-view">
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        Sobre Mí
      </motion.h2>

      <motion.div className="about-card" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <p><strong>Adolfo Javier Vera Matijasevic</strong></p>
        <p>22 años, nacido en Sucre, Bolivia</p>
        <p>6to semestre de Ingeniería en Sistemas Informáticos en Univalle</p>
        <p>Idiomas: Español (nativo), Inglés (avanzado), Alemán (A1)</p>
      </motion.div>
    </section>
  )
}