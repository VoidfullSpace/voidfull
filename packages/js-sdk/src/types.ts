export interface ClientOptions {
	/**
	 * Defaults to process.env['VOIDFULL_CONTENT_TOKEN'].
	 */
	token?: string;
	siteId: string;
	/**
	 * @default v1
	 */
	voidfullVersion?: string;
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

type Category = {
	id: string;
	name: string;
	slug?: string;
	description?: string;
	icon?: string;
	parentId?: string;
	status: 'active';
	createdAt: Date;
	updatedAt: Date;
};

export type ListCategoriesResponse = Category[];

// ==========
// POSTS
// ==========

export type ListPostsParameteres = RetrieveSiteParameteres;

export type RetrievePostsParameteres = RetrieveSiteParameteres & {
	postId: string;
};

export type ListPostCategoriesParameteres = RetrievePostsParameteres;

type Post = {
	id: string;
	title: string;
	slug: string;
	contentMarkdown: string | null;
	content: string | null;
	featureImage: string | null;
	publishedAt: Date;
	updatedAt: Date;
	timeToRead: number;
	excerpt: string;
};

export type ListPostResponse = Post[];
