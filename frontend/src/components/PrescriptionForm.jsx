import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Trash2, Save, Send, FileText, Download, Image } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { downloadPrescriptionPDF, downloadPrescriptionImage } from "../utils/pdfGenerator";

const PrescriptionForm = ({ data, onChange }) => {
  const { toast } = useToast();
  const [medicines, setMedicines] = useState(data.medicines || []);

  const handleInputChange = (field, value) => {
    const updatedData = { ...data, [field]: value };
    onChange(updatedData);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = medicines.map((med, i) =>
      i === index ? { ...med, [field]: value } : med
    );
    setMedicines(updatedMedicines);
    handleInputChange("medicines", updatedMedicines);
  };

  const addMedicine = () => {
    const newMedicine = {
      name: "",
      dosage: "",
      frequency: "",
      duration: ""
    };
    const updatedMedicines = [...medicines, newMedicine];
    setMedicines(updatedMedicines);
    handleInputChange("medicines", updatedMedicines);
  };

  const removeMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
    handleInputChange("medicines", updatedMedicines);
  };

  const handleSave = () => {
    // Validate required fields
    if (!data.patientName || !data.contactPhone) {
      toast({
        title: "Validation Error",
        description: "Patient name and contact phone are required",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage
    const prescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    const newPrescription = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "Draft"
    };
    prescriptions.push(newPrescription);
    localStorage.setItem("prescriptions", JSON.stringify(prescriptions));

    toast({
      title: "Success",
      description: "Prescription saved successfully"
    });
  };

  const handleGeneratePDF = async () => {
    if (!data.patientName || !data.contactPhone) {
      toast({
        title: "Validation Error",
        description: "Patient name and contact phone are required",
        variant: "destructive"
      });
      return;
    }

    try {
      await downloadPrescriptionPDF('prescription-preview', data.patientName);
      toast({
        title: "Success",
        description: "Prescription PDF downloaded successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleGenerateImage = async () => {
    if (!data.patientName || !data.contactPhone) {
      toast({
        title: "Validation Error",
        description: "Patient name and contact phone are required",
        variant: "destructive"
      });
      return;
    }

    try {
      await downloadPrescriptionImage('prescription-preview', data.patientName);
      toast({
        title: "Success",
        description: "Prescription image downloaded successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleWhatsAppSend = () => {
    if (!data.patientName || !data.contactPhone) {
      toast({
        title: "Validation Error",
        description: "Patient name and contact phone are required",
        variant: "destructive"
      });
      return;
    }

    // Mock WhatsApp sending
    const message = `Hello ${data.patientName}, your prescription from Dr. Anmol Gupta (Healix) is ready. Please find the attached prescription document.`;
    const whatsappUrl = `https://wa.me/${data.contactPhone}?text=${encodeURIComponent(message)}`;
    
    // Save as sent
    const prescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    const newPrescription = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "Sent"
    };
    prescriptions.push(newPrescription);
    localStorage.setItem("prescriptions", JSON.stringify(prescriptions));

    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "Success",
      description: "Prescription sent via WhatsApp successfully"
    });
  };

  return (
    <div className="space-y-6">
      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Patient Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input
                id="patientName"
                value={data.patientName || ""}
                onChange={(e) => handleInputChange("patientName", e.target.value)}
                placeholder="Enter patient name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Contact Phone *</Label>
              <Input
                id="contactPhone"
                value={data.contactPhone || ""}
                onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                placeholder="+91 XXXXXXXXXX"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={data.age || ""}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="Age"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={data.gender || ""}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={data.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="patient@email.com"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Symptoms & Diagnosis */}
      <Card>
        <CardHeader>
          <CardTitle>Symptoms & Diagnosis</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.symptoms || ""}
            onChange={(e) => handleInputChange("symptoms", e.target.value)}
            placeholder="Enter symptoms and diagnosis details..."
            className="min-h-24"
          />
        </CardContent>
      </Card>

      {/* Medicines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Medicines</span>
            <Button onClick={addMedicine} size="sm" className="flex items-center space-x-1">
              <Plus className="h-4 w-4" />
              <span>Add Medicine</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {medicines.map((medicine, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
              <div>
                <Label>Medicine Name</Label>
                <Input
                  value={medicine.name}
                  onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                  placeholder="Medicine name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Dosage</Label>
                <Input
                  value={medicine.dosage}
                  onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                  placeholder="e.g., 500mg"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Frequency</Label>
                <Input
                  value={medicine.frequency}
                  onChange={(e) => handleMedicineChange(index, "frequency", e.target.value)}
                  placeholder="e.g., 2x daily"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={medicine.duration}
                  onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                  placeholder="e.g., 7 days"
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => removeMedicine(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {medicines.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p>No medicines added yet. Click "Add Medicine" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.additionalNotes || ""}
            onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
            placeholder="Any additional instructions or notes..."
            className="min-h-20"
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleSave} variant="outline" className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save to Records</span>
        </Button>
        <Button onClick={handleGenerateImage} variant="outline" className="flex items-center space-x-2">
          <Image className="h-4 w-4" />
          <span>Download Image</span>
        </Button>
        <Button onClick={handleGeneratePDF} variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download PDF</span>
        </Button>
        <Button onClick={handleWhatsAppSend} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
          <Send className="h-4 w-4" />
          <span>Send via WhatsApp</span>
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionForm;