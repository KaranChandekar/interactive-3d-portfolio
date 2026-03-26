"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Mail, Phone, Send, Check, Loader2 } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/ui/SocialIcons";
import SplitText from "@/components/ui/SplitText";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
];

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  isValid,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  error?: string;
  isValid?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        className={`w-full bg-white/3 rounded-xl px-4 py-4 text-sm text-foreground outline-none border transition-all duration-300 ${
          error
            ? "border-red-500/50 bg-red-500/5"
            : focused
              ? "border-accent/50 bg-white/5"
              : "border-white/6 hover:border-white/10"
        }`}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          active
            ? "top-1 text-[10px] text-accent font-medium"
            : "top-4 text-sm text-foreground/35"
        }`}
      >
        {label}
      </label>
      {isValid && !error && (
        <Check
          size={16}
          className="absolute right-4 top-4.5 text-green-500"
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-red-400 text-xs mt-1.5 pl-1">
          {error}
        </p>
      )}
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  isValid,
  maxLength = 500,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  error?: string;
  isValid?: boolean;
  maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        maxLength={maxLength}
        rows={5}
        className={`w-full bg-white/3 rounded-xl px-4 pt-6 pb-4 text-sm text-foreground outline-none border transition-all duration-300 resize-none ${
          error
            ? "border-red-500/50 bg-red-500/5"
            : focused
              ? "border-accent/50 bg-white/5"
              : "border-white/6 hover:border-white/10"
        }`}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          active
            ? "top-2 text-[10px] text-accent font-medium"
            : "top-4 text-sm text-foreground/35"
        }`}
      >
        {label}
      </label>
      <div className="flex justify-between items-center mt-1.5">
        <div>
          {error && (
            <p id={`${id}-error`} className="text-red-400 text-xs pl-1">
              {error}
            </p>
          )}
        </div>
        <span className="text-[11px] text-foreground/25 font-mono pr-1">
          {value.length}/{maxLength}
        </span>
      </div>
      {isValid && !error && (
        <Check
          size={16}
          className="absolute right-4 top-5 text-green-500"
        />
      )}
    </div>
  );
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
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
    if (!data.name.trim()) errs.name = "Name is required";
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
    setTouched({ name: true, email: true, message: true });
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
    setFormData({ name: "", email: "", message: "" });
    setTouched({});
    setTimeout(() => setStatus("idle"), 3000);
  };

  const isFieldValid = (field: keyof FormData) =>
    touched[field] && !errors[field] && formData[field].length > 0;

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SplitText
            as="h2"
            className="text-3xl md:text-5xl font-bold"
            direction="center"
          >
            Get In Touch
          </SplitText>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/45 mt-4 max-w-lg mx-auto text-sm md:text-base"
          >
            Have a project in mind or want to collaborate? Drop me a message.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Form - takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatingInput
                  id="name"
                  label="Your Name"
                  value={formData.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  error={touched.name ? errors.name : undefined}
                  isValid={isFieldValid("name")}
                />
                <FloatingInput
                  id="email"
                  label="Your Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email ? errors.email : undefined}
                  isValid={isFieldValid("email")}
                />
              </div>

              <FloatingTextarea
                id="message"
                label="Your Message"
                value={formData.message}
                onChange={handleChange("message")}
                onBlur={handleBlur("message")}
                error={touched.message ? errors.message : undefined}
                isValid={isFieldValid("message")}
              />

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: status === "sending" ? 1 : 1.01 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  status === "success"
                    ? "bg-green-600 text-white"
                    : "bg-accent text-white hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20"
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

          {/* Contact info - takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Info cards */}
            <div className="space-y-4">
              <a
                href="mailto:hello@alexchen.dev"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/6 hover:border-accent/30 transition-all duration-300 group"
                data-cursor="link"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Mail size={18} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-foreground/35 uppercase tracking-wider font-medium">
                    Email
                  </p>
                  <p className="text-sm font-medium text-foreground/80 group-hover:text-accent transition-colors truncate">
                    hello@alexchen.dev
                  </p>
                </div>
              </a>

              <a
                href="tel:+15551234567"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/6 hover:border-accent/30 transition-all duration-300 group"
                data-cursor="link"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Phone size={18} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-foreground/35 uppercase tracking-wider font-medium">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-foreground/80 group-hover:text-accent transition-colors">
                    +1 (555) 123-4567
                  </p>
                </div>
              </a>
            </div>

            {/* Social links */}
            <div>
              <p className="text-[11px] text-foreground/35 uppercase tracking-wider font-medium mb-3 pl-1">
                Social
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-11 h-11 rounded-lg bg-white/5 border border-white/6 flex items-center justify-center hover:bg-accent/15 hover:border-accent/30 hover:text-accent transition-all duration-300 group"
                    data-cursor="link"
                  >
                    <social.icon
                      size={18}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
