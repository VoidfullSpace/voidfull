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

export type SiteObject = {
	id: string;
	name: string;
	createdAt: string;
};

export type RetrieveSiteParameters = {
	siteId: string;
};

export type RetrieveSiteResponse = {
	site: SiteObject;
};

// ==========
// CATEGORIES
// ==========

export type QueryCategoriesParameters = {
	first: string;
	status: string;
	after: string;
};

export type RetrieveCategoriesParameteres = RetrieveSiteParameters;

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

export type ListPostsParameters = RetrieveSiteParameters;

export type RetrievePostsParameters = RetrieveSiteParameters & {
	postId: string;
};

export type ListPostCategoriesParameters = RetrievePostsParameters;

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
