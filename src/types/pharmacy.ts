export type Medicine = {
  id: string;
  name: string;
  category: string;
  dosage: string;
  description: string;
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
};
