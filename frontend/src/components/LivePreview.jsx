import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Stethoscope, Calendar, User, Phone, Mail } from "lucide-react";

const LivePreview = ({ data }) => {
  const formatDate = (date) => {
    return new Date(date || Date.now()).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Stethoscope className="h-5 w-5 text-blue-600" />
          <span>Live Preview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          {/* Header */}
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Healix</h1>
                  <p className="text-sm text-slate-600">Professional Medical Platform</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-lg font-semibold text-slate-900">Dr. Anmol Gupta</h2>
                <p className="text-sm text-slate-600">MBBS, MS — Surgeon</p>
                <p className="text-sm text-slate-600">+91 8604711997</p>
                <p className="text-sm text-blue-600">healixdoctor.in</p>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Patient Information</span>
            </h3>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-slate-700">Name:</span>
                  <p className="text-slate-900">{data.patientName || "—"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-700">Age:</span>
                  <p className="text-slate-900">{data.age || "—"} {data.gender && `(${data.gender.charAt(0).toUpperCase() + data.gender.slice(1)})`}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Phone:</span>
                  <p className="text-slate-900">{data.contactPhone || "—"}</p>
                </div>
                {data.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Email:</span>
                    <p className="text-slate-900">{data.email}</p>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Date:</span>
                <p className="text-slate-900">{formatDate()}</p>
              </div>
            </div>
          </div>

          {/* Symptoms & Diagnosis */}
          {data.symptoms && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Symptoms & Diagnosis</h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-slate-900 whitespace-pre-wrap">{data.symptoms}</p>
              </div>
            </div>
          )}

          {/* Medicines */}
          {data.medicines && data.medicines.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Prescribed Medicines</h3>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Medicine</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Dosage</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Frequency</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {data.medicines.map((medicine, index) => (
                      <tr key={index} className="bg-white">
                        <td className="px-4 py-3 text-sm text-slate-900">{medicine.name || "—"}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{medicine.dosage || "—"}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{medicine.frequency || "—"}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{medicine.duration || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Additional Notes */}
          {data.additionalNotes && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Additional Notes</h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-slate-900 whitespace-pre-wrap">{data.additionalNotes}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t pt-6 mt-8">
            <div className="text-center">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-900">Dr. Anmol Gupta</p>
                <p className="text-sm text-slate-600">MBBS, MS — Surgeon</p>
                <p className="text-sm text-slate-600">+91 8604711997 | healixdoctor.in</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-xs text-slate-600 italic">
                  "Healix is committed to delivering trusted healthcare consultations with care, clarity, and convenience — empowering you to take charge of your health."
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePreview;