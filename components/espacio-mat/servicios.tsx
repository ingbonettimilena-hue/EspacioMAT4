"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const servicios = [
  {
    title: "Psicoterapia Gestáltica",
    description:
      "Sesiones individuales de psicoterapia gestáltica enfocadas en el aquí y ahora, la toma de consciencia y la integración emocional.",
    color: "mat-purple",
  },
  {
    title: "Coaching Ontológico",
    description:
      "Procesos de coaching que trabajan desde el ser para transformar tu manera de observar el mundo y expandir tus posibilidades de acción.",
    color: "mat-orange",
  },
  {
    title: "Programa de Transformación",
    description:
      "Un programa integral, sostenido en el tiempo, que combina psicoterapia y coaching para un proceso de cambio profundo y sostenido.",
    color: "mat-green",
  },
  {
    title: "Talleres Grupales",
    description:
      "Espacios de encuentro y crecimiento colectivo donde explorar temas como: autoconocimiento, relaciones y propósito de vida, pareja y mucha más.",
    color: "mat-magenta",
  },
  {
    title: "Acompañamiento de Proyectos",
    description:
      "Te acompaño en el diseño y desarrollo de tu proyecto de vida o emprendimiento desde una perspectiva holística.",
    color: "mat-gold",
  },
];

export function Servicios() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="servicios" className="py-24 md:py-32 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Nuestros <span className="text-primary">Servicios</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Diferentes modalidades de acompañamiento adaptadas a tus necesidades
            y momento vital
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {servicios.map((servicio, index) => (
            <motion.div
              key={servicio.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full flex items-center justify-between p-6 bg-card rounded-xl border transition-all duration-300 text-left group ${
                  openIndex === index 
                    ? `border-${servicio.color}/50 shadow-md` 
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full bg-${servicio.color}`} />
                  <span className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                    {servicio.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-2 text-muted-foreground leading-relaxed">
                  {servicio.description}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          {/*<p className="text-muted-foreground mb-6">
          '  ¿Estás interesado en alguno de nuestros servicios?
          </p>*/}
          {/*<button
            onClick={() => {
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium transition-all hover:scale-105"
          >
            Hacé click aquí si te interesa alguno de nuestros servicios.
          </button>*/}
        </motion.div>
      </div>
    </section>
  );
}
