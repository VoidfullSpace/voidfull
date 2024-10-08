import { getEnv, getPackageVersion } from './utils';
import type {
	ClientOptions,
	RequestParams,
	ListCategoryParameters,
	ListPostsParameters,
	RetrieveSiteParameters,
	RetrievePostParameters,
	ListPostCategoriesParameters,
	RetrieveSiteResponse,
	ListCategoryResponse,
	ListPostResponse,
	RetrievePostResponse,
	RetrieveCategoryParameters,
	RetrieveCategoryResponse,
	ListCategoryPostsParameters,
	ListCategoryPostsResponse,
	RetrievePostBySlugParameters,
	RetrievePostBySlugResponse
} from './types';

export default class Voidfull {
	readonly apiBaseUrl = 'https://api.app.voidfull.com/api';

	private readonly voidfullVersion: string;
	private readonly defaultVoidfullVersion: string = 'v1';
	private readonly siteId: string;
	private readonly token?: string | undefined;

	constructor({ siteId, voidfullVersion, token }: ClientOptions) {
		this.siteId = siteId;
		this.voidfullVersion = voidfullVersion ?? this.defaultVoidfullVersion;

		if (token) {
			this.token = token;
		} else if (getEnv('VOIDFULL_CONTENT_TOKEN')) {
			this.token = getEnv('VOIDFULL_CONTENT_TOKEN');
		}
	}

	public readonly sites = {
		/**
		 * Retrieve site info.
		 */
		retrieve: (
			{ siteId }: RetrieveSiteParameters = {
				siteId: this.siteId
			}
		): Promise<RetrieveSiteResponse> => {
			return this.request({
				prefixUrl: `${this.apiBaseUrl}/${this.voidfullVersion}/sites/${siteId}`,
				method: 'GET'
			});
		},

		categories: {
			/**
			 * List categories of a site.
			 */
			list: (args?: ListCategoryParameters): Promise<ListCategoryResponse> => {
				const argsObject = Object.assign({}, args);
				if (!args?.siteId) {
					argsObject.siteId = this.siteId;
				}

				return this.request({
					prefixUrl: `${this.apiBaseUrl}/${this.voidfullVersion}/sites/${argsObject.siteId}/category`,
					method: 'GET',
					query: {
						status: args?.status,
						include: args?.include,
						exclude: args?.exclude,
						first: args?.first,
						after: args?.after
					}
				});
			},

			retrieve: ({
				siteId = this.siteId,
				categoryId
			}: RetrieveCategoryParameters): Promise<RetrieveCategoryResponse> => {
				return this.request({
					prefixUrl: `${this.apiBaseUrl}/${this.voidfullVersion}/sites/${siteId}/category/${categoryId}`,
					method: 'GET'
				});
			},

			posts: ({
				siteId = this.siteId,
				categoryId
			}: ListCategoryPostsParameters): Promise<ListCategoryPostsResponse> => {
				return this.request({
					prefixUrl: `${this.apiBaseUrl}/${this.voidfullVersion}/sites/${siteId}/category/${categoryId}/posts`,
					method: 'GET'
				});
			}
		},

		posts: {
			list: (args?: ListPostsParameters): Promise<ListPostResponse> => {
				const argsObject = Object.assign({}, args);
				if (!args?.siteId) {
					argsObject.siteId = this.siteId;
				}

				return this.request({
					prefixUrl: `${this.apiBaseUrl}/${this.voidfullVersion}/sites/${argsObject.siteId}/posts`,
					method: 'GET'
				});
			},

			retrieve: ({
				siteId = this.siteId,
				postId
			}: RetrievePostParameters): Promise<RetrievePostResponse> => {
				return this.request({
					prefixUrl: `${this.apiBaseUrl}/${this.voidfullVersion}/sites/${siteId}/posts/${postId}`,
					method: 'GET'
				});
			},

			slug: ({
				siteId = this.siteId,
				postSlug
			}: RetrievePostBySlugParameters): Promise<RetrievePostBySlugResponse> => {
				return this.request({
					prefixUrl: `${this.apiBaseUrl}/${this.voidfullVersion}/sites/${siteId}/posts/slug/${postSlug}`,
					method: 'GET'
				});
			},

			categories: {
				list: ({
					siteId = this.siteId,
					postId
				}: ListPostCategoriesParameters): Promise<ListCategoryResponse> => {
					return this.request({
						prefixUrl: `${this.apiBaseUrl}/${this.voidfullVersion}/sites/${siteId}/posts/${postId}/category`,
						method: 'GET'
					});
				}
			}
		}
	};

	private async request<ResponseBody>({
		prefixUrl,
		method,
		query
	}: RequestParams): Promise<ResponseBody> {
		const headers = {
			'User-Agent': this.getUserAgent(),
			'Content-Type': 'application/json',
			Authorization: `Bearer ${this.token}`
		};

		const url = new URL(prefixUrl);
		if (query) {
			for (const [key, value] of Object.entries(query)) {
				if (value !== undefined) {
					if (Array.isArray(value)) {
						// biome-ignore lint/complexity/noForEach: <explanation>
						value.forEach((val) =>
							url.searchParams.append(key, decodeURIComponent(val))
						);
					} else {
						url.searchParams.append(key, String(value));
					}
				}
			}
		}

		try {
			const response = await fetch(url, {
				headers,
				method
			});

			return (await response.json()) as ResponseBody;
		} catch (error: unknown) {
			throw error;
		}
	}

	/**
	 * Get package version.
	 *
	 * @returns string
	 */
	private getUserAgent(): string {
		const version = getPackageVersion();
		return `Voidfull/JS-SDK ${version}`;
	}
}
