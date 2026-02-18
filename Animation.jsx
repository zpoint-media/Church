import { motion } from "framer-motion";

export function AnimatedTitle({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle mx-auto">{subtitle}</p>
    </motion.div>
  );
}
