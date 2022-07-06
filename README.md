# structdiff

# Detect differences in the structure of objects.

```js

const structdiff: any = require("./index");

const detector = new structdiff.StrDiffDetector();

const result:boolean = detector.isSame(object1, object2, [comp_type]);

```
```
comp_type: 
    0: default. Detects differences in structure and value "types".
    1: Detects differences in structure and values.
    2: Only structural differences are detected.
    
    The difference in the arrangement order is the difference in the structure.

```

```js

const structdiff: any = require("structdiff");

class TestHandler extends structdiff.BaseHandler {
    
    constructor() {
        super();
    }

    // all "value" compare.
    public detect(s: any, d: any): boolean {
         return ((typeof s) === (typeof d)); // custom diff. same is true.
    }

} 

const detector = new structdiff.StrDiffDetector(new TestHandler());

const result:boolean =  detector.isSame(object1, object2);

```
```
comp_type: ignored.
```

## Detects differences in structure and value "types".

```js
console.log(structdiff.isSame({a: 1}, {a: 2}, 0));

> true

console.log(structdiff.isSame({a: 1}, {b: 2}, 0));

> false
```

## Detects differences in structure and values.

```js
console.log(structdiff.isSame({a: 1}, {a: 1}, 1));

> true

console.log(structdiff.isSame({a: 1}, {a: 2}, 1));

> false
```

# Only structural differences are detected.

```js
console.log(structdiff.isSame({a: 1}, {a: "2"}, 2));

> true

console.log(structdiff.isSame({a: 1}, {b: "2"}, 2));

> false
```

# The difference in the arrangement order is the difference in the structure.

```js
console.log(structdiff.isSame([{a: 1}, {b: 1}], [{a: 1}, {b: 1}]));

> true

console.log(structdiff.isSame([{a: 1}, {b: 1}], [{b: 1}, {a: 1}]));

> false
```