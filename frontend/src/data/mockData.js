export const mockPrescriptionData = {
  patientName: "Sarah Johnson",
  age: "32",
  gender: "female",
  contactPhone: "+91 9876543210",
  email: "sarah.johnson@email.com",
  symptoms: "Patient complains of persistent cough, mild fever (99.2°F), and fatigue for the past 3 days. No shortness of breath or chest pain reported. Physical examination reveals slight throat inflammation.",
  medicines: [
    {
      name: "Paracetamol",
      dosage: "500mg",
      frequency: "3 times daily",
      duration: "7 days"
    },
    {
      name: "Azithromycin",
      dosage: "250mg",
      frequency: "Once daily",
      duration: "5 days"
    },
    {
      name: "Dextromethorphan Syrup",
      dosage: "10ml",
      frequency: "2 times daily",
      duration: "7 days"
    }
  ],
  additionalNotes: "Take medicines after food. Drink plenty of warm water and rest adequately. Return for follow-up if symptoms persist after 5 days or worsen."
};

export const mockDashboardData = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    contactPhone: "+91 9876543210",
    createdAt: "2024-01-15T10:30:00Z",
    status: "Sent"
  },
  {
    id: "2",
    patientName: "Michael Chen",
    contactPhone: "+91 9876543211",
    createdAt: "2024-01-14T14:20:00Z",
    status: "Draft"
  },
  {
    id: "3",
    patientName: "Emily Rodriguez",
    contactPhone: "+91 9876543212",
    createdAt: "2024-01-13T09:15:00Z",
    status: "Sent"
  }
];