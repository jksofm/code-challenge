export interface RequestItem {
  id: string;
  title: string;
  author: string;
  createdAt: number;
  published: false;
  auction: false;
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
