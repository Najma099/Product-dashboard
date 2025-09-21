import React from 'react';

interface StepNavigationProps {
  steps: { number: number; title: string; icon: string }[];
  currentStep: number;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8 px-4">
      <div className="flex items-center justify-between w-full max-w-2xl">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-shrink-0">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
                  step.number <= currentStep 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.number <= currentStep ? (
                  step.number < currentStep ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    <span className="text-xl">{step.icon}</span>
                  )
                ) : (
                  <span className="text-xl">{step.icon}</span>
                )}
              </div>
              <div 
                className={`mt-2 text-sm font-medium text-center transition-colors duration-300 ${
                  step.number <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step.title}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 flex items-center px-4">
                <div 
                  className={`h-0.5 w-full transition-colors duration-300 ${
                    step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} 
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};