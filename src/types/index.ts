export interface SearchParams {
  searchText?: string;
  pageIndex: number;
  pageSize: number;
  status?: string;
  sortBy?: string;
  createFrom?: string;
  createTo?: string;
  ascending?: boolean;

  [key: string]: any;
}

export interface ListResponse<T> {
  content: T[];
  pageable: {
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface DeleteType<T> {
  id: T | T[];
}
