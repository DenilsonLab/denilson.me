import { Mail, MessageSquare, Send, MapPin, Phone, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { motion } from "motion/react";
import { translations } from "../utils/translations";

interface ContactSectionProps {
  t: typeof translations.es;
}

export function ContactSection({ t }: ContactSectionProps) {
  return (
    <section id="contacto" className="py-20 px-8 bg-[#0d1117]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-gray-100">
            {t.contact.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-[#161b22] border-[#21262d] hover:border-[#30363d] transition-all h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-100">
                  <MessageSquare className="w-5 h-5 text-[#58a6ff]" />
                  {t.contact.form.title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t.contact.form.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">{t.contact.form.name}</Label>
                    <Input 
                      id="name" 
                      placeholder={t.contact.form.namePlaceholder}
                      className="bg-[#0d1117] border-[#21262d] focus:border-[#58a6ff] text-gray-100 placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">{t.contact.form.email}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={t.contact.form.emailPlaceholder}
                      className="bg-[#0d1117] border-[#21262d] focus:border-[#58a6ff] text-gray-100 placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-300">{t.contact.form.subject}</Label>
                    <Input 
                      id="subject" 
                      placeholder={t.contact.form.subjectPlaceholder}
                      className="bg-[#0d1117] border-[#21262d] focus:border-[#58a6ff] text-gray-100 placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">{t.contact.form.message}</Label>
                    <Textarea 
                      id="message" 
                      placeholder={t.contact.form.messagePlaceholder}
                      rows={5}
                      className="bg-[#0d1117] border-[#21262d] focus:border-[#58a6ff] text-gray-100 placeholder:text-gray-500"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#238636] hover:bg-[#2ea043] text-white border-0"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {t.contact.form.send}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-[#161b22] border-[#21262d]">
                <CardHeader>
                  <CardTitle className="text-gray-100">{t.contact.info.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {t.contact.info.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-[#238636]/10 border border-[#238636]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#3fb950]" />
                    </div>
                    <div>
                      <h3 className="text-gray-100">{t.contact.info.email}</h3>
                      <p className="text-gray-400">tu@email.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-[#1f6feb]/10 border border-[#1f6feb]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#58a6ff]" />
                    </div>
                    <div>
                      <h3 className="text-gray-100">{t.contact.info.phone}</h3>
                      <p className="text-gray-400">+34 XXX XXX XXX</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-[#d2a8ff]/10 border border-[#d2a8ff]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#d2a8ff]" />
                    </div>
                    <div>
                      <h3 className="text-gray-100">{t.contact.info.location}</h3>
                      <p className="text-gray-400">{t.sidebar.locationValue}</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-[#161b22] border-[#21262d]">
                <CardHeader>
                  <CardTitle className="text-[#3fb950] flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-5 h-5" />
                    </motion.div>
                    {t.contact.availability.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-[#3fb950] rounded-full"
                    />
                    <p className="text-gray-300">{t.contact.availability.status}</p>
                  </div>
                  <p className="text-gray-400">
                    {t.contact.availability.response}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-[#161b22] border-[#21262d]">
                <CardHeader>
                  <CardTitle className="text-[#ffa657] flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {t.contact.schedule.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-400">
                    <p>{t.contact.schedule.weekdays}</p>
                    <p>{t.contact.schedule.saturday}</p>
                    <p>{t.contact.schedule.sunday}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
