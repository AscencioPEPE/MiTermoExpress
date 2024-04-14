'use client';
import { motion } from 'framer-motion';
const Products = () => {
  return (
    <motion.div
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-wrap items-center justify-center bg-black"
    >
      {Array(30)
        .fill('hola')
        .map((_, index) => (
          <div key={index} className="size-[150px] flex-auto border-1 border-white">
            {index}
          </div>
        ))}
      asdsa
    </motion.div>
  );
};

export default Products;
