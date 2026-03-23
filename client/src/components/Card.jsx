import { motion } from "framer-motion";

function Card({ children, className = "" }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`card-glass rounded-2xl ${className}`}
    >
      {children}
    </motion.article>
  );
}

export default Card;
