"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function Contacto() {
  // Número de WhatsApp (reemplaza con el número real)
  const whatsappNumber = "5491123456789"; // Formato: código país + código área + número
  const whatsappMessage = "Hola! Me gustaría obtener más información sobre Espacio MAT.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="py-24 md:py-32 px-6 bg-secondary/30">
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
            Comenzá tu <span className="text-primary">Camino</span>
          </h2>
          {/*<p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Contáctanos por WhatsApp y comenzá tu transformación personal
          </p>*/}
        </motion.div>

        {/* WhatsApp Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="bg-card rounded-3xl p-12 md:p-16 border border-border/50 text-center max-w-2xl w-full">
            {/*<div className="w-32 h-32 mx-auto mb-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <MessageCircle className="w-16 h-16 text-green-500" />
            </div>*/}
            {/*<h3 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Escribinos por WhatsApp
            </h3>*/}
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Estamos disponibles para responder tus consultas y acompañarte en tu proceso de transformación personal.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-3 px-10 py-5 bg-green-500 hover:bg-green-600 text-white text-lg rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <MessageCircle className="w-7 h-7" />
              Contactar por WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Made with Bob
