import React from 'react';

interface FormData {
  name: string;
  category: string;
  image: string;
  ingredients: string[];
  origin: string;
  supplier: string;
  certification: "Gold" | "Platinum" | "Silver" | "Green" | "None";
  certificationBody: string;
  expiryDate: string;
}

interface Step1BasicInfoProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: { [key: string]: string };
}

export const Step1BasicInfo: React.FC<Step1BasicInfoProps> = ({ formData, setFormData, errors }) => {
  const categories = [
    'Beverages',
    'Food & Snacks', 
    'Health & Wellness',
    'Personal Care',
    'Household',
    'Baby & Kids',
    'Pet Care',
    'Supplements'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: FormData) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData((prev: FormData) => ({ ...prev, image: e.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev: FormData) => ({ ...prev, image: '' }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Basic Product Information</h3>
        <p className="text-gray-600">Let's start with the essential details about your product</p>
      </div>

      {/* Product Name */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input 
          type="text" 
          value={formData.name} 
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="Enter your product name"
        />
        {errors.name && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {errors.name}
          </div>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Product Category <span className="text-red-500">*</span>
        </label>
        <select 
          value={formData.category} 
          onChange={(e) => handleInputChange('category', e.target.value)}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {errors.category}
          </div>
        )}
      </div>

      {/* Product Image */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Product Image <span className="text-red-500">*</span>
        </label>
        <div className={`border-2 border-dashed rounded-xl transition-all ${
          errors.image ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
        }`}>
          {formData.image ? (
            <div className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <img 
                    src={formData.image} 
                    alt="Product preview" 
                    className="w-48 h-48 object-cover rounded-xl shadow-lg border-4 border-white"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">Image uploaded successfully!</p>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="text-red-600 hover:text-red-700 text-sm font-medium mt-1"
                  >
                    Remove and upload different image
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div className="text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Upload Product Image</h4>
                  <p className="text-sm text-gray-500">Choose a clear, high-quality image of your product</p>
                </div>
                <label className="cursor-pointer">
                  <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Choose Image
                  </span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload} 
                  />
                </label>
                <p className="text-xs text-gray-400 mt-3">Supported formats: JPG, PNG, GIF • Max size: 5MB</p>
              </div>
            </div>
          )}
        </div>
        {errors.image && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {errors.image}
          </div>
        )}
      </div>
    </div>
  );
};