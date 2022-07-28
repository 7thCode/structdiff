 [README]　[DEMO]　[in detail]

original
```ts
const _origin = {
    children: {
        john: {
            schooling: true,
            hobby: [{name: "Cycling"}, {name: "Dance", type: "HipHop"}],
            pet: [{type: "dog", name: "Max"}],
            age: 12
        },
        tom: {
            schooling: false,
            hobby: [{name: "Squash"}],
            pet: [{type: "cat", name: "Chloe"}],
            age: 5
        }
    }
};
```
same.
```ts
const copy = {
    children: {
        john: {
            schooling: true,
            hobby: [{name: "Cycling"}, {name: "Dance", type: "HipHop"}],
            pet: [{type: "dog", name: "Max"}],
            age: 12
        },
        tom: {
            schooling: false,
            hobby: [{name: "Squash"}],
            pet: [{type: "cat", name: "Chloe"}],
            age: 5
        }
    }
};
```
If the order is different, it is judged to be the same as the original.
```ts
const difference = {
    children: {
        tom: {
            age: 8,
            schooling: true,
            hobby: [{name: "Football"}],
            pet: [{type: "cat", name: "Chloe"}],
        },
        john: {
            pet: [{type: "dog", name: "Max"}],
            hobby: [{name: "Cycling"}, {name: "Dance", type: "HipHop"}],
            age: 12,
            schooling: true,
        }
    }
};
```
If the primitive values are different, it is judged to be the same as the original.
```ts
const number_difference = {
    children: {
        john: {
            schooling: true,
            hobby: [{name: "Cycling"}, {name: "Dance", type: "HipHop"}],
            pet: [{type: "dog", name: "Max"}],
            age: 13
        },
        tom: {
            schooling: false,
            hobby: [{name: "Squash"}],
            pet: [{type: "cat", name: "Chloe"}],
            age: 5
        }
    }
};
```
If the primitive values are different, it is judged to be the same as the original.
```ts
const string_difference = {
    children: {
        john: {
            schooling: true,
            hobby: [{name: "Cycling"}, {name: "Dance", type: "HipHop"}],
            pet: [{type: "dog", name: "Max"}],
            age: 12
        },
        tom: {
            schooling: false,
            hobby: [{name: "Squash"}],
            pet: [{type: "cat", name: "Lily"}],
            age: 5
        }
    }
};
```
If the primitive values are different, it is judged to be the same as the original.
```ts
const boolean_difference = {
    children: {
        john: {
            schooling: true,
            hobby: [{name: "Cycling"}, {name: "Dance", type: "HipHop"}],
            pet: [{type: "dog", name: "Max"}],
            age: 12
        },
        tom: {
            schooling: true,
            hobby: [{name: "Squash"}],
            pet: [{type: "cat", name: "Lily"}],
            age: 5
        }
    }
};
```
CommonJS
```ts
describe('structdiff(CommonJS)', () => {

    const {DetectHandler,StructDiff} = require('./index')

    class CJSHandler extends DetectHandler {

        constructor() {
            super()
        }

        public compare(s: any, d: any): boolean {
            return ((typeof s) === (typeof d));
        }

    }

    const cjs_detector = new StructDiff(new CJSHandler());

    it('CommonJS', () => {
        expect(cjs_detector.isSame(_origin, copy)).toBe(true);
        expect(cjs_detector.isSame(_origin.children.john, copy.children.john)).toBe(true);
        expect(cjs_detector.isSame(_origin.children.john, _origin.children.tom)).toBe(false);
        expect(cjs_detector.isSame(_origin.children.john.hobby[0], _origin.children.john.hobby[1])).toBe(false);
        expect(cjs_detector.isSame(_origin, difference)).toBe(true);
        expect(cjs_detector.isSame(_origin, number_difference)).toBe(true);
        expect(cjs_detector.isSame(_origin, string_difference)).toBe(true);
        expect(cjs_detector.isSame(_origin, boolean_difference)).toBe(true);
    });
});
```
ESModule
```ts
describe('structdiff(ESModule)', () => {

    class ESHandler extends DetectHandler {

        constructor() {
            super()
        }

        public compare(s: any, d: any): boolean {
            return ((typeof s) === (typeof d));
        }

    }

    const es_detector = new StructDiff(new ESHandler());

    it('ES Modules', () => {
        expect(es_detector.isSame(_origin, copy)).toBe(true);
        expect(es_detector.isSame(_origin.children.john, copy.children.john)).toBe(true);
        expect(es_detector.isSame(_origin.children.john, _origin.children.tom)).toBe(false);
        expect(es_detector.isSame(_origin.children.john.hobby[0], _origin.children.john.hobby[1])).toBe(false);
        expect(es_detector.isSame(_origin, difference)).toBe(true);
        expect(es_detector.isSame(_origin, number_difference)).toBe(true);
        expect(es_detector.isSame(_origin, string_difference)).toBe(true);
        expect(es_detector.isSame(_origin, boolean_difference)).toBe(true);
    });
});
```
```ts
describe('structdiff', () => {

    /*
    comp_type:
        0: default. 構造と値の「タイプ」の違いを検出します。
        1: strict.  構造と値の違いを検出します。
        2: loose.   構造の違いのみが検出されます。
    */

    const detector = new StructDiff();

    it('same structe and value', () => {

        expect(detector.isSame(_origin, copy)).toBe(true);
        expect(detector.isSame(_origin.children.john, copy.children.john)).toBe(true);
        expect(detector.isSame(_origin.children.john, _origin.children.tom)).toBe(false);
        expect(detector.isSame(_origin.children.john.hobby[0], _origin.children.john.hobby[1])).toBe(false);
        expect(detector.isSame(_origin, difference)).toBe(true);
        expect(detector.isSame(_origin, number_difference)).toBe(true);
        expect(detector.isSame(_origin, string_difference)).toBe(true);
        expect(detector.isSame(_origin, boolean_difference)).toBe(true);

        expect(detector.isSame({}, {})).toBe(true);
        expect(detector.isSame({}, [])).toBe(true);
        expect(detector.isSame({}, "")).toBe(false);
        expect(detector.isSame({}, 0)).toBe(false);
        expect(detector.isSame({}, false)).toBe(false);
        expect(detector.isSame({}, null)).toBe(false);
        expect(detector.isSame({}, NaN)).toBe(false);
        expect(detector.isSame({}, undefined)).toBe(false);

        expect(detector.isSame([], {})).toBe(true);
        expect(detector.isSame([], [])).toBe(true);
        expect(detector.isSame([], "")).toBe(false);
        expect(detector.isSame([], 0)).toBe(false);
        expect(detector.isSame([], false)).toBe(false);
        expect(detector.isSame([], null)).toBe(false);
        expect(detector.isSame([], NaN)).toBe(false);
        expect(detector.isSame([], undefined)).toBe(false);

        expect(detector.isSame("", {})).toBe(false);
        expect(detector.isSame("", [])).toBe(false);
        expect(detector.isSame("", "")).toBe(true);
        expect(detector.isSame("", 0)).toBe(false);
        expect(detector.isSame("", false)).toBe(false);
        expect(detector.isSame("", null)).toBe(false);
        expect(detector.isSame("", NaN)).toBe(false);
        expect(detector.isSame("", undefined)).toBe(false);

        expect(detector.isSame(0, {})).toBe(false);
        expect(detector.isSame(0, [])).toBe(false);
        expect(detector.isSame(0, "")).toBe(false);
        expect(detector.isSame(0, 0)).toBe(true);
        expect(detector.isSame(0, false)).toBe(false);
        expect(detector.isSame(0, null)).toBe(false);
        expect(detector.isSame(0, NaN)).toBe(true);
        expect(detector.isSame(0, undefined)).toBe(false);

        expect(detector.isSame(false, {})).toBe(false);
        expect(detector.isSame(false, [])).toBe(false);
        expect(detector.isSame(false, "")).toBe(false);
        expect(detector.isSame(false, 0)).toBe(false);
        expect(detector.isSame(false, false)).toBe(true);
        expect(detector.isSame(false, null)).toBe(false);
        expect(detector.isSame(false, NaN)).toBe(false);
        expect(detector.isSame(false, undefined)).toBe(false);

        expect(detector.isSame(null, {})).toBe(false);
        expect(detector.isSame(null, [])).toBe(false);
        expect(detector.isSame(null, "")).toBe(false);
        expect(detector.isSame(null, 0)).toBe(false);
        expect(detector.isSame(null, false)).toBe(false);
        expect(detector.isSame(null, null)).toBe(false);
        expect(detector.isSame(null, NaN)).toBe(false);
        expect(detector.isSame(null, undefined)).toBe(false);

        expect(detector.isSame(NaN, {})).toBe(false);
        expect(detector.isSame(NaN, [])).toBe(false);
        expect(detector.isSame(NaN, "")).toBe(false);
        expect(detector.isSame(NaN, 0)).toBe(true);
        expect(detector.isSame(NaN, false)).toBe(false);
        expect(detector.isSame(NaN, null)).toBe(false);
        expect(detector.isSame(NaN, NaN)).toBe(true);
        expect(detector.isSame(NaN, undefined)).toBe(false);

        expect(detector.isSame(undefined, {})).toBe(false);
        expect(detector.isSame(undefined, [])).toBe(false);
        expect(detector.isSame(undefined, "")).toBe(false);
        expect(detector.isSame(undefined, 0)).toBe(false);
        expect(detector.isSame(undefined, false)).toBe(false);
        expect(detector.isSame(undefined, null)).toBe(false);
        expect(detector.isSame(undefined, NaN)).toBe(false);
        expect(detector.isSame(undefined, undefined)).toBe(false);

    });

    it('detect value diff(number)', () => {
        expect(detector.isSame(_origin, number_difference, 1)).toBe(false);
        expect(detector.isSame(_origin, string_difference, 1)).toBe(false);
        expect(detector.isSame(_origin, boolean_difference, 1)).toBe(false);
    });
    
    it('same val and struct', () => {
        expect(detector.isSame({a: 1}, {a: 1})).toBe(true);
    });

    it('same struct', () => {
        expect(detector.isSame({a: 1}, {a: 2})).toBe(true);
    });

    it('diff struct', () => {
        expect(detector.isSame({a: 1}, {b: 1})).toBe(false);
    });

    it('def type.', () => {
        expect(detector.isSame({a: 1}, {a: "1"})).toBe(false);
    });

    it('extra attr.', () => {
        expect(detector.isSame({a: 1, b: 1}, {a: 1})).toBe(false);
        expect(detector.isSame({a: 1}, {a: 1, b: 1})).toBe(false);
    });

    it('detect struct and "value type".', () => {
        expect(detector.isSame({a: 1}, {a: 2}, 0)).toBe(true);
        expect(detector.isSame({a: 1}, {b: 2}, 0)).toBe(false);
    });

    it('detect struct and value.', () => {
        expect(detector.isSame({a: 1}, {a: 1}, 1)).toBe(true);
        expect(detector.isSame({a: 1}, {a: 2}, 1)).toBe(false);
    });

    it('detect only struct.', () => {
        expect(detector.isSame({a: 1}, {a: "2"}, 2)).toBe(true);
        expect(detector.isSame({a: 1}, {b: "2"}, 2)).toBe(false);
    });

    it('array.', () => {
        expect(detector.isSame([{a: 1}, {b: 1}], [{a: 1}, {b: 1}])).toBe(true);
        expect(detector.isSame([{a: 1}, {b: 1}], [{b: 1}, {a: 1}])).toBe(false);
    });

    it('array.', () => {
        expect(detector.isSame([{a: 1}, {b: 1}], [{a: 1}, {b: 1}])).toBe(true);
        expect(detector.isSame([{a: 1}, {b: 1}], [{b: 1}, {a: 1}])).toBe(false);

        expect(detector.isSame([0], [1], 0)).toBe(true);
        expect(detector.isSame([0], [0], 1)).toBe(true);
        expect(detector.isSame([0], ["1"], 2)).toBe(true);
    });

    it('except. (Object is Array. NaN is Number...)', () => {
        expect(detector.isSame({}, [])).toBe(true);
        expect(detector.isSame([], {})).toBe(true);
        expect(detector.isSame(0, NaN)).toBe(true);
        expect(detector.isSame(NaN, 0)).toBe(true);
    });

    const array1 = [{a: "1", b: 1}, {a: 1, b: 1}];

    const array2 = [1, 2];

    it('array.', () => {
        expect(detector.isSame(array1[0], array1[1])).toBe(false);
        expect(detector.isSame(array1[0], array1[1], 1)).toBe(false);
        expect(detector.isSame(array1[0], array1[1], 2)).toBe(true);

        expect(detector.isSame(array2[0], array2[1])).toBe(true)　// typeof 1 === typeof 2
        expect(detector.isSame(array2[0], array2[1], 1)).toBe(false);
        expect(detector.isSame(array2[0], array2[1], 2)).toBe(true);
    });

});
```
with handler.
```ts
describe('structdiff(with handler)', () => {

    class TestHandler extends DetectHandler {

        constructor() {
            super()
        }

        public compare(s: any, d: any): boolean {
            return ((typeof s) === (typeof d));
        }

    }

    const detector_with_handler = new StructDiff(new TestHandler());

    it('same structe and value', () => {
        expect(detector_with_handler.isSame(_origin, copy)).toBe(true);
        expect(detector_with_handler.isSame(_origin.children.john, copy.children.john)).toBe(true);
        expect(detector_with_handler.isSame(_origin.children.john, _origin.children.tom)).toBe(false);
        expect(detector_with_handler.isSame(_origin.children.john.hobby[0], _origin.children.john.hobby[1])).toBe(false);
        expect(detector_with_handler.isSame(_origin, difference)).toBe(true);
        expect(detector_with_handler.isSame(_origin, number_difference)).toBe(true);
        expect(detector_with_handler.isSame(_origin, string_difference)).toBe(true);
        expect(detector_with_handler.isSame(_origin, boolean_difference)).toBe(true);
    });

    it('struct diff()', () => {
        expect(detector_with_handler.isSame(_origin, structure_difference_1)).toBe(true);
        expect(detector_with_handler.isSame(_origin, structure_difference_2)).toBe(true);
    });

    it('same val and struct', () => {
        expect(detector_with_handler.isSame({a: 1}, {a: 1})).toBe(true);
    });

    it('same struct', () => {
        expect(detector_with_handler.isSame({a: 1}, {a: 2})).toBe(true);
    });

    it('diff struct', () => {
        expect(detector_with_handler.isSame({a: 1}, {b: 1})).toBe(false);
    });

    it('def type.', () => {
        expect(detector_with_handler.isSame({a: 1}, {a: "1"})).toBe(false);
    });

    it('extra attr.', () => {
        expect(detector_with_handler.isSame({a: 1, b: 1}, {a: 1})).toBe(false);
        expect(detector_with_handler.isSame({a: 1}, {a: 1, b: 1})).toBe(false);
    });

});
```

[README]: README.md
[DEMO]: docs/demo.md
[in detail]: docs/detail.md