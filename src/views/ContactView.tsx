import { motion } from 'framer-motion'

export default function ContactView() {
  return (
    <section className="view contact-view">
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        Contacto
      </motion.h2>

      <div className="contact-info">
        <p><strong>Email:</strong> adolfo.vera@univalle.edu.bo</p>
        <p><strong>Teléfono:</strong> +591 70333911</p>
        <p><strong>GitHub:</strong> <a href="https://github.com/Fitooohhh" target="_blank">https://github.com/Fitooohhh</a></p>
        <p>No tengo LinkedIn</p>
      </div>
    </section>
  )
}