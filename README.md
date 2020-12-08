# webpack-plugin-badge-maker

Plugin for creating badges using [badge-maker](https://www.npmjs.com/package/badge-maker). Currently scoped to measuring bundle size.

```js
const { BundleSizeBadgePlugin } = require('webpack-plugin-badge-maker');

new BundleSizeBadgePlugin({
    assets: ['vendors', 'main'], // generates vendors.svg and main.svg
    options: {
        label: 'size', // default
        color: 'green', // default
        svgDir: './dist/' // default
    }
});
```


