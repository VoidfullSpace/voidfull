import Voidfull from '../src';

const Client = new Voidfull({
	siteId: '<your_voidfull_site_id>',
	token: '<your_voidfull_token_id>'
});

// Site
const site = Client.sites.retrieve();

// Posts
const posts = Client.sites.posts.list();

// Categories
const categories = Client.sites.categories.list({
	status: ['active']
});

export { site, posts, categories };
