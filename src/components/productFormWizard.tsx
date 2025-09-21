import React, { useState } from 'react';
import { validateStep } from '@/lib/schema';
import AnalyticsModal from './analytics';
import { StepNavigation } from './stepNavigation';
import { Step1BasicInfo } from './step1BasicInfo';
import { Step2Ingredients } from './step2Ingredients';
import { Step3Certifications } from './step3Certifications';
import { Step4Review } from './step4.review';
import { ExtendedProduct } from '@/lib/type';

export const ProductFormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '',
    ingredients: [''],
    origin: '',
    supplier: '',
    certification: 'None' as "Gold" | "Platinum" | "Silver" | "Green" | "None",
    certificationBody: '',
    expiryDate: ''
  });

  const steps = [
    { number: 1, title: 'Basic Info', icon: '📋' },
    { number: 2, title: 'Ingredients', icon: '🌿' },
    { number: 3, title: 'Certifications', icon: '🏆' },
    { number: 4, title: 'Review', icon: '✅' }
  ];

  const handleNext = () => {
    const validation = validateStep(currentStep, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      alert('Product submitted successfully!');
      setIsSubmitted(false);
      setCurrentStep(1);
      setFormData({
        name: '',
        category: '',
        image: '',
        ingredients: [''],
        origin: '',
        supplier: '',
        certification: 'None',
        certificationBody: '',
        expiryDate: ''
      });
    }, 2000);
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1: return <Step1BasicInfo formData={formData} setFormData={setFormData} errors={errors} />;
      case 2: return <Step2Ingredients formData={formData} setFormData={setFormData} errors={errors} />;
      case 3: return <Step3Certifications formData={formData} setFormData={setFormData} errors={errors} />;
      case 4: return <Step4Review formData={formData} setShowAnalytics={setShowAnalytics} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 text-black">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">Complete the form to submit your product for transparency analysis</p>
        </div>

        {/* Step Navigation */}
        <StepNavigation steps={steps} currentStep={currentStep} />

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderStepContent()}

          {/* Navigation Buttons - CORRECTED */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button 
              disabled={currentStep === 1} 
              onClick={handlePrevious}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </div>

            {currentStep < 4 ? (
              <button 
                onClick={handleNext} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next →
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitted}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  isSubmitted
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                {isSubmitted ? 'Processing...' : 'Submit Product'}
              </button>
            )}
          </div>
        </div>
      </div>

      <AnalyticsModal 
        isVisible={showAnalytics} 
        onClose={() => setShowAnalytics(false)} 
        product={generatePreviewProduct(formData)} 
      />
    </div>
  );
};

// Helper for preview
const generatePreviewProduct = (formData: any): ExtendedProduct => ({
  id: Math.floor(Math.random() * 1000),
  name: formData.name || 'Product Name',
  category: formData.category || 'Category',
  certification: formData.certification as "None" | "Gold" | "Platinum" | "Silver" | "Green",
  transparencyScore: 80,
  riskFlags: 1,
  status: 'Pending',
  updatedDate: new Date().toISOString().split('T')[0],
  image: formData.image,
  ingredients: formData.ingredients.filter((i:string) => i.trim()),
  origin: formData.origin,
  supplier: formData.supplier,
  certificationBody: formData.certificationBody,
  expiryDate: formData.expiryDate
});