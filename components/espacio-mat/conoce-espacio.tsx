"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Users, Home } from "lucide-react";

const caracteristicas = [
  {
    icon: Home,
    titulo: "Ambiente Acogedor",
    descripcion: "Un espacio diseñado para tu comodidad y bienestar",
  },
  {
    icon: Heart,
    titulo: "Energía Positiva",
    descripcion: "Cada rincón está pensado para transmitir paz y armonía",
  },
  {
    icon: Users,
    titulo: "Comunidad",
    descripcion: "Un lugar de encuentro para compartir y crecer juntos",
  },
  {
    icon: Sparkles,
    titulo: "Inspiración",
    descripcion: "Espacios que invitan a la reflexión y el autoconocimiento",
  },
];

export function ConoceEspacio() {
  return (
    <section id="conoce-espacio" className="py-24 md:py-32 px-6 bg-gradient-to-b from-background to-mat-purple/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Un paseo por{" "}
            <span className="text-mat-purple">Espacio MAT</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Un lugar especialmente diseñado para tu crecimiento personal y bienestar
          </p>
        </motion.div>

        {/* Grid de contenido */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Video principal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-black"
          >
            <video
              className="w-full h-full object-cover"
              controls
              playsInline
              poster="/ingreso.jpg"
            >
              <source src="/espacio-mat-tour.mp4" type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
          </motion.div>

          {/* Descripción */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-3xl md:text-4xl text-foreground">
              Un Refugio para tu Alma
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Espacio MAT es más que un lugar físico, es un santuario donde cada detalle 
              ha sido cuidadosamente pensado para crear un ambiente que favorezca tu 
              transformación personal.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nuestras instalaciones combinan calidez, funcionalidad y estética para 
              ofrecerte la mejor experiencia en cada visita. Desde la iluminación natural 
              hasta los espacios de meditación, todo está diseñado para tu bienestar.
            </p>
            
            {/* Características destacadas */}
            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              {caracteristicas.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-mat-purple/10 hover:border-mat-purple/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-mat-purple/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-mat-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {item.titulo}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.descripcion}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to action */}
        {/*<motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            ¿Te gustaría conocer nuestro espacio en persona?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-mat-purple text-white rounded-full font-semibold hover:bg-mat-purple/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Agenda tu visita
            <Sparkles className="w-5 h-5" />
          </a>
        </motion.div>*/}
      </div>
    </section>
  );
}

// Made with Bob