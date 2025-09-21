import React from 'react';

export const Step4Review = ({ formData, setShowAnalytics }: any) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Review Product Details</h2>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Category:</strong> {formData.category}</p>
        <p><strong>Ingredients:</strong> {formData.ingredients.filter((i:string)=>i).join(', ')}</p>
        <p><strong>Origin:</strong> {formData.origin}</p>
        <p><strong>Supplier:</strong> {formData.supplier}</p>
        <p><strong>Certification:</strong> {formData.certification}</p>
        <p><strong>Certification Body:</strong> {formData.certificationBody}</p>
        <p><strong>Expiry Date:</strong> {formData.expiryDate}</p>
        {formData.image && <img src={formData.image} alt="Preview" className="h-32 w-32 object-cover rounded-lg mt-2" />}
      </div>

      <button 
        type="button" 
        onClick={() => setShowAnalytics(true)} 
        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Show AI Transparency Analysis
      </button>
    </div>
  );
};
