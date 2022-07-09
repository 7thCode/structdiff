# structdiff

## Detect differences in the structure of objects.

### How to use
```js

const structdiff: any = require("structdiff");

const detector = new structdiff.StrDiffDetector();

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

let result:boolean = detector.isSame(object1, object2, [comp_type]);
```
```
comp_type: 
    0: default. Detects differences in structure and value "types".
    1: Detects differences in structure and values.
    2: Only structural differences are detected.
```
### With Handler
```js

const structdiff: any = require("structdiff");


// compare(s: any, d: any): boolean
class TestHandler {

	constructor() {
	}

	// all "value" compare.
	public compare(s: any, d: any): boolean {
		return ((typeof s) === (typeof d)); // custom diff. same is true.
	}

}

const detector = new structdiff.StrDiffDetector(new TestHandler());

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

let result:boolean = detector.isSame(object1, object2);
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