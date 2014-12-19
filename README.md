mnemo.js
========

A Javascript Implementation of Rufus::Mnemo

Usage
-----

```javascript
var mnemo = require('mnemo');
mnemo.fromInteger(12345);
// => 'bineka'
mnemo.toInteger('bineka');
// => 12345
mnemo.isMnemoWord('bineka');
// => true
```
