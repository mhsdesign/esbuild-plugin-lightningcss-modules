# esbuild-plugin-lightningcss-modules

Yet another (minimal) css modules plugin using parcels rust based lightningcss implementation. (Full support for `composes: mixin from "./mixin.module.css"`)

The plugin is already tested (on linux and mac) and used to build the following bigger project https://github.com/neos/neos-ui with around 100 css modules - it is inlined in the project though to reduce dependencies and maintaining burdens for now.

<details>
<summary>Another css modules plugin for esbuild? Pleaso no? Read more about the "why"...</summary>

Yes sorry, i know there are a few implementions already out there:

- @asn.aeb/esbuild-css-modules-plugin
- esbuild-css-modules-plugin
- esbuild-plugin-css-modules
- esbuild-style-plugin
- esbuild-plugin-simple-css-modules

The problem is, they dindt suit my usecase as i needed support for css modules composes feature https://github.com/css-modules/css-modules#dependencies
`composes: mixin from './mixin.module.css';` 

The above implementations mostly rely on `post-cssmodules` and thus dont sucessfully support composition from dependencies as they suffer from this problem: https://github.com/g45t345rt/esbuild-style-plugin/issues/16 (The webpack css modules plugin goes to great lenghts to archieve it successfully)

With one exception: `esbuild-css-modules-plugin`, this plugin uses also lightningcss as its core, but doesnt support composes yet and due to a more complex inject feature it is a bit more complex. I discussed with the maintainer if we would want to merge our two packages but due to limited time and different usecases (https://github.com/indooorsman/esbuild-css-modules-plugin/issues/53) im here to present my super simple implemented css module plugin for esbuild.

</details>

## Installation

Available on npm: https://www.npmjs.com/package/esbuild-plugin-lightningcss-modules

```
yarn add esbuild-plugin-lightningcss-modules
```

## Usage

```js
const {cssModules} = require('esbuild-plugin-lightningcss-modules');
const {build} = require('esbuild');

build({
    ...,
    plugins: [
        cssModules(
            {
                // Add your own or other plugins in the "visitor" section see
                // https://lightningcss.dev/transforms.html
                // visitor: myLightningcssPlugin(),
                targets: {
                    chrome: 80 // aligns somewhat to es2020
                },
                drafts: {
                    nesting: true
                },
                // You can set here your own settings for cssModules
                // https://lightningcss.dev/css-modules.html#local-css-variables
                // https://lightningcss.dev/css-modules.html#custom-naming-patterns
                // cssModules: {
                //    dashedIdents: true,
                //    pattern: 'my-company-[name]-[hash]-[local]'
                // },
            }
        )
    ]
})
```

for further details look into: https://lightningcss.dev/css-modules.html

## Advanced options
### `includeFilter` and `excludeFilter`
These options only exist for odd / legacy codebases.
Normally it is asummed that your css module files end with `.module.css`.
If this is not the case, and they end with `.css` while you still want to exclude certain normal css from beeing treated as css module you can leverage the two filters like this:

```js
includeFilter: /\.css$/,
excludeFilter: /@fortawesome\/fontawesome-svg-core\/|my-normal-css-file\.css|normalize\.css/,
```
