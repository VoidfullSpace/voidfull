<p align="center">
  <a href="https://voidfull.com">
    <img src="https://voidfull.com/favicon.svg" height="96">
  </a>
  <h3 align="center">Voidfull</h3>
</p>

<p align="center">
    Effortless content management with Voidfull.
</p>

<p align="center">
  <a href="https://voidfull.com"><strong>Voidfull</strong></a> ·
  <a href="https://github.com/voidfull-templates"><strong>Templates</strong></a>
</p>
<br/>

### Usage

First, you need to install the library:

```bash
# npm
npm install @voidfull/js-sdk

# yarn
yarn add @voidfull/js-sdk

# pnpm
pnpm install @voidfull/js-sdk
```

Then you're able to import the library and fetch posts and categories from Voidfull.

```bash
import Voidfull from "@voidfull/js-sdk";

const Client = new Voidfull({
    siteId: '<your_voidfull_site_id>',
    token: '<your_voidfull_token_id>'
});
```
