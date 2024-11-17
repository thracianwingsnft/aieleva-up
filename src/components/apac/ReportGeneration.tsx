import React from 'react';
import { Download, FileText, Share2 } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function ReportGeneration() {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add content to PDF
    doc.setFontSize(20);
    doc.text('APAC Market Expansion Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 30);
    
    // Save the PDF
    doc.save('apac-market-expansion-report.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Report</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-indigo-600 mr-2" />
                <div>
                  <h4 className="font-medium text-gray-900">Comprehensive Report</h4>
                  <p className="text-sm text-gray-500">Complete analysis with all data points</p>
                </div>
              </div>
              <button
                onClick={generatePDF}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Download className="h-4 w-4 mr-1" />
                Generate
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Share2 className="h-6 w-6 text-indigo-600 mr-2" />
                <div>
                  <h4 className="font-medium text-gray-900">Executive Summary</h4>
                  <p className="text-sm text-gray-500">Key insights and recommendations</p>
                </div>
              </div>
              <button
                onClick={generatePDF}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Download className="h-4 w-4 mr-1" />
                Generate
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-2">Recent Reports</h4>
          <div className="space-y-2">
            {[
              { name: 'APAC_Market_Analysis_2024Q1.pdf', date: '2024-03-15' },
              { name: 'Market_Entry_Strategy_v2.pdf', date: '2024-03-10' },
              { name: 'Competitor_Analysis_2024.pdf', date: '2024-03-05' },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">{report.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{report.date}</span>
                  <button className="text-indigo-600 hover:text-indigo-700">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}