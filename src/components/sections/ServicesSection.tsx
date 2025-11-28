import { Palette, Code, Wrench, Server, Layers, Zap, Shield, Rocket } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";
import { translations } from "../../utils/translations";

interface ServicesSectionProps {
  t: typeof translations.es;
}

export function ServicesSection({ t }: ServicesSectionProps) {
  const services = [
    {
      icon: Palette,
      title: t.services.design.title,
      description: t.services.design.description,
      color: "text-[#58a6ff]",
      bgColor: "bg-[#1f6feb]/10",
      borderColor: "border-[#1f6feb]/30",
      extraIcons: [Layers, Zap],
    },
    {
      icon: Code,
      title: t.services.development.title,
      description: t.services.development.description,
      color: "text-[#3fb950]",
      bgColor: "bg-[#238636]/10",
      borderColor: "border-[#238636]/30",
      extraIcons: [Rocket, Shield],
    },
    {
      icon: Wrench,
      title: t.services.maintenance.title,
      description: t.services.maintenance.description,
      color: "text-[#d2a8ff]",
      bgColor: "bg-[#8957e5]/10",
      borderColor: "border-[#8957e5]/30",
      extraIcons: [Shield, Zap],
    },
    {
      icon: Server,
      title: t.services.systems.title,
      description: t.services.systems.description,
      color: "text-[#ffa657]",
      bgColor: "bg-[#db6d28]/10",
      borderColor: "border-[#db6d28]/30",
      extraIcons: [Layers, Server],
    },
  ];

  return (
    <section id="servicios" className="py-20 px-8 bg-[#0d1117]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-gray-100">
            {t.services.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const ExtraIcon1 = service.extraIcons[0];
            const ExtraIcon2 = service.extraIcons[1];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[#161b22] border-[#21262d] hover:border-[#30363d] transition-all h-full group hover:shadow-lg hover:shadow-[#238636]/10">
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`w-14 h-14 ${service.bgColor} border ${service.borderColor} rounded-lg flex items-center justify-center`}
                      >
                        <Icon className={`w-7 h-7 ${service.color}`} />
                      </motion.div>
                      <div className="flex gap-2">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className={`w-8 h-8 ${service.bgColor} rounded-md flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity`}
                        >
                          <ExtraIcon1 className={`w-4 h-4 ${service.color}`} />
                        </motion.div>
                        <motion.div
                          whileHover={{ y: -5 }}
                          className={`w-8 h-8 ${service.bgColor} rounded-md flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity`}
                        >
                          <ExtraIcon2 className={`w-4 h-4 ${service.color}`} />
                        </motion.div>
                      </div>
                    </div>
                    <CardTitle className="text-gray-100 group-hover:text-[#58a6ff] transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
