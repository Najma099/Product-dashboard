import React, { useState } from 'react';
import { validateStep } from '@/lib/validation';
import AnalyticsModal from './analytics';
import { StepNavigation } from './stepNavigation';
import { Step1BasicInfo } from './step1BasicInfo';
import { Step2Ingredients } from './step2Ingredients';
import { Step3Certifications } from './step3Certifications';
import { Step4Review } from './step4.review';
import { ExtendedProduct } from '@/lib/type';

type CertificationType = "Gold" | "Platinum" | "Silver" | "Green" | "None";

export interface FormData {
  name: string;
  category: string;
  image: File | null;
  ingredients: string[];
  origin: string;
  supplier: string;
  certification: CertificationType;
  certificationBody: string;
  expiryDate: string;
}

export const ProductFormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    image: null,
    ingredients: [''],
    origin: '',
    supplier: '',
    certification: 'None',
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
        image: null,
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 dark:from-background dark:via-background dark:to-primary/5 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
            Add New Product
          </h1>
          <p className="text-muted-foreground">Complete the form to submit your product for transparency analysis</p>
        </div>

        <StepNavigation steps={steps} currentStep={currentStep} />

        <div className="bg-gradient-to-r from-card/40 to-card/20 backdrop-blur-sm border border-border/50 rounded-2xl shadow-xl p-8">
          {renderStepContent()}

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/30">
            <button 
              disabled={currentStep === 1} 
              onClick={handlePrevious}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                  : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground shadow-lg'
              }`}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>

            {currentStep < 4 ? (
              <button 
                onClick={handleNext} 
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-lg font-medium shadow-lg shadow-primary/25 transition-all duration-300"
              >
                Next →
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitted}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary via-primary to-purple-600 hover:from-primary/90 hover:via-primary/90 hover:to-purple-700 text-primary-foreground shadow-lg shadow-primary/25'
                }`}
              >
                {isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Submit Product'
                )}
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
const generatePreviewProduct = (formData: FormData): ExtendedProduct => ({
  id: Math.floor(Math.random() * 1000),
  name: formData.name || 'Product Name',
  category: formData.category || 'Category',
  certification: formData.certification,
  transparencyScore: 80,
  riskFlags: 1,
  status: 'Pending',
  updatedDate: new Date().toISOString().split('T')[0],
  image: formData.image ? URL.createObjectURL(formData.image) : '',
  ingredients: formData.ingredients.filter((i) => i.trim()),
  origin: formData.origin,
  supplier: formData.supplier,
  certificationBody: formData.certificationBody,
  expiryDate: formData.expiryDate
});
