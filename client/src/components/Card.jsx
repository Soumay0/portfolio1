import { motion } from "framer-motion";

function Card({ children, className = "", ...props }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`card-glass rounded-2xl ${className}`}
      {...props}
    >
      {children}
    </motion.article>
  );
}

export default Card;
