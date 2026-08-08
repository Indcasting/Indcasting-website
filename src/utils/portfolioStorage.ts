import { PortfolioData } from "@/types/portfolio";
import { cache } from "./cache";

const PORTFOLIOS_KEY = "indcasting_portfolios";
const PORTFOLIOS_CACHE_KEY = "portfolios_list";

export function getPortfolios(): PortfolioData[] {
  if (typeof window === "undefined") return [];

  const cached = cache.get<PortfolioData[]>(PORTFOLIOS_CACHE_KEY);
  if (cached) return cached;

  const data = localStorage.getItem(PORTFOLIOS_KEY) || "[]";
  const portfolios = JSON.parse(data);

  cache.set(PORTFOLIOS_CACHE_KEY, portfolios, 5);
  return portfolios;
}

export function savePortfolios(portfolios: PortfolioData[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PORTFOLIOS_KEY, JSON.stringify(portfolios));
  cache.remove(PORTFOLIOS_CACHE_KEY);
}

export function getPortfolioByUserId(userId: string): PortfolioData | null {
  const portfolios = getPortfolios();
  return portfolios.find(p => p.userId === userId) || null;
}

export function getPortfolioBySlug(slug: string): PortfolioData | null {
  const portfolios = getPortfolios();
  return portfolios.find(p => p.usernameSlug === slug && p.isPublished) || null;
}

export function saveUserPortfolio(portfolio: PortfolioData) {
  const portfolios = getPortfolios();
  const existingIndex = portfolios.findIndex(p => p.userId === portfolio.userId);
  
  if (existingIndex >= 0) {
    portfolios[existingIndex] = portfolio;
  } else {
    portfolios.push(portfolio);
  }
  
  savePortfolios(portfolios);
}

export function deleteUserPortfolio(userId: string) {
  const portfolios = getPortfolios().filter(p => p.userId !== userId);
  savePortfolios(portfolios);
}

export function generateSlug(name: string): string {
  // Simple slug generation: lowercases, removes non-alphanumeric, spaces to hyphens
  let slug = name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  
  // Ensure uniqueness
  const portfolios = getPortfolios();
  let uniqueSlug = slug;
  let counter = 1;
  while (portfolios.some(p => p.usernameSlug === uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
}
