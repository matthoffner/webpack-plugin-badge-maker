const { makeBadge } = require('badge-maker');
const fs = require('fs');

const assetMatch = (assets, entry) => assets.find(asset => entry.indexOf(asset) > -1);

class BundleSizeBadgePlugin {
    constructor({ assets = [], options = {} }) {
        this.assets = assets;
        this.options = {
            label: options.label || 'size',
            color: options.color || 'green',
            svgDir: options.svgDir || './dist/',
            extension: options.extension || 'js'
        };
    }

    apply(compiler) {
        compiler.hooks.done.tap('BundleSizeBadgePlugin', ({ compilation }) =>
            Object.values(compilation.assets).forEach(tracked => {
                if (tracked.existsAt.endsWith(`.${this.options.extension}`)) {
                    const badgeName = assetMatch(this.assets, tracked.existsAt);
                    if (badgeName) {
                        fs.writeFileSync(
                            `${this.options.svgDir}${badgeName}.svg`,
                            makeBadge({
                                label: this.options.label,
                                message: `${(tracked._value.length / 1000).toFixed(2)}kb`,
                                color: this.options.color
                            })
                        );
                    }
                }
                
            })
        );
    }
}

module.exports.BundleSizeBadgePlugin = BundleSizeBadgePlugin;
