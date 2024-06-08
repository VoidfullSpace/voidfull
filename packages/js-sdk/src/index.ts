import { getPackageVersion } from './utils';
import type {
	ClientOptions,
	RequestParams,
	RetrieveCategoriesParameteres,
	ListPostsParameteres,
	RetrieveSiteParameteres,
	RetrievePostsParameteres,
	ListPostCategoriesParameteres,
	RetrieveSiteResponse,
	ListCategoriesResponse,
	ListPostResponse
} from './types';

export default class Voidfull {
	readonly apiBaseUrl = 'https://api.voidfull.codecarrot.net/api';

	private siteId: string;
	private token?: string | undefined;

	constructor({ siteId, token }: ClientOptions) {
		this.siteId = siteId;

		if (token) {
			this.token = token;
		} else {
			this.token = process.env['VOIDFULL_CONTENT_TOKEN'];
		}
	}

	public readonly sites = {
		/**
		 * Retrieve site info.
		 */
		retrieve: (
			{ siteId }: RetrieveSiteParameteres = {
				siteId: this.siteId
			}
		): Promise<RetrieveSiteResponse> => {
			return this.request({
				prefixUrl: `${this.apiBaseUrl}/v1/sites/${siteId}`,
				method: 'GET'
			});
		},

		categories: {
			/**
			 * List categories of a site.
			 */
			list: (
				{ siteId }: RetrieveCategoriesParameteres = {
					siteId: this.siteId
				}
			): Promise<ListCategoriesResponse[]> => {
				return this.request({
					prefixUrl: `${this.apiBaseUrl}/v1/sites/${siteId}/category`,
					method: 'GET'
				});
			}
		},

		posts: {
			list: (
				{ siteId }: ListPostsParameteres = {
					siteId: this.siteId
				}
			): Promise<ListPostResponse[]> => {
				return this.request({
					prefixUrl: `${this.apiBaseUrl}/v1/sites/${siteId}/posts`,
					method: 'GET'
				});
			},

			retieve: ({
				siteId = this.siteId,
				postId
			}: RetrievePostsParameteres): Promise<ListPostResponse> => {
				return this.request({
					prefixUrl: `${this.apiBaseUrl}/v1/sites/${siteId}/posts/${postId}`,
					method: 'GET'
				});
			},

			categories: {
				list: ({
					siteId = this.siteId,
					postId
				}: ListPostCategoriesParameteres) => {
					return this.request({
						prefixUrl: `${this.apiBaseUrl}/v1/sites/${siteId}/posts/${postId}/category`,
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

			return response.json();
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
