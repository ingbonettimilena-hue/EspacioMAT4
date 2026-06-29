"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Calendar } from "lucide-react";
import Image from "next/image";

const cursos = [
  {
    icon: BookOpen,
    title: "Curso Liderazgo humano",
    description: "Coaching ejecutivo, comunicación efectiva, desarrollo de equipos, liderazgo consciente, culturas organizacionales saludables.",
    color: "mat-purple",
    image: "/cursoliderazgo.jpg",
  },
  {
    icon: Users,
    title: "Curso 2",
    description: "Descripción del segundo curso. Explica qué aprenderán los participantes y cómo les ayudará en su desarrollo personal.",
    color: "mat-orange",
    image: "/cuencos.jpeg", // Reemplaza con la ruta de tu imagen
  },
  {
    icon: Calendar,
    title: "Curso 3",
    description: "Descripción del tercer curso. Detalla la metodología, el enfoque y los resultados esperados.",
    color: "mat-green",
    image: "/placeholder.jpg", // Reemplaza con la ruta de tu imagen
  },
];

export function CursosTalleres() {
  return (
    <section id="cursosytalleres" className="py-24 md:py-32 px-6 bg-secondary/20">
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
            Cursos y{" "}
            <span className="text-mat-orange">Talleres</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Espacios de aprendizaje y transformación colectiva donde compartimos herramientas 
            prácticas para tu desarrollo personal y profesional.
          </p>
        </motion.div>

        {/* Cursos Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {cursos.map((curso, index) => {
            const Icon = curso.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                  <Image
                    src={curso.image}
                    alt={curso.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Icon overlay */}
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-${curso.color}/90 backdrop-blur-sm flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-foreground mb-4">
                    {curso.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {curso.description}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`text-${curso.color} hover:underline font-medium transition-all flex items-center gap-2`}
                  >
                    Más información →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
