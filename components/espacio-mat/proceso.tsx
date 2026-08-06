"use client";

import { motion } from "framer-motion";
import { Eye, Compass, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Eye,
    title: "Me doy cuenta",
    subtitle: "Proceso Psicoterapéutico",
    description:
      "A través de la psicología gestáltica, te acompaño a tomar consciencia de tus patrones, emociones y creencias. El darse cuenta es el primer paso hacia la transformación profunda.",
    bgColor: "bg-mat-purple/10",
    textColor: "text-mat-purple",
    borderColor: "border-mat-purple/30",
  },
  {
    icon: Compass,
    title: "Plan de Acción",
    subtitle: "Proceso de Coaching",
    description:
      "Desde el coaching ontológico, diseñamos juntos un plan de acción concreto que te permita avanzar hacia tus metas con claridad y propósito.",
    bgColor: "bg-mat-orange/10",
    textColor: "text-mat-orange",
    borderColor: "border-mat-orange/30",
  },
  {
    icon: Sparkles,
    title: "Transformación",
    subtitle: "Descubrí tu Misión",
    description:
      "Integra ambos procesos para descubrir tus dones y talentos únicos. Emprendé tu proyecto de vida y vive alineado con tu misión personal.",
    bgColor: "bg-mat-green/10",
    textColor: "text-mat-green",
    borderColor: "border-mat-green/30",
  },
];

export function Proceso() {
  return (
    <section id="proceso" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            El Camino de la{" "}
            <span className="text-primary">Transformación</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Un proceso integrador que une la profundidad de la psicoterapia con
            la acción del coaching
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className={`bg-card rounded-2xl p-8 md:p-10 border ${step.borderColor} h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5`}>
                {/* Step number */}
                <div className={`absolute -top-4 left-8 ${step.bgColor} ${step.textColor} font-serif text-sm px-4 py-1 rounded-full`}>
                  Paso {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${step.bgColor} ${step.textColor}`}
                >
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className={`${step.textColor} font-medium text-sm uppercase tracking-wider mb-4`}>
                  {step.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
