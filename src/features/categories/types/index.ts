export interface Service {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any; // Para outros campos que possam vir da API
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  image?: string;
  description?: string;
  section?: 'conveniencia' | 'restaurantes';
  backgroundColor?: string;
  subtitle?: string;
  deliveryTime?: string;
  Service?: Service[];
  _count?: {
    Service: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryListResponse {
  categories: Category[];
}

export interface Promotion {
  id: string;
  label: string;
  value: string;
  color?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: string | number;
  promotions?: Promotion[];
  sponsored?: boolean;
  isSuper?: boolean;
  isFavorite?: boolean;
}

export interface CategoryDetails {
  id: string;
  name: string;
  description?: string;
  image?: string;
  restaurants: Restaurant[];
  filters?: {
    sort?: string[];
    distance?: string[];
  };
}

export interface CategoryDetailsResponse {
  id: string;
  name: string;
  description?: string;
  image?: string;
  restaurants: Restaurant[];
  filters?: {
    sort?: string[];
    distance?: string[];
  };
}




