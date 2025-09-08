import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { FileText, Search, Eye, Download, Send, Calendar, Phone, Image } from "lucide-react";
import { mockDashboardData } from "../data/mockData";
import { downloadPrescriptionPDF, downloadPrescriptionImage } from "../utils/pdfGenerator";

const Dashboard = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);

  useEffect(() => {
    // Load from localStorage with fallback to mock data
    const savedPrescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    const allPrescriptions = savedPrescriptions.length > 0 ? savedPrescriptions : mockDashboardData;
    setPrescriptions(allPrescriptions);
    setFilteredPrescriptions(allPrescriptions);
  }, []);

  useEffect(() => {
    const filtered = prescriptions.filter(
      (prescription) =>
        prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.contactPhone.includes(searchTerm)
    );
    setFilteredPrescriptions(filtered);
  }, [searchTerm, prescriptions]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewPrescription = (id) => {
    // In a real app, this would open a modal or navigate to a detailed view
    console.log("Viewing prescription:", id);
  };

  const handleDownloadPDF = async (prescription) => {
    try {
      // For dashboard downloads, we need to recreate the prescription data
      const fullPrescriptionData = {
        patientName: prescription.patientName,
        contactPhone: prescription.contactPhone,
        age: "30", // Mock data since we don't have full prescription details
        gender: "male",
        symptoms: "Follow-up consultation for previously prescribed medication.",
        medicines: [
          {
            name: "Sample Medicine",
            dosage: "500mg",
            frequency: "2x daily",
            duration: "7 days"
          }
        ],
        additionalNotes: "Please complete the full course of medication."
      };
      
      // Since we don't have the preview element on dashboard, we'll use the basic PDF generation
      // In a real app, you'd fetch the full prescription data from backend
      console.log("PDF download for dashboard - would need full prescription data:", prescription.patientName);
      
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  const handleDownloadImage = async (prescription) => {
    try {
      // Similar to PDF, we'd need full prescription data
      console.log("Image download for dashboard - would need full prescription data:", prescription.patientName);
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  };

  const handleResendWhatsApp = (prescription) => {
    const message = `Hello ${prescription.patientName}, your prescription from Dr. Anmol Gupta (Healix) is ready. Please find the attached prescription document.`;
    const whatsappUrl = `https://wa.me/${prescription.contactPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Update status to sent
    const updatedPrescriptions = prescriptions.map(p => 
      p.id === prescription.id ? { ...p, status: "Sent" } : p
    );
    setPrescriptions(updatedPrescriptions);
    localStorage.setItem("prescriptions", JSON.stringify(updatedPrescriptions));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Prescription Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Manage and review all your prescriptions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Prescriptions</p>
                  <p className="text-2xl font-bold text-slate-900">{prescriptions.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Sent Today</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {prescriptions.filter(p => 
                      p.status === "Sent" && 
                      new Date(p.createdAt).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Send className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Draft Prescriptions</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {prescriptions.filter(p => p.status === "Draft").length}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-4 lg:mb-6">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by patient name or phone number..."
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prescriptions List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredPrescriptions.length === 0 ? (
              <div className="text-center py-12 px-4">
                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No prescriptions found</h3>
                <p className="text-slate-600">
                  {searchTerm ? "No prescriptions match your search criteria." : "Create your first prescription to get started."}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Patient</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Contact</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Status</th>
                        <th className="px-6 py-3 text-right text-sm font-medium text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredPrescriptions.map((prescription) => (
                        <tr key={prescription.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <div className="bg-blue-100 p-2 rounded-full">
                                  <FileText className="h-4 w-4 text-blue-600" />
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">
                                  {prescription.patientName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-slate-400" />
                              <span className="text-sm text-slate-900">{prescription.contactPhone}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-slate-400" />
                              <span className="text-sm text-slate-900">{formatDate(prescription.createdAt)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              variant={prescription.status === "Sent" ? "default" : "secondary"}
                              className={
                                prescription.status === "Sent"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }
                            >
                              {prescription.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                onClick={() => handleViewPrescription(prescription.id)}
                                variant="outline"
                                size="sm"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => handleDownloadPDF(prescription)}
                                variant="outline"
                                size="sm"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => handleResendWhatsApp(prescription)}
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-slate-200">
                  {filteredPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {prescription.patientName}
                            </p>
                            <p className="text-xs text-slate-600">{prescription.contactPhone}</p>
                          </div>
                        </div>
                        <Badge
                          variant={prescription.status === "Sent" ? "default" : "secondary"}
                          className={
                            prescription.status === "Sent"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {prescription.status}
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-slate-600">
                        {formatDate(prescription.createdAt)}
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Button
                          onClick={() => handleViewPrescription(prescription.id)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleDownloadPDF(prescription)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                        <Button
                          onClick={() => handleResendWhatsApp(prescription)}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-green-600 hover:text-green-700"
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Send
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;