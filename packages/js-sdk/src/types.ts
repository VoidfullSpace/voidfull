export interface ClientOptions {
  /**
   * Defaults to process.env['VOIDFULL_CONTENT_TOKEN'].
   */
  token?: string;
  siteId: string;
}

type QueryParams = Record<string, string | number | string[]> | URLSearchParams;

export interface RequestParams {
  prefixUrl: string;
  method: string;
  query?: QueryParams;
}

// ==========
// SITES
// ==========

export type RetrieveSiteParameteres = {
  siteId: string;
};

export type RetrieveSiteResponse = {
  id: string;
  name: string;
  createdAt: string;
};

// ==========
// CATEGORIES
// ==========

export type QueryCategoriesParameteres = {
  first: string;
  status: string;
  after: string;
};

export type RetrieveCategoriesParameteres = RetrieveSiteParameteres;

// ==========
// POSTS
// ==========

export type ListPostsParameteres = RetrieveSiteParameteres;

export type RetrievePostsParameteres = RetrieveSiteParameteres & {
  postId: string;
};

export type ListPostCategoriesParameteres = RetrievePostsParameteres;
