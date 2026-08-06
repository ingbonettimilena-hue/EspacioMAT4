"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Fondo fijo Espacio5 con filtro verde seco */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Espacio5.jpeg"
          alt="Espacio MAT - Fondo"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        {/* Filtro verde seco */}
        <div className="absolute inset-0" style={{ backgroundColor: "#5a6b4a", opacity: 0.35, mixBlendMode: "multiply" }} />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/50" />
      </div>

      {/* Decorative organic shapes with mandala colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-20 right-10 w-72 h-72 bg-mat-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-mat-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mat-green/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-6xl mx-auto relative z-10"
      >
        {/* Mandala Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-[220px] h-[220px] mx-auto">
            <Image
              src="/logo.jpeg"
              alt="Espacio MAT - Mandala Logo"
              width={220}
              height={220}
              className="rounded-full drop-shadow-2xl object-cover"
              priority
              loading="eager"
              sizes="220px"
              style={{ objectFit: 'cover', width: '220px', height: '220px' }}
            />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground">
            Espacio <span className="text-primary font-semibold">MAT</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8"
        >
          Fusión holística e integrativa entre{" "}
          <span className="text-mat-purple font-medium">Psicología gestáltica</span> y{" "}
          <span className="text-mat-orange font-medium">Coaching ontológico</span>
        </motion.p>

        {/* Descripción del espacio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8 max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            Un Refugio para tu Alma
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Espacio MAT es más que un lugar físico, es un santuario donde cada detalle 
            ha sido cuidadosamente pensado para crear un ambiente que favorezca tu 
            transformación personal.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Nuestras instalaciones combinan calidez, funcionalidad y estética para 
            ofrecerte la mejor experiencia en cada visita. Desde la iluminación natural 
            hasta los espacios de meditación, todo está diseñado para tu bienestar.
          </p>
        </motion.div>

        {/* Características destacadas */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto"
        >
          {caracteristicas.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-mat-purple/10 hover:border-mat-purple/30 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-mat-purple/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-mat-purple" />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-foreground mb-1">
                  {item.titulo}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.descripcion}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* CTA */}
        {/* CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-lg text-muted-foreground">
            ¿Te gustaría conocer nuestro espacio en persona?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-mat-purple text-white rounded-full font-semibold hover:bg-mat-purple/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Agenda tu visita
            <Sparkles className="w-5 h-5" />
          </a>
        </motion.div> */}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer"
          onClick={() => scrollToSection("filosofia")}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Made with Bob
