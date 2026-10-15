"use client";

import { useState } from "react";
import { z } from "zod/v4";
import { MessageCircle } from "lucide-react";
import { buildContactWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

// ─── Validation Schema ─────────────────────────────────────────────────

const ContactFormSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phone: z
    .string()
    .min(8, "Nomor WhatsApp minimal 8 digit")
    .regex(/^[0-9+\-\s()]+$/, "Format nomor tidak valid"),
  topic: z.string().optional(),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(1000, "Pesan maksimal 1000 karakter"),
  // Honeypot field — must be empty
  website: z.string().max(0, ""),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

interface ContactFormProps {
  whatsappNumber: string;
  practiceAreas?: { slug: string; title: string }[];
  privacyPublished?: boolean;
}

export function ContactForm({
  whatsappNumber,
  practiceAreas = [],
  privacyPublished = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    topic: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!whatsappNumber) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = ContactFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Honeypot check
    if (formData.website) {
      setIsSubmitting(false);
      return;
    }

    // Open WhatsApp with formatted message
    const url = buildContactWhatsAppUrl(whatsappNumber, {
      name: formData.name,
      phone: formData.phone,
      topic: formData.topic,
      message: formData.message,
    });

    window.open(url, "_blank", "noopener,noreferrer");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-neutral-900 mb-1.5">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border rounded-lg text-sm bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all shadow-sm ${
            errors.name ? "border-red-400 bg-red-50/20" : "border-neutral-300"
          }`}
          placeholder="Contoh: Ahmad Fauzi"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
      </div>

      {/* Phone / WhatsApp */}
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-semibold text-neutral-900 mb-1.5">
          Nomor WhatsApp Aktif <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border rounded-lg text-sm bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all shadow-sm ${
            errors.phone ? "border-red-400 bg-red-50/20" : "border-neutral-300"
          }`}
          placeholder="Contoh: 081234567890"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone}</p>}
      </div>

      {/* Topic */}
      {practiceAreas.length > 0 && (
        <div>
          <label htmlFor="contact-topic" className="block text-sm font-semibold text-neutral-900 mb-1.5">
            Kategori Perkara / Permasalahan
          </label>
          <select
            id="contact-topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all shadow-sm"
          >
            <option value="">Pilih bidang perkara (opsional)</option>
            {practiceAreas.map((area) => (
              <option key={area.slug} value={area.title}>
                {area.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-neutral-900 mb-1.5">
          Ringkasan Permasalahan <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg text-sm bg-white text-neutral-900 placeholder:text-neutral-400 resize-y focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all shadow-sm ${
            errors.message ? "border-red-400 bg-red-50/20" : "border-neutral-300"
          }`}
          placeholder="Ceritakan secara singkat kronologi atau hal yang ingin Anda konsultasikan..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500 font-medium">{errors.message}</p>
        )}
      </div>

      {/* Honeypot field for anti-bot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          type="text"
          id="contact-website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Privacy check */}
      {privacyPublished && (
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="contact-privacy"
            required
            className="mt-1 w-4 h-4 rounded border-neutral-300"
          />
          <label htmlFor="contact-privacy" className="text-xs text-neutral-600">
            Saya menyetujui Kebijakan Privasi dan Kerahasiaan Konsultasi.
          </label>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        icon={MessageCircle}
        size="lg"
        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3.5 shadow-sm"
      >
        {isSubmitting ? "Memproses..." : "Kirim Konsultasi via WhatsApp"}
      </Button>
    </form>
  );
}
