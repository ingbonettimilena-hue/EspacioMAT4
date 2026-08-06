"use client";

import { motion } from "framer-motion";

export function Filosofia() {
  return (
    <section id="filosofia" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
              Nuestra{" "}
              <span className="text-mat-purple block">Filosofía</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                En nuestro <strong className="text-foreground">Espacio MAT</strong>, creemos que cada persona tiene dentro de sí 
                la sabiduría necesaria para transformar su vida. Nuestro rol es 
                crear el espacio seguro y el acompañamiento adecuado para que 
                esa sabiduría emerja.
              </p>
              <p>
                La fusión entre la <strong className="text-mat-purple">Psicología gestáltica</strong> y el{" "}
                <strong className="text-mat-orange">Coaching ontológico</strong> nos permite trabajar tanto con lo que 
                emerge del inconsciente como con la creación consciente de nuevas 
                posibilidades.
              </p>
              <p>
                No se trata solo de entender tu historia, sino de{" "}
                <strong className="text-foreground">convertirte en el autor de tu propia vida</strong>.
              </p>
            </div>
          </motion.div>

          {/* Quote / Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-mat-purple/5 rounded-3xl p-10 md:p-14 relative overflow-hidden">
              {/* Decorative elements with mandala colors */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-mat-orange/15 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-mat-green/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <blockquote className="relative z-10">
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-8">
                  &ldquo;El único viaje verdadero no consiste en buscar nuevos paisajes, 
                  sino en tener nuevos ojos.&rdquo;
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-px bg-mat-purple" />
                  <cite className="not-italic text-muted-foreground">
                    Marcel Proust
                  </cite>
                </footer>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
