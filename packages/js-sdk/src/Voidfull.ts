import { getPackageVersion } from './utils';
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
	RetrievePostResponse
} from './types';

export default class Voidfull {
	readonly apiBaseUrl = 'https://api.app.voidfull.com';

	private readonly voidfullVersion: string;
	private readonly defaultVoidfullVersion: string = 'v1';
	private readonly siteId: string;
	private readonly token?: string | undefined;

	constructor({ siteId, voidfullVersion, token }: ClientOptions) {
		this.siteId = siteId;
		this.voidfullVersion = voidfullVersion ?? this.defaultVoidfullVersion;

		if (token) {
			this.token = token;
			// biome-ignore lint/complexity/useLiteralKeys: Property VOIDFULL_CONTENT_TOKEN comes from an index signature,
		} else if (process.env?.['VOIDFULL_CONTENT_TOKEN']) {
			// biome-ignore lint/complexity/useLiteralKeys: Property VOIDFULL_CONTENT_TOKEN comes from an index signature,
			this.token = process.env['VOIDFULL_CONTENT_TOKEN'];
		} else {
			throw Error('Failed to authorise');
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
			list: (
				{ siteId }: ListCategoryParameters = {
					siteId: this.siteId
				}
			): Promise<ListCategoryResponse> => {
				return this.request({
					prefixUrl: `${this.apiBaseUrl}/${this.voidfullVersion}/sites/${siteId}/category`,
					method: 'GET'
				});
			}
		},

		posts: {
			list: (args?: ListPostsParameters): Promise<ListPostResponse[]> => {
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
