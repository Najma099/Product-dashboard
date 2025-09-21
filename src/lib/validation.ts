import { FormData } from '../components/productFormWizard'

export const validateStep = (step: number, data: FormData) => {
  const errors: { [key: string]: string } = {};

  switch (step) {
    case 1:
      if (!data.name?.trim()) errors.name = 'Product name is required';
      if (!data.category?.trim()) errors.category = 'Category is required';
      if (!data.image) errors.image = 'Product image is required';
      break;

    case 2:
      if (!data.ingredients?.length || data.ingredients.every(i => !i.trim())) {
        errors.ingredients = 'At least one ingredient is required';
      }
      if (!data.origin?.trim()) errors.origin = 'Origin country is required';
      if (!data.supplier?.trim()) errors.supplier = 'Supplier information is required';
      break;

    case 3:
      if (!data.certification || data.certification === 'None') {
        errors.certification = 'Please select a certification level';
      }
      if (!data.certificationBody?.trim()) errors.certificationBody = 'Certification body is required';
      if (!data.expiryDate) errors.expiryDate = 'Expiry date is required';
      break;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};
