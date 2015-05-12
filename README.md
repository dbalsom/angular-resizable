# angular-resizable-db
A directive for creating resizable elements.
Based on the angular-resizable directive by Reklino (http://github.com/Reklino/angular-resizable).

## Why?

Reklino's original directive was 90% of what I needed, but I didn't want my resize directive to add DOM elements.
Instead, this version allows the resizing handle element to be specified by a `handle` attribute.
The downside is you have to provide your own handle element, but it allows for greater customization.

Additionally, a css style `resize-handle` is provided that can decorate your handle with pseudo-elements.

## Usage

1. `bower install angular-resizable-db`. Or don't, because I probably never registered this.
2. Include `angular-resizable.js` in your project.
3. Include `angular-resizable.css` in your project if you want to use the grabber decorations
4. Then include the module in your app: `angular.module('app', ['angularResizable'])`
5. Apply the resizable attribute to the element you want to resize: `<div resizable>`
6. Tag the child element you wish to use as the resize grabber, supplying type: `<div handle="bottom|right|bottomright">`

## Differences from the original

- Directive now requires jQuery, oh dear.
- Flexbox support is removed. I didn't need it, sorry.
- Only right, bottom, and bottomright handles are supported.

## Example

See the included example.html for some demonstration uses.

## License

MIT
