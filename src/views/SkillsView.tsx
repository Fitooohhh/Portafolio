import { motion } from 'framer-motion'

const skillBars = [
  { name: 'React / Next.js', level: 90, color: '#06d6a0' },
  { name: 'TypeScript / JavaScript', level: 95, color: '#8338ec' },
  { name: 'Vue.js', level: 75, color: '#3a86ff' },
  { name: 'Tailwind CSS', level: 90, color: '#06d6a0' },
  { name: 'Framer Motion', level: 80, color: '#8338ec' },
  { name: 'HTML5 / CSS3', level: 95, color: '#3a86ff' },
  { name: 'PostgreSQL / MySQL', level: 85, color: '#06d6a0' },
  { name: 'Git / GitHub', level: 90, color: '#8338ec' },
  { name: 'Node.js / Express', level: 85, color: '#3a86ff' },
  { name: 'Python / FastAPI', level: 80, color: '#06d6a0' },
]

export default function SkillsView() {
  return (
    <section className="view skills-view">
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        Habilidades Técnicas
      </motion.h2>

      <motion.div className="skills-grid" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
        {skillBars.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="skill-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </div>

            <div className="skill-progress">
              <div
                className="skill-progress-bar"
                style={{ width: `${skill.level}%`, background: skill.color }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}