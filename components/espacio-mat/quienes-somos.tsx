"use client";

import { motion } from "framer-motion";

const equipo = [
  {
    nombre: "María Alejandra Torroija",
    rol: "Psicóloga gestáltica y coach",
    descripcion: "Especialista en transformación humana, liderazgo consciente e inteligencia emocional.",
  },
  {
    nombre: "Marian Rossi",
    rol: "Profe de yoga y Masajes Ayurvédicos",
    descripcion: "",
  },
  {
    nombre: "Vale Chiosoni",
    rol: "Profe de meditación",
    descripcion: "",
  },
  {
    nombre: "Julieta",
    rol: "Nutricionista",
    descripcion: "",
  },
  {
    nombre: "Estefania",
    rol: "Redes Sociales",
    descripcion: "",
  },
  {
    nombre: "Nicolás Vásquez y Paola Medina",
    rol: "Mantenimiento y Aseo",
    descripcion: "Los motores detrás de la escena. Hacen que todo funcione a la perfección y que cada rincón brille. Con un ojo clínico, se aseguran de que disfrutes de un entorno impecable todos los días.",
  },
];

export function QuienesSomos() {
  return (
    <section id="quienessomos" className="py-24 md:py-32 px-6">
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
            ¿Quiénes{" "}
            <span className="text-primary">Somos?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conocé al equipo comprometido con tu bienestar y transformación personal.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipo.map((persona, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 hover:border-primary/30 p-6"
            >
              {/* Content */}
              <div>
                <h3 className="font-serif text-2xl text-foreground mb-2">
                  {persona.nombre}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {persona.rol}
                </p>
                {persona.descripcion && (
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {persona.descripcion}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Made with Bob
