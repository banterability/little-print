# little-print

[![Latest Version](https://img.shields.io/npm/v/little-print.svg)](https://www.npmjs.com/package/little-print)

A dependency-free wrapper for [Nord Projects' Device Keys API for Little Printer](https://littleprinter.nordprojects.co/).

## Usage

Instantiate a `LittlePrint` class:

```javascript
import LittlePrint from "little-print";

const printer = new LittlePrint({
  deviceKey: "abcd1234", // required
  appName: "README", // optional
});
```

Your `deviceKey` is everything following `device.li/` on Nord Projects' Device Keys website.

### `printHTML(html: String)`

Prints a provided HTML document.

#### Input

```javascript
await printer.printHTML(`
  <em>*slaps roof of printer*</em>
  <h1>You can fit</h1>
  <ul>
    <li>so</li>
    <li>much</li>
    <li>markup</li>
  </ul>
  <h2>in this bad boy!</h2>
`);
// returns {statusCode, headers, body}, if you care
```

#### Output

![output of `printHTML` example](https://github.com/banterability/little-print/blob/main/docs/printHTML-output.png?raw=true)

### `printImage(path: Path)`

Prints a GIF, JPEG, or PNG image.

#### Input

```javascript
await printer.printImage("./first_time.jpg");
// returns {statusCode, headers, body}
```

#### Output

![output of `printImage` example](https://github.com/banterability/little-print/blob/main/docs/printImage-output.png?raw=true)

### `printText(text: String)`

Prints a provided string.

#### Input

```javascript
await printer.printText(
  `The story begins in any of the three dozen taquerias supplying the Bay Area Feeder Network, an expansive spiderweb of tubes running through San Francisco's Mission district as far south as the "Burrito Bordeaux" region of Palo Alto and Mountain View.`,
);
// returns {statusCode, headers, body}
```

#### Output

![output of `printText` example](https://github.com/banterability/little-print/blob/main/docs/printText-output.png?raw=true)
