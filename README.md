| index | [DEMO] | [in detail] |
|-------|--------|----|

[DEMO]: docs/demo.md
[in detail]: docs/detail.md

# StructDiff
[![npm version](https://badge.fury.io/js/structdiff.svg)](https://badge.fury.io/js/structdiff)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![7thCode](https://circleci.com/gh/7thCode/structdiff.svg?style=shield)](<LINK>)
![node.js.yml](https://github.com/7thCode/structdiff/actions/workflows/node.js.yml/badge.svg)

Detect **only** differences in the structure of objects.
This is useful for validation.

# Motivation

# DEMO

"StructDiff"の魅力が直感的に伝えわるデモ動画や図解を載せる

# Features

"StructDiff"のセールスポイントや差別化などを説明する

# Requirement

# Installation

Requirementで列挙したライブラリなどのインストール方法を説明する

```bash
npm install structfiff
```

# Usage

### How to use

example
```js
const object1 = {
	children: {
		john: {
			schooling: true, hobby: [{name: "Cycling"}, {name: "Dance", type: "HipHop"}],
			pet: [{type: "dog", name: "Max"}], age: 12
		},
		tom: {
			schooling: false, hobby: [{name: "Squash"}], pet: [{type: "cat", name: "Chloe"}], age: 5
		}
	}
};

const object2 = {
	children: {
		tom: {
			pet: [{type: "cat", name: "Chloe"}], age: 5, schooling: false, hobby: [{name: "Squash"}]
		},
		john: {
			hobby: [{name: "Cycling"}, {name: "Dance", type: "HipHop"}],
			pet: [{name: "Max",type: "dog"}], age: 12, schooling: true
		}
	}
};
```

CommonJS
```ts
const structdiff: any = require("structdiff");

const cjs_detector = new structdiff.StructDiff();

let result:boolean = cjs_detector.isSame(object1, object2, [comp_type]);
```

ESModule
```ts
import {StructDiff} from "structdiff";

const es_detector = new StructDiff();

let result:boolean = es_detector.isSame(object1, object2, [comp_type]);
```
```
comp_type: 
    0: default. Detects differences in structure and value "types".
    1: Detects differences in structure and values.
    2: Only structural differences are detected.
```
### With Handler

CommonJS
```js
const structdiff: any = require("structdiff");

class CJSHandler extends structdiff.DetectHandler {

    constructor() {
        super()
    }

    public compare(s: any, d: any): boolean {
        return ((typeof s) === (typeof d));
    }
}

const cjs_detector = new structdiff.StructDiff(new CJSHandler());
let result:boolean = cjs_detector.isSame(object1, object2);
```

ESModule
```ts
import {DetectHandler, StructDiff} from "structdiff";

class ESHandler extends DetectHandler {

    constructor() {
        super()
    }

    public compare(s: any, d: any): boolean {
        return ((typeof s) === (typeof d));
    }

}

const es_detector = new StructDiff(new ESHandler());
let result:boolean = es_detector.isSame(object1, object2);
```
```
comp_type: ignored.
```
***
### Default
###### Detects differences in structure and value "types".
```js
console.log(detector.isSame({a: 1, b: 1}, {a: 1}))
> false

console.log(detector.isSame({a: 1}, {a: 1, b: 1}))
> false
```
```js
console.log(detector.isSame({a: 1}, {a: 2}, 0))
> true

console.log(detector.isSame({a: 1}, {b: 2}, 0))
> false
```
***
### Strict Mode
###### Detects differences in structure and values.
```js
console.log(detector.isSame({a: 1}, {a: 1}, 1))
> true

console.log(detector.isSame({a: 1}, {a: 2}, 1))
> false
```
***
### Loose Mode
###### Only structural differences are detected.
```js
console.log(detector.isSame({a: 1}, {a: "2"}, 2))
> true

console.log(detector.isSame({a: 1}, {b: "2"}, 2))
> false
```
***
### Array order
###### The difference in the arrangement order is the difference in the structure.
```js
console.log(detector.isSame([{a: 1}, {b: 1}], [{a: 1}, {b: 1}]))
> true

console.log(detector.isSame([{a: 1}, {b: 1}], [{b: 1}, {a: 1}]))
> false
```
***
### Part of the object
###### Of course, some of the objects can also be compared.
```js
console.log(detector.isSame(_origin.children.john, copy.children.john))
> true

console.log(detector.isSame(_origin.children.john, _origin.children.tom))
> false
```
***
### Exceptionally
###### Exceptionally, **[]** and **{}** are the same, as are **0** and **NaN**.
```js
console.log(detector.isSame([], {}))
> true

console.log(detector.isSame(0, NaN))
> true
```

# Note

注意点などがあれば書く

# Author

* 作成者
* 所属
* E-mail

# License

"structdiff" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
