
export enum Brand {
  SONY = 'Sony',
  CANON = 'Canon',
  FUJIFILM = 'Fujifilm',
  LEICA = 'Leica',
  NIKON = 'Nikon',
  SIGMA = 'Sigma',
  VILTROX = 'Viltrox',
  CARL_ZEISS = 'Carl Zeiss',
  GODOX = 'Godox',
  NEEWER = 'Neewer'
}

export enum Category {
  CAMERA = 'Máy ảnh',
  LENS = 'Ống kính',
  ACCESSORY = 'Phụ kiện'
}

export enum SensorType {
  FULL_FRAME = 'Full Frame',
  APS_C = 'APS-C',
  MEDIUM_FORMAT = 'Medium Format',
  MICRO_FOUR_THIRDS = 'Micro 4/3',
  NA = 'N/A'
}

export interface ProductSpecs {
  iso?: string;
  shutterSpeed?: string;
  focusSystem?: string;
  videoRes?: string;
  weight?: string;
  dimensions?: string;
  battery?: string;
  storage?: string;
  mount?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  image: string;
  sensor: SensorType;
  resolution?: string; // e.g., "61MP"
  releaseYear?: number; // New field
  description: string;
  features: string[];
  specs?: ProductSpecs; // Detailed specs
  isNew?: boolean;
  isBestSeller?: boolean;
  videoUrl?: string; // Youtube Embed URL
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  content: string[]; // Array of paragraphs for the modal
}

export interface FilterState {
  brand: Brand | null;
  category: Category | null;
  minPrice: number;
  maxPrice: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
