import type { Pharmacy } from "../types/pharmacy";

export function formatAddress(pharmacy: Pharmacy) {
  return `${pharmacy.street}, ${pharmacy.district} - ${pharmacy.city}/${pharmacy.state}`;
}
