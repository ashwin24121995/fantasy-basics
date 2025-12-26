/**
 * Shared constants for Fantasy Basics application
 */

// Restricted states as per Indian fantasy sports regulations
export const RESTRICTED_STATES = [
  "Telangana",
  "Andhra Pradesh",
  "Assam",
  "Odisha",
] as const;

export type RestrictedState = typeof RESTRICTED_STATES[number];

// All Indian states for selection
export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export type IndianState = typeof INDIAN_STATES[number];

// Minimum age requirement
export const MINIMUM_AGE = 18;

// Check if a state is restricted
export function isStateRestricted(state: string): boolean {
  return RESTRICTED_STATES.includes(state as RestrictedState);
}

// Calculate age from date of birth
export function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  
  return age;
}

// Validate if user meets age requirement
export function isAgeValid(dateOfBirth: Date): boolean {
  return calculateAge(dateOfBirth) >= MINIMUM_AGE;
}
