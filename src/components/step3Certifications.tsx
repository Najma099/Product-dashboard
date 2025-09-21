import React from 'react';
import { FormData } from './productFormWizard';

interface Step3CertificationsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: { [key: string]: string };
}

export const Step3Certifications: React.FC<Step3CertificationsProps> = ({ formData, setFormData, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2">Certification Level *</label>
        <select
          value={formData.certification}
          onChange={e => setFormData({ ...formData, certification: e.target.value as FormData['certification'] })}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="None">Select a level</option>
          <option value="Gold">Gold</option>
          <option value="Platinum">Platinum</option>
          <option value="Silver">Silver</option>
          <option value="Green">Green</option>
        </select>
        {errors.certification && <p className="text-red-500 text-sm">{errors.certification}</p>}
      </div>

      <div>
        <label className="block mb-2">Certification Body *</label>
        <input
          type="text"
          value={formData.certificationBody}
          onChange={e => setFormData({ ...formData, certificationBody: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.certificationBody && <p className="text-red-500 text-sm">{errors.certificationBody}</p>}
      </div>

      <div>
        <label className="block mb-2">Expiry Date *</label>
        <input
          type="date"
          value={formData.expiryDate}
          onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
      </div>
    </div>
  );
};
