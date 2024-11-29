export interface RequestItem {
  id: string;
  title: string;
  author: string;
  createdAt: number;
  published: boolean;
  auction: boolean;
}

export interface ApiResponse extends RequestData {
  totalItems: number;
  totalPages: number;
  items: RequestItem[];
}

export interface RequestData {
  currentPage: number;
  limit: number;
}
