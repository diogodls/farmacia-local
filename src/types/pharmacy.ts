export type Medicine = {
  id: string;
  name: string;
  category: string;
  dosage: string;
  description: string;
  type?: string;
  component?: string | null;
  pharmaceuticalForm?: string | null;
  presentation?: string | null;
  active?: boolean;
  pharmacyIds?: string[];
  cids?: Array<{
    codigo: string;
    descricao: string;
    categoria: string | null;
  }>;
  pharmacies?: PharmacySummary[];
};

export type Pharmacy = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  street: string;
  district: string;
  city: string;
  state: string;
  phone: string;
  openingHours: string;
  medicineIds: string[];
  type?: string | null;
  institution?: string | null;
  medicines?: Medicine[];
};

export type PharmacySummary = {
  id: string;
  name: string;
  city: string;
  state: string;
  district: string;
  street: string;
  type?: string | null;
  institution?: string | null;
  origem?: string;
};
