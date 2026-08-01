export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  role: "talent" | "seeker";
  bio?: string;
}