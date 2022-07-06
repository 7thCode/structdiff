const structdiff: any = require("./index");

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

const structure_difference_1 = {
    children: {
        tom: {
            schooling: false,
            hobby: [{name: "Squash"}],
            pet: [{type: "cat", name: "Chloe"}],
            age: 5
        },
        john: {
            schooling: true,
            hobby: [{name: "Cycling"}, {name: "Dance", type: "HipHop"}],
            pet: [{type: "dog", name: "Max"}],
            age: 12
        }
    }
};

const structure_difference_2 = {
    children: {
        tom: {
            schooling: false,
            hobby: [{name: "Squash"}],
            pet: [{type: "cat", name: "Chloe"}],
            age: 5
        },
        john: {
            age: 12,
            schooling: true,
            pet: [{type: "dog", name: "Max"}],
            hobby: [{name: "Cycling"}, {name: "Dance", type: "HipHop"}]
        }
    }
};

class TestHandler extends structdiff.BaseHandler {

    constructor() {
        super();
    }

    public detect(s: any, d: any): boolean {
        console.log(s + " " + d);
         return ((typeof s) === (typeof d));
    }

}


const detector = new structdiff.StrDiffDetector();

test('same structe and value', () => {
    expect(detector.isSame(_origin, copy)).toBe(true);
    expect(detector.isSame(_origin, difference)).toBe(true);
    expect(detector.isSame(_origin, number_difference)).toBe(true);
    expect(detector.isSame(_origin, string_difference)).toBe(true);
    expect(detector.isSame(_origin, boolean_difference)).toBe(true);
});

test('detect value diff(number)', () => {
    expect(detector.isSame(_origin, number_difference, 1)).toBe(false);
    expect(detector.isSame(_origin, string_difference, 1)).toBe(false);
    expect(detector.isSame(_origin, boolean_difference, 1)).toBe(false);
});

test('struct diff()', () => {
    expect(detector.isSame(_origin, structure_difference_1)).toBe(true);
    expect(detector.isSame(_origin, structure_difference_2)).toBe(true);
});

test('same val and struct', () => {
    expect(detector.isSame({a:1}, {a:1})).toBe(true);
});

test('same struct', () => {
    expect(detector.isSame({a:1}, {a:2})).toBe(true);
});

test('diff struct', () => {
    expect(detector.isSame({a:1}, {b:1})).toBe(false);
});

test('def type', () => {
    expect(detector.isSame({a:1}, {a:"1"})).toBe(false);
});

test('detect struct and "value type".', () => {
    expect(detector.isSame({a:1}, {a:2}, 0)).toBe(true);
    expect(detector.isSame({a:1}, {b:2}, 0)).toBe(false);
});

test('detect struct and value.', () => {
    expect(detector.isSame({a:1}, {a:1}, 1)).toBe(true);
    expect(detector.isSame({a:1}, {a:2}, 1)).toBe(false);
});

test('detect only struct.', () => {
    expect(detector.isSame({a:1}, {a:"2"}, 2)).toBe(true);
    expect(detector.isSame({a:1}, {b:"2"}, 2)).toBe(false);
});

test('array.', () => {
    expect(detector.isSame([{a:1}, {b:1}], [{a:1}, {b:1}] )).toBe(true);
    expect(detector.isSame([{a:1}, {b:1}], [{b:1}, {a:1}] )).toBe(false);
});

const handler_detector = new structdiff.StrDiffDetector(new TestHandler());

test('same val and struct', () => {
    expect(handler_detector.isSame({a:1}, {a:1})).toBe(true);
});

test('same struct', () => {
    expect(handler_detector.isSame({a:1}, {a:2})).toBe(true);
});

test('diff struct', () => {
    expect(handler_detector.isSame({a:1}, {b:1})).toBe(false);
});

test('def type', () => {
    expect(handler_detector.isSame({a:1}, {a:"1"})).toBe(false);
});