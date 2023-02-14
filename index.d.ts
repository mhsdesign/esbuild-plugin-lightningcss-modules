import { TransformOptions } from 'lightningcss';

export type Options = {
    includeFilter: RegExp,
    excludeFilter?: RegExp,
    visitor?: TransformOptions["visitor"],
    targets: TransformOptions["targets"]
}

export function esbuildComposesFromCssModules(options: Options): import("esbuild").Plugin;
