import jsPDF from "jspdf";

// Helper to load logo as base64 (for browser)
async function getLogoBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateInvoicePDF(invoice: any, booking: any, user: any) {
  const doc = new jsPDF();

  // Glassmorphism background
  doc.setFillColor(240, 255, 250, 0.7); // Mint/greenish, semi-transparent
  doc.roundedRect(8, 8, 194, 281, 12, 12, 'F');

  // Logo
  const logoUrl = '/logos/onpointhflightmodelogo.png';
  const logoBase64 = await getLogoBase64(logoUrl);
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', 14, 14, 36, 18, undefined, 'FAST');
  }

  // Header
  doc.setFontSize(22);
  doc.setTextColor(34, 197, 94); // Tailwind green-500
  doc.text("INVOICE", 110, 28, { align: "left" });

  // Invoice info
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59); // Slate-800
  doc.text(`Invoice #: ${invoice.invoice_number}`, 14, 45);
  doc.text(`Issued: ${new Date(invoice.issued_at).toLocaleDateString()}`, 14, 53);
  doc.text(`Due: ${invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "-"}`, 14, 61);
  doc.text(`Status: ${invoice.status}`, 14, 69);

  // User info
  doc.setTextColor(34, 197, 94); // green
  doc.text("Billed To:", 14, 83);
  doc.setTextColor(30, 41, 59);
  doc.text(user?.name || user?.email || "-", 14, 89);
  doc.text(user?.email || "", 14, 95);

  // Trip info
  doc.setTextColor(34, 197, 94);
  doc.text("Trip:", 14, 109);
  doc.setTextColor(30, 41, 59);
  doc.text(booking.trip?.name || "-", 14, 115);
  doc.text(`Dates: ${booking.start_date} to ${booking.end_date}`, 14, 121);
  doc.text(`People: ${booking.number_of_people}`, 14, 127);

  // Amount
  doc.setFontSize(16);
  doc.setTextColor(34, 197, 94);
  doc.text(`Total: $${invoice.total_amount.toFixed(2)} ${invoice.currency}`, 14, 145);

  // Glassy footer
  doc.setFillColor(34, 197, 94, 0.12);
  doc.roundedRect(14, 260, 182, 20, 8, 8, 'F');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text("Thank you for booking with OnPoint!", 105, 273, { align: "center" });

  return doc;
}
