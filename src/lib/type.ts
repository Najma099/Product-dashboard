export interface ExtendedProduct {
  id: number;
  name: string;
  category: string;
  certification: string;
  transparencyScore: number;
  riskFlags: number;
  status: string;
  updatedDate: string;
  image?: string;
  ingredients?: string[];
  origin?: string;
  supplier?: string;
  certificationBody?: string;
  expiryDate?: string;
}
