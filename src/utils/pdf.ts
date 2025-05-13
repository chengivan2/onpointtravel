import jsPDF from "jspdf";

export function generateInvoicePDF(invoice: any, booking: any, user: any) {
  const doc = new jsPDF();

  // Glassmorphism background
  doc.setFillColor(240, 255, 250, 0.7); // Mint/greenish, semi-transparent
  doc.rect(5, 5, 200, 287, "F");

  // Logo (centered)
  const logoUrl = "/logos/onpointhflightmodelogo.png";
  // jsPDF supports base64 images, so we fetch and convert
  // This must be async in a real app, but for now, just leave a placeholder
  // doc.addImage(logoBase64, "PNG", 80, 10, 50, 18);
  doc.setFontSize(18);
  doc.setTextColor(34, 139, 34); // Green
  doc.text("OnPoint Travel", 105, 30, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(60, 80, 60);
  doc.text(`Invoice Number: ${invoice.invoice_number}`, 14, 50);
  doc.text(`Issued At: ${new Date(invoice.issued_at).toLocaleDateString()}`, 14, 58);
  doc.text(`Due Date: ${invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "-"}`, 14, 66);
  doc.text(`Status: ${invoice.status}`, 14, 74);

  // User/Client
  doc.setFontSize(13);
  doc.setTextColor(34, 139, 34);
  doc.text("Billed To:", 14, 86);
  doc.setFontSize(12);
  doc.setTextColor(60, 80, 60);
  doc.text(`${user?.name || user?.email || "-"}`, 14, 92);
  doc.text(`${user?.email || ""}`, 14, 98);

  // Trip details
  doc.setFontSize(13);
  doc.setTextColor(34, 139, 34);
  doc.text("Trip Details:", 14, 112);
  doc.setFontSize(12);
  doc.setTextColor(60, 80, 60);
  doc.text(`Trip: ${booking.trip?.name || "-"}`, 14, 118);
  doc.text(`Dates: ${booking.start_date} to ${booking.end_date}`, 14, 124);
  doc.text(`People: ${booking.number_of_people}`, 14, 130);

  // Amount
  doc.setFontSize(14);
  doc.setTextColor(34, 139, 34);
  doc.text(`Total: $${invoice.total_amount.toFixed(2)} ${invoice.currency}`, 14, 146);

  // Glassy info box
  doc.setDrawColor(34, 139, 34);
  doc.setLineWidth(0.5);
  doc.roundedRect(12, 140, 80, 18, 3, 3, 'D');

  // Footer
  doc.setFontSize(11);
  doc.setTextColor(60, 80, 60);
  doc.text("Thank you for booking with OnPoint!", 14, 270);
  doc.setFontSize(9);
  doc.setTextColor(120, 160, 120);
  doc.text("This is a computer generated invoice.", 14, 278);

  return doc;
}
