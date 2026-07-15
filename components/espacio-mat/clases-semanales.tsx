"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, Users, Heart } from "lucide-react";

export function ClasesSemanales() {
  return (
    <section id="clases-semanales" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Clases <span className="text-primary">Semanales</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Espacios regulares de encuentro, práctica y crecimiento personal en comunidad
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-[#e8e0f0]">
              <Image
                src="/clasessemanales.jpg"
                alt="Clases Semanales"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nuestras clases semanales son encuentros grupales donde combinamos diferentes 
                técnicas y herramientas para el autoconocimiento y el desarrollo personal.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Un espacio seguro y contenedor donde explorar, compartir y crecer junto a otros 
                en un camino de transformación consciente.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-mat-purple/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-mat-purple" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Frecuencia</h4>
                  <p className="text-sm text-muted-foreground">Encuentros semanales regulares</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-mat-orange/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-mat-orange" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Duración</h4>
                  <p className="text-sm text-muted-foreground">Sesiones de 60 minutos</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-mat-green/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-mat-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Modalidad</h4>
                  <p className="text-sm text-muted-foreground">Grupos reducidos</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-mat-magenta/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-mat-magenta" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Enfoque</h4>
                  <p className="text-sm text-muted-foreground">Práctico y vivencial</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-secondary/30 rounded-3xl p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              ¿Qué trabajamos en las clases?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Cada encuentro es único y se adapta a las necesidades del grupo. Trabajamos con 
              técnicas de Gestalt, meditación, movimiento consciente, trabajo corporal, 
              expresión creativa y dinámicas grupales.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              No se requiere experiencia previa. Solo necesitas ganas de explorar, 
              apertura para compartir y compromiso con tu proceso de crecimiento.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Made with Bob
