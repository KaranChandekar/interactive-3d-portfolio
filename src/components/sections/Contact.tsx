"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  Mail,
  Phone,
  Send,
  Check,
  Loader2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";
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
  error,
  isValid,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  isValid?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative mb-6">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-transparent border-b-2 py-3 px-1 text-foreground outline-none transition-colors duration-300 ${
          error
            ? "border-red-500"
            : focused
            ? "border-accent"
            : "border-foreground/10"
        }`}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label
        htmlFor={id}
        className={`absolute left-1 transition-all duration-300 pointer-events-none ${
          active
            ? "-top-5 text-xs text-accent"
            : "top-3 text-sm text-foreground/40"
        }`}
      >
        {label}
      </label>
      {/* Animated bottom border */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-transform duration-300 origin-left ${
          focused ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ width: "100%" }}
      />
      {/* Valid check */}
      {isValid && !error && (
        <Check
          size={16}
          className="absolute right-2 top-3.5 text-green-500"
        />
      )}
      {/* Error message */}
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs mt-1">
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
  error,
  isValid,
  maxLength = 500,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  isValid?: boolean;
  maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative mb-6">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={maxLength}
        rows={4}
        className={`w-full bg-transparent border-b-2 py-3 px-1 text-foreground outline-none transition-colors duration-300 resize-none ${
          error
            ? "border-red-500"
            : focused
            ? "border-accent"
            : "border-foreground/10"
        }`}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label
        htmlFor={id}
        className={`absolute left-1 transition-all duration-300 pointer-events-none ${
          active
            ? "-top-5 text-xs text-accent"
            : "top-3 text-sm text-foreground/40"
        }`}
      >
        {label}
      </label>
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-transform duration-300 origin-left ${
          focused ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ width: "100%" }}
      />
      <span className="absolute right-0 -bottom-5 text-xs text-foreground/30 font-mono">
        {value.length}/{maxLength}
      </span>
      {isValid && !error && (
        <Check
          size={16}
          className="absolute right-2 top-3.5 text-green-500"
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs mt-1">
          {error}
        </p>
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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errs = validate(formData);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      // Shake animation
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

    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
    setTouched({});

    setTimeout(() => setStatus("idle"), 3000);
  };

  const isFieldValid = (field: keyof FormData) =>
    touched[field] && !errors[field] && formData[field].length > 0;

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SplitText
            as="h2"
            className="text-3xl md:text-5xl font-bold"
            direction="center"
          >
            Get In Touch
          </SplitText>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-foreground/50 mt-4 max-w-lg mx-auto"
          >
            Have a project in mind or want to collaborate? Drop me a message.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <FloatingInput
                id="name"
                label="Your Name"
                value={formData.name}
                onChange={handleChange("name")}
                error={touched.name ? errors.name : undefined}
                isValid={isFieldValid("name")}
              />
              <FloatingInput
                id="email"
                label="Your Email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                error={touched.email ? errors.email : undefined}
                isValid={isFieldValid("email")}
              />
              <FloatingTextarea
                id="message"
                label="Your Message"
                value={formData.message}
                onChange={handleChange("message")}
                error={touched.message ? errors.message : undefined}
                isValid={isFieldValid("message")}
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className={`mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  status === "success"
                    ? "bg-green-600 text-white"
                    : "bg-accent text-white hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
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
              </button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-500 text-sm text-center mt-3"
                  >
                    Thanks! I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6 mb-10">
              <a
                href="mailto:hello@alexchen.dev"
                className="flex items-center gap-4 group"
                data-cursor="link"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-foreground/40 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm font-medium group-hover:text-accent transition-colors">
                    hello@alexchen.dev
                  </p>
                </div>
              </a>

              <a
                href="tel:+15551234567"
                className="flex items-center gap-4 group"
                data-cursor="link"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-foreground/40 uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="text-sm font-medium group-hover:text-accent transition-colors">
                    +1 (555) 123-4567
                  </p>
                </div>
              </a>
            </div>

            <div>
              <p className="text-xs text-foreground/40 uppercase tracking-wider mb-4">
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
                    className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-all duration-300 group"
                    data-cursor="link"
                  >
                    <social.icon
                      size={20}
                      className="group-hover:rotate-12 transition-transform duration-300"
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
