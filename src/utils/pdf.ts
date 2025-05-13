import jsPDF from "jspdf";

export function generateInvoicePDF(invoice: any, booking: any, user: any) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Invoice", 14, 20);
  doc.setFontSize(12);
  doc.text(`Invoice Number: ${invoice.invoice_number}`, 14, 35);
  doc.text(`Issued At: ${new Date(invoice.issued_at).toLocaleDateString()}`, 14, 43);
  doc.text(`Due Date: ${invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "-"}`, 14, 51);
  doc.text(`Status: ${invoice.status}`, 14, 59);
  doc.text(`User: ${user?.name || user?.email || "-"}`, 14, 67);
  doc.text(`Trip: ${booking.trip?.name || "-"}`, 14, 75);
  doc.text(`Dates: ${booking.start_date} to ${booking.end_date}`, 14, 83);
  doc.text(`People: ${booking.number_of_people}`, 14, 91);
  doc.text(`Total: $${invoice.total_amount.toFixed(2)} ${invoice.currency}`, 14, 99);
  doc.text("Thank you for booking with OnPoint!", 14, 120);
  return doc;
}
