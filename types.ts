
export enum Zone {
  ZONE_1 = "Zone 1 (Winnipeg)",
  ZONE_2 = "Zone 2 (Interlake)",
  ZONE_3 = "Zone 3 (Westman)",
  ZONE_4 = "Zone 4 (Manitoba East)"
}

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface MembershipForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipNumber: string;
  address: Address;
  selectedZone: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
