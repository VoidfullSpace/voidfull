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
	siteId?: string;
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

export type RetrievePostParameters = RetrieveSiteParameters & {
	postId: string;
};

export type ListPostCategoriesParameters = RetrievePostParameters;

type Post = {
	id: string;
	title: string;
	slug: string | null;
	contentMarkdown: string | null;
	content: string | null;
	featureImage: string | null;
	publishedAt: Date | null;
	timeToRead: number;
	excerpt: string;
	updatedAt: Date | null;
};

/**
 * Interface representing a published post.
 *
 * @extends {Omit<Post, 'slug' | 'publishedAt'>}
 *
 * This interface includes the following properties:
 *
 * @property {string} slug - The unique URI where the post can be accessed.
 * @property {Date} publishedAt - The date and time when the post was published.
 */
interface PublishedPost extends Omit<Post, 'slug' | 'publishedAt'> {
	slug: string;
	publishedAt: Date;
}

export type RetrievePostResponse = PublishedPost;

export type ListPostResponse = PublishedPost[];
