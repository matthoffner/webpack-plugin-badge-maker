const assetMatch = (assets, entry) => assets.find(asset => entry.indexOf(asset) > -1);

console.log(assetMatch(['vendors'], '/dist/vendors.123.js'));