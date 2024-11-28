export interface Request {
  id: string;
  title: string;
  author: string;
  createdAt: number;
  published: false;
  auction: false;
}

export interface Response extends RequestData {
  totalItems: number;
  totalPages: number;
  items: Request[];
}

export interface RequestData {
  currentPage: number;
  limit: number;
}
