/**
 * WhatsApp utility functions.
 * Builds wa.me URLs from phone number and optional pre-filled message.
 */

export function buildWhatsAppUrl(
  number: string,
  message?: string
): string {
  const cleanNumber = number.replace(/\D/g, "");
  if (!cleanNumber) return "";

  const base = `https://wa.me/${cleanNumber}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

export function buildContactWhatsAppUrl(
  number: string,
  formData: {
    name: string;
    phone: string;
    topic?: string;
    message: string;
  }
): string {
  const lines = [
    `Halo, saya ${formData.name}.`,
    formData.topic ? `Topik: ${formData.topic}` : "",
    `Pesan: ${formData.message}`,
    `No. WhatsApp saya: ${formData.phone}`,
  ].filter(Boolean);

  return buildWhatsAppUrl(number, lines.join("\n"));
}
