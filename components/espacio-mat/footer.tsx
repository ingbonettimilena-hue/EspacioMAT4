"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/50 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <Image
                src="/logo.jpeg"
                alt="Espacio MAT Logo"
                width={36}
                height={36}
                className="rounded-full object-cover"
                sizes="36px"
                style={{ objectFit: 'cover', width: '36px', height: '36px' }}
              />
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">
              Espacio <span className="text-primary">MAT</span>
            </span>
          </div>

          {/* Tagline */}
          {/*<p className="text-muted-foreground text-center md:text-left">
            Psicología Gestáltica & Coaching Ontológico
          </p>*/}

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Espacio MAT. Todos los derechos reservados. Diseñado por{" "}
            <a
              href="https://vibolabdev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              vibolab
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

