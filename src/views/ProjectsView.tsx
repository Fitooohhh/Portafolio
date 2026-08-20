import { motion } from 'framer-motion'

export default function ProjectsView() {
  return (
    <section className="view projects-view">
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        Proyectos Destacados
      </motion.h2>

      <div className="projects-grid">
        <div className="project-card">
          <h3>Sistema de Control de Asistencia</h3>
          <p>C# + SQL + Biometría</p>
        </div>
        <div className="project-card">
          <h3>Página Web Productos de Limpieza</h3>
          <p>E-commerce de limpieza</p>
        </div>
        <div className="project-card">
          <h3>Casa Inteligente con Arduino</h3>
          <p>Automatización doméstica</p>
        </div>
        <div className="project-card">
          <h3>MiniMarket Web</h3>
          <p>en desarrollo: mini-market-web-eta.vercel.app</p>
        </div>
        <div className="project-card">
          <h3>Industrias Vivo Web</h3>
          <p>en desarrollo: industrias-vivo-web.vercel.app</p>
        </div>
        <div className="project-card">
          <h3>Reconnect 43 - Unity 2D</h3>
          <p>Juego 2D personal</p>
        </div>
      </div>
    </section>
  )
}