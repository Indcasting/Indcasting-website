export interface CastingPost {
  id: string;

  userId: string;

  company: string;

  title: string;

  category: string;

  location: string;

  age: string;

  description: string;

  status: "Open" | "Closed";

  createdAt: string;
}