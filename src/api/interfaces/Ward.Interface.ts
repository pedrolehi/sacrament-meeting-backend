export interface Ward {
  id: string;
  name: string;
  stake: string;
}

export interface WardQuery {
  query?: string | null;
  pageIndex?: string | null | undefined;
}
