
export type PagedResult<T> = {
  data: T[]
  pageNumber: number
  totalCount: number
  pageSize: number
  pageCount: number
}

export interface Company {
  id: string;
  code: string;
  companyName: string;
  licenceRequestStatus: string;
  licenceStatus: string;
  address: string;
  phoneNumber: string;
  imageUrl: string;
  companyCapital: number;
}

