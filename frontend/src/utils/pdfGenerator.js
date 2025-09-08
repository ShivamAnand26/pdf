import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

export const generatePrescriptionPDF = (prescriptionData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Colors
  const primaryColor = '#2563eb'; // Blue-600
  const secondaryColor = '#64748b'; // Slate-500
  const textColor = '#0f172a'; // Slate-900
  
  let yPosition = 20;
  
  // Header Section
  doc.setFillColor(37, 99, 235); // Blue background
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Logo area (we'll use text for now since we don't have an image)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Healix', 20, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Professional Medical Platform', 20, 32);
  
  // Doctor Info (right side of header)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Dr. Anmol Gupta', pageWidth - 70, 18);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('MBBS, MS — Surgeon', pageWidth - 70, 25);
  doc.text('+91 8604711997', pageWidth - 70, 32);
  doc.text('healixdoctor.in', pageWidth - 70, 39);
  
  yPosition = 55;
  
  // Reset text color for body
  doc.setTextColor(textColor);
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Medical Prescription', 20, yPosition);
  yPosition += 15;
  
  // Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const currentDate = format(new Date(), 'MMMM dd, yyyy');
  doc.text(`Date: ${currentDate}`, pageWidth - 60, yPosition - 10);
  
  // Patient Information Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Patient Information', 20, yPosition);
  yPosition += 10;
  
  // Patient details box
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 250, 252); // Light gray background
  doc.rect(20, yPosition, pageWidth - 40, 25, 'FD');
  
  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const patientName = prescriptionData.patientName || '—';
  const age = prescriptionData.age || '—';
  const gender = prescriptionData.gender ? prescriptionData.gender.charAt(0).toUpperCase() + prescriptionData.gender.slice(1) : '—';
  const phone = prescriptionData.contactPhone || '—';
  const email = prescriptionData.email || '—';
  
  doc.text(`Name: ${patientName}`, 25, yPosition);
  doc.text(`Age: ${age} (${gender})`, 25, yPosition + 7);
  doc.text(`Phone: ${phone}`, 25, yPosition + 14);
  if (prescriptionData.email) {
    doc.text(`Email: ${email}`, 120, yPosition + 14);
  }
  
  yPosition += 35;
  
  // Symptoms & Diagnosis Section
  if (prescriptionData.symptoms) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Symptoms & Diagnosis', 20, yPosition);
    yPosition += 10;
    
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(248, 250, 252);
    const symptomsHeight = Math.max(20, Math.ceil(prescriptionData.symptoms.length / 90) * 5 + 10);
    doc.rect(20, yPosition, pageWidth - 40, symptomsHeight, 'FD');
    
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const splitSymptoms = doc.splitTextToSize(prescriptionData.symptoms, pageWidth - 50);
    doc.text(splitSymptoms, 25, yPosition);
    yPosition += symptomsHeight + 5;
  }
  
  // Medicines Section
  if (prescriptionData.medicines && prescriptionData.medicines.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Prescribed Medicines', 20, yPosition);
    yPosition += 10;
    
    // Create medicines table
    const tableData = prescriptionData.medicines.map(med => [
      med.name || '—',
      med.dosage || '—',
      med.frequency || '—',
      med.duration || '—'
    ]);
    
    doc.autoTable({
      startY: yPosition,
      head: [['Medicine', 'Dosage', 'Frequency', 'Duration']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 10,
        cellPadding: 5
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 }
      },
      margin: { left: 20, right: 20 }
    });
    
    yPosition = doc.lastAutoTable.finalY + 20;
  }
  
  // Additional Notes Section
  if (prescriptionData.additionalNotes) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Additional Notes', 20, yPosition);
    yPosition += 10;
    
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(248, 250, 252);
    const notesHeight = Math.max(20, Math.ceil(prescriptionData.additionalNotes.length / 90) * 5 + 10);
    doc.rect(20, yPosition, pageWidth - 40, notesHeight, 'FD');
    
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const splitNotes = doc.splitTextToSize(prescriptionData.additionalNotes, pageWidth - 50);
    doc.text(splitNotes, 25, yPosition);
    yPosition += notesHeight + 15;
  }
  
  // Footer Section
  const footerY = pageHeight - 50;
  
  // Doctor signature area
  doc.setDrawColor(100, 100, 100);
  doc.line(pageWidth - 100, footerY, pageWidth - 20, footerY);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Dr. Anmol Gupta', pageWidth - 85, footerY + 8);
  doc.text('MBBS, MS — Surgeon', pageWidth - 85, footerY + 16);
  
  // Healix footer
  doc.setDrawColor(200, 200, 200);
  doc.line(20, pageHeight - 25, pageWidth - 20, pageHeight - 25);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  const footerText = '"Healix is committed to delivering trusted healthcare consultations with care, clarity, and convenience — empowering you to take charge of your health."';
  const splitFooter = doc.splitTextToSize(footerText, pageWidth - 40);
  doc.text(splitFooter, 20, pageHeight - 15);
  
  return doc;
};

export const downloadPrescriptionPDF = (prescriptionData, filename) => {
  const doc = generatePrescriptionPDF(prescriptionData);
  const pdfName = filename || `prescription_${prescriptionData.patientName?.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
  doc.save(pdfName);
};

export const getPrescriptionPDFBlob = (prescriptionData) => {
  const doc = generatePrescriptionPDF(prescriptionData);
  return doc.output('blob');
};