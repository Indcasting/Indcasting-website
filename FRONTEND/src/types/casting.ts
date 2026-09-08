export interface CastingPost {
  id: string;

  userId: string;

  company: string;

  title: string;

  category: string;

  role: string;

  gender: string;

  age: string;

  height: string;

  languages: string;

  experience: string;

  location: string;

  shootStartDate: string;

  shootEndDate: string;

  budget: string;

  vacancies: number;

  applicationDeadline: string;

  description: string;

  status: "Open" | "Closed";

  createdAt: string;
}