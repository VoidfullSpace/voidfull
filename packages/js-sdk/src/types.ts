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

export type PageInfo = {
	totalCount: number;
	hasNextPage: boolean;
	startCursor?: string;
	endCursor?: string;
};

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

/**
 * @readonly
 * @enum {string}
 */
export enum CategoryStatusEnum {
	draft = 'draft',
	active = 'active'
}

/**
 * This type is derived from the keys of the `CategoryStatusEnum`.
 */
export type CategoryStatus = keyof typeof CategoryStatusEnum;

/**
 * Query parameters for listing categories.
 */
export type ListCategoryQuery = {
	/**
	 * Categories to exclude from the list.
	 */
	exclude?: string | string[];
	/**
	 * Categories to include in the list.
	 */
	include?: string | string[];
	/**
	 * Status filter for the categories. Should be one of the values in `CategoryStatusEnum`.
	 */
	status?: CategoryStatus | CategoryStatus[];
	/**
	 * Optional parameter specifying a starting point for the results.
	 */
	first?: string;
	/**
	 * Optional parameter to paginate results, starting after this cursor.
	 */
	after?: string;
};

/**
 * Parameters for listing categories.
 *
 * @extends {ListCategoryQuery}
 * @extends {Required<RetrieveSiteParameters>}
 */
export type ListCategoryParameters = ListCategoryQuery &
	Required<RetrieveSiteParameters>;

export type Category = {
	id: string;
	name: string;
	slug: string | null;
	description: string | null;
	icon: string | null;
	parentId: string | null;
	status: CategoryStatus;
	createdAt: Date;
	updatedAt: Date | null;
};

export interface ActiveCategory extends Omit<Category, 'slug' | 'status'> {
	slug: string;
	status: CategoryStatusEnum.active;
}

export type ListCategoryResponse = {
	categories: ActiveCategory[];
	pageInfo: PageInfo;
};

// ==========
// POSTS
// ==========

export type ListPostsParameters = RetrieveSiteParameters;

export type RetrievePostParameters = RetrieveSiteParameters & {
	postId: string;
};

export type ListPostCategoriesParameters = RetrievePostParameters;

export type Post = {
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

export type RetrievePostResponse = {
	post: PublishedPost;
};

export type ListPostResponse = {
	posts: PublishedPost[];
};
