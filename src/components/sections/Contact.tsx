"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Send, Check, Loader2 } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/ui/SocialIcons";
import SplitText from "@/components/ui/SplitText";

interface FormData {
  email: string;
  message: string;
}

interface FieldErrors {
  email?: string;
  message?: string;
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const validate = (data: FormData): FieldErrors => {
    const errs: FieldErrors = {};
    if (!data.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.email = "Invalid email address";
    if (!data.message.trim()) errs.message = "Message is required";
    else if (data.message.trim().length < 10)
      errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleChange = (field: keyof FormData) => (val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      const newErrors = validate({ ...formData, [field]: val });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, message: true });
    const errs = validate(formData);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { x: -10 },
          { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" }
        );
      }
      return;
    }

    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setFormData({ email: "", message: "" });
    setTouched({});
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20">
      <div className="max-w-[600px] mx-auto text-center">
        {/* Large heading */}
        <div className="mb-12">
          <SplitText
            as="h2"
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.03em] leading-[1.1]"
            direction="up"
          >
            Let&apos;s work together.
          </SplitText>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 text-left"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-[0.15em] text-muted mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email")(e.target.value)}
                onBlur={handleBlur("email")}
                className={`w-full bg-transparent border-b-2 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-foreground/20 ${
                  errors.email && touched.email
                    ? "border-red-500/50"
                    : "border-foreground/10 focus:border-accent"
                }`}
                placeholder="your@email.com"
                aria-invalid={!!errors.email}
              />
              {touched.email && errors.email && (
                <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono uppercase tracking-[0.15em] text-muted mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message")(e.target.value)}
                onBlur={handleBlur("message")}
                rows={5}
                maxLength={500}
                className={`w-full bg-transparent border-b-2 py-3 text-sm text-foreground outline-none transition-colors duration-300 resize-none placeholder:text-foreground/20 ${
                  errors.message && touched.message
                    ? "border-red-500/50"
                    : "border-foreground/10 focus:border-accent"
                }`}
                placeholder="Tell me about your project..."
                aria-invalid={!!errors.message}
              />
              <div className="flex justify-between items-center mt-1.5">
                {touched.message && errors.message ? (
                  <p className="text-red-400 text-xs">{errors.message}</p>
                ) : (
                  <span />
                )}
                <span className="text-[11px] text-foreground/20 font-mono">
                  {formData.message.length}/500
                </span>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: status === "sending" ? 1 : 1.01 }}
              whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                status === "success"
                  ? "bg-green-600 text-white"
                  : "bg-accent text-background hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
              data-cursor="link"
            >
              {status === "sending" && (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              )}
              {status === "success" && (
                <>
                  <Check size={16} />
                  Message Sent!
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-green-400 text-sm text-center"
                >
                  Thanks! I&apos;ll get back to you soon.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Contact links row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-6 mt-12 flex-wrap"
        >
          <a
            href="mailto:karanchandekar431@gmail.com"
            className="text-sm text-muted hover:text-accent transition-colors"
            data-cursor="link"
          >
            karanchandekar431@gmail.com
          </a>
          <span className="text-foreground/10">|</span>
          <a
            href="tel:+917798227672"
            className="text-sm text-muted hover:text-accent transition-colors"
            data-cursor="link"
          >
            +91-7798227672
          </a>
          <span className="text-foreground/10">|</span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/KaranChandekar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted hover:text-accent transition-colors"
              data-cursor="link"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://linkedin.com/in/karan-chandekar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted hover:text-accent transition-colors"
              data-cursor="link"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="https://twitter.com/KaranChandekar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-muted hover:text-accent transition-colors"
              data-cursor="link"
            >
              <TwitterIcon size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
