export interface Category {
    createdAt: string | null;
    id: string | null;
    name: string | null;
    Service: Service[] | null;
    updatedAt: string | null;
  }
  
  export interface Service {
    categoryId: string | null;
    createdAt: string | null;
    description: string | null;
    id: string | null;
    name: string | null;
    updatedAt: string | null;
  }