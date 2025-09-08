import React, { useState, useEffect } from "react";
import PrescriptionForm from "../components/PrescriptionForm";
import LivePreview from "../components/LivePreview";
import { mockPrescriptionData } from "../data/mockData";

const PrescriptionPage = () => {
  const [prescriptionData, setPrescriptionData] = useState(mockPrescriptionData);
  const [previewKey, setPreviewKey] = useState(0);

  // Force preview update when data changes
  useEffect(() => {
    setPreviewKey(prev => prev + 1);
  }, [prescriptionData]);

  const handleDataChange = (newData) => {
    setPrescriptionData(newData);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Create Prescription</h1>
          <p className="text-slate-600 mt-2">
            Fill in the patient details and prescription information below
          </p>
        </div>

        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Prescription Form */}
          <div className="order-1 xl:order-1">
            <PrescriptionForm
              data={prescriptionData}
              onChange={handleDataChange}
            />
          </div>

          {/* Live Preview */}
          <div className="order-2 xl:order-2 xl:sticky xl:top-24">
            <LivePreview
              key={previewKey}
              data={prescriptionData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPage;