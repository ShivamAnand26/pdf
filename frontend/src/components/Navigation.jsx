import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Stethoscope, FileText, Plus } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Healix</h1>
              <p className="text-xs text-slate-600">Professional Medical Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Prescription</span>
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant={location.pathname === "/dashboard" ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </div>

          {/* Doctor Info */}
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">Dr. Anmol Gupta</p>
            <p className="text-xs text-slate-600">MBBS, MS — Surgeon</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;