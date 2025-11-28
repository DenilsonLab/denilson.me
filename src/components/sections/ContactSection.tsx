import { useState } from "react";
import { Mail, MapPin, Send, Loader2, Github, Linkedin, Twitter, Instagram, MessageCircle, Zap, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { motion } from "framer-motion";
import { translations } from "../../utils/translations";
import { useMessages } from "../../hooks/useMessages";
import { toast } from "sonner";

interface ContactSectionProps {
  t: typeof translations.es;
}

export function ContactSection({ t }: ContactSectionProps) {
  const { sendMessage } = useMessages();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _honey: "" // Honeypot field
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData._honey) {
      return;
    }

    // Rate limiting check
    const lastSubmitted = localStorage.getItem('contact_last_submitted');
    if (lastSubmitted && Date.now() - parseInt(lastSubmitted) < 60000) {
      setStatus('error');
      setErrorMessage("Por favor espera un momento antes de enviar otro mensaje.");
      return;
    }

    setLoading(true);
    setStatus('idle');
    setErrorMessage("");

    try {
      await sendMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });

      localStorage.setItem('contact_last_submitted', Date.now().toString());
      setStatus('success');
      toast.success("Mensaje enviado correctamente");
      setFormData({ name: "", email: "", message: "", _honey: "" });
    } catch (error) {
      setStatus('error');
      setErrorMessage("Hubo un error al enviar el mensaje. Por favor intenta de nuevo.");
      toast.error("Error al enviar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-20 px-8 bg-[#0d1117] relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-gray-100">{t.contact.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
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
                      <p className="text-gray-400">hello@denilson.me</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-[#1f6feb]/10 border border-[#1f6feb]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-[#58a6ff]" />
                    </div>
                    <div>
                      <h3 className="text-gray-100">{t.contact.info.discord}</h3>
                      <p className="text-gray-400"><a href="https://discord.com/users/711334090246324324" target="_blank">@denils.n</a></p>
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

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-[#161b22] border-[#21262d]">
              <CardHeader>
                <CardTitle className="text-gray-100">{t.contact.form.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {t.contact.form.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {status === 'success' && (
                  <Alert className="mb-6 bg-[#238636]/10 border-[#238636]/30 text-[#3fb950]">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>¡Mensaje enviado!</AlertTitle>
                    <AlertDescription>
                      Gracias por contactarme. Te responderé lo antes posible.
                    </AlertDescription>
                  </Alert>
                )}

                {status === 'error' && (
                  <Alert variant="destructive" className="mb-6 bg-red-900/10 border-red-900/30">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {errorMessage}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden */}
                  <input
                    type="text"
                    name="_honey"
                    value={formData._honey}
                    onChange={(e) => setFormData({ ...formData, _honey: e.target.value })}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{t.contact.form.name}</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.form.namePlaceholder}
                      className="bg-[#0d1117] border-[#30363d]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{t.contact.form.email}</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.form.emailPlaceholder}
                      className="bg-[#0d1117] border-[#30363d]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{t.contact.form.message}</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.form.messagePlaceholder}
                      className="bg-[#0d1117] border-[#30363d] min-h-[150px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#238636] hover:bg-[#2ea043] text-white"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {t.contact.form.send}
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
