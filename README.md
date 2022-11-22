# little-print

A dependency-free wrapper for [Nord Projects' Device Keys API for Little Printer](https://littleprinter.nordprojects.co/).

## Usage

Instantiate a `LittlePrint` class:

```javascript
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
printer.printHTML(`
  <em>*slaps roof of printer*</em>
  <h1>You can fit</h1>
  <ul>
    <li>so</li>
    <li>much</li>
    <li>markup</li>
  </ul>
  <h2>in this bad boy!</h2>
`);
```

#### Output

![output of `printHTML` example](https://github.com/banterability/little-print/blob/master/docs/printHTML-output.png?raw=true)

### `printText(text: String)`

Prints a provided string.

#### Input

```javascript
printer.printText(
  `The story begins in any of the three dozen taquerias supplying the Bay Area Feeder Network, an expansive spiderweb of tubes running through San Francisco's Mission district as far south as the "Burrito Bordeaux" region of Palo Alto and Mountain View.`
);
```

#### Output

![output of `printText` example](https://github.com/banterability/little-print/blob/master/docs/printText-output.png?raw=true)
