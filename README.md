mnemo.js
========

A Javascript Implementation of Rufus::Mnemo (https://github.com/jmettraux/rufus-mnemo)

Installation
------------
```
> npm i --save mnemo
```

Usage
-----

```javascript
> var mnemo = require('mnemo');
> mnemo.fromInteger(12345);
// => 'bineka'
> mnemo.toInteger('bineka');
// => 12345
> mnemo.isMnemoWord('bineka');
// => true
```
