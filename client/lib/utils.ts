import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the backend API URL based on the environment.
 * - In Codespaces: uses the public forwarded port for backend 4000
 * - Otherwise: defaults to http://localhost:4000
 */
export function getBackendApiUrl(): string {
  // Check if running in Codespaces
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Codespaces hostname pattern: *.app.github.dev
    if (hostname.includes('.app.github.dev')) {
      // Extract the codespace name and construct the backend URL
      // Frontend runs on port 3000, backend on port 4000
      const backendUrl = hostname.replace('-3000', '-4000');
      return `https://${backendUrl}`;
    }
  }
  
  // Default to localhost for local development
  return 'http://localhost:4000';
}