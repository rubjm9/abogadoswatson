"use client";

import { motion } from 'framer-motion';

interface NotFoundClientProps {
    children: React.ReactNode;
}

export function NotFoundClient({ children }: NotFoundClientProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
        >
            {children}
        </motion.div>
    );
}


