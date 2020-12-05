const { makeBadge } = require('badge-maker');
const fs = require('fs');

export class BundleSizeBadgePlugin {
    constructor({ assets = [], options = {} }) {
        this.assets = assets;
        this.options = {
            label: options.label || 'size',
            color: options.color || 'green',
            svgDir: options.svgDir || './dist/'
        };
    }

    apply(compiler) {
        compiler.hooks.done.tap('BundleSizeBadgePlugin', ({ compilation }) =>
            Object.values(compilation.assets).forEach(tracked => {
                const badgeName = this.assets.some(
                    asset => tracked.existsAt.endsWith('.js') && asset.match(tracked.existsAt)
                );
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
            })
        );
    }
}

export default BundleSizeBadgePlugin;
