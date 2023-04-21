/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {DetectHandler, StructDiff} from "./index";

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

const same1 = {
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

const same2 = {
	children: {
		tom: {
			schooling: false,
			hobby: [{name: "Squash"}],
			pet: [{name: "Chloe",type: "cat"}],
			age: 5
		},
		john: {
			age: 12,
			hobby: [{name: "Cycling"}, {type: "HipHop", name: "Dance"}],
			schooling: true,
			pet: [{type: "dog", name: "Max"}],
		}
	}
};

const same3 = {
    children: {
        tom: {
            age: 8,
            schooling: true,
            hobby: [{name: "Football"}],
            pet: [{type: "gecko", name: "ninjya"}],
        },
        john: {
            pet: [{type: "monkey", name: "Pu"}],
            hobby: [{name: "Baseball"}, {name: "Dance", type: "Braiking"}],
            age: 12,
            schooling: true,
        }
    }
};

const same4 = {
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

const same5 = {
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

const same6 = {
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

const same7 = {
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

const same8 = {
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

const diff1 = {
	children: {
		tom: {
			schooling: 1,
			hobby: [{name: "Squash"}],
			pet: [{type: "cat", name: "Chloe"}],
			age: "5"
		},
		john: {
			age: 12,
			schooling: true,
			pet: [{type: "dog", name: "Max"}],
			hobby: [{name: "Cycling"}, {name: "Dance", type: "HipHop"}]
		}
	}
};

/*
*
* CommonJS
*
* */
describe('structdiff(CommonJS)', () => {

    const {DetectHandler,StructDiff} = require('./index')

    class Handler extends DetectHandler {

        constructor() {
            super()
        }

        public compare(s: any, d: any): boolean {
            return ((typeof s) === (typeof d));
        }

    }

    const detector = new StructDiff(new Handler());

    it('CommonJS', () => {
        expect(detector.isSame(_origin, same1)).toBe(true);
        expect(detector.isSame(_origin.children.john, same1.children.john)).toBe(true);
		expect(detector.isSame(_origin, same2)).toBe(true);
		expect(detector.isSame(_origin.children.john, same2.children.john)).toBe(true);
        expect(detector.isSame(_origin.children.john, _origin.children.tom)).toBe(false);
        expect(detector.isSame(_origin.children.john.hobby[0], _origin.children.john.hobby[1])).toBe(false);
        expect(detector.isSame(_origin, same3)).toBe(true);
        expect(detector.isSame(_origin, same4)).toBe(true);
        expect(detector.isSame(_origin, same5)).toBe(true);
        expect(detector.isSame(_origin, same6)).toBe(true);
		expect(detector.isSame(_origin, diff1,2)).toBe(false); // Prefer evaluation in handlers over type parameters.
    });
});

/*
*
* ESModules
*
* */
describe('structdiff(ESModule)', () => {

    class Handler extends DetectHandler {

        constructor() {
            super()
        }

        public compare(s: any, d: any): boolean {
            return ((typeof s) === (typeof d));
        }

    }

    const es_detector = new StructDiff(new Handler());

    it('ES Modules', () => {
        expect(es_detector.isSame(_origin, same1)).toBe(true);
        expect(es_detector.isSame(_origin.children.john, same1.children.john)).toBe(true);
		expect(es_detector.isSame(_origin, same2)).toBe(true);
		expect(es_detector.isSame(_origin.children.john, same2.children.john)).toBe(true);
        expect(es_detector.isSame(_origin.children.john, _origin.children.tom)).toBe(false);
        expect(es_detector.isSame(_origin.children.john.hobby[0], _origin.children.john.hobby[1])).toBe(false);
        expect(es_detector.isSame(_origin, same3)).toBe(true);
        expect(es_detector.isSame(_origin, same4)).toBe(true);
        expect(es_detector.isSame(_origin, same5)).toBe(true);
        expect(es_detector.isSame(_origin, same6)).toBe(true);
    });
});

describe('structdiff', () => {

    /*
    comp_type:
        0: default. 構造と値の「タイプ」の違いを検出します。
        1: strict.  構造と値の違いを検出します。
        2: loose.   構造の違いのみが検出されます。
    */

    const detector = new StructDiff();

    it('same structe and value', () => {

        expect(detector.isSame(_origin, same1)).toBe(true);
        expect(detector.isSame(_origin.children.john, same1.children.john)).toBe(true);
		expect(detector.isSame(_origin, same2)).toBe(true);
		expect(detector.isSame(_origin.children.john, same2.children.john)).toBe(true);
        expect(detector.isSame(_origin.children.john, _origin.children.tom)).toBe(false);
        expect(detector.isSame(_origin.children.john.hobby[0], _origin.children.john.hobby[1])).toBe(false);
        expect(detector.isSame(_origin, same3, 0)).toBe(true);
		expect(detector.isSame(_origin, same3, 1)).toBe(false);
		expect(detector.isSame(_origin, same3, 2)).toBe(true);
        expect(detector.isSame(_origin, same4)).toBe(true);
        expect(detector.isSame(_origin, same5)).toBe(true);
        expect(detector.isSame(_origin, same6)).toBe(true);

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
        expect(detector.isSame(_origin, same4, 1)).toBe(false);
        expect(detector.isSame(_origin, same5, 1)).toBe(false);
        expect(detector.isSame(_origin, same6, 1)).toBe(false);
    });

    it('struct diff()', () => {
        expect(detector.isSame(_origin, same7)).toBe(true);
        expect(detector.isSame(_origin, same8)).toBe(true);
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
        expect(detector_with_handler.isSame(_origin, same1)).toBe(true);
        expect(detector_with_handler.isSame(_origin.children.john, same1.children.john)).toBe(true);
		expect(detector_with_handler.isSame(_origin, same2)).toBe(true);
		expect(detector_with_handler.isSame(_origin.children.john, same2.children.john)).toBe(true);
        expect(detector_with_handler.isSame(_origin.children.john, _origin.children.tom)).toBe(false);
        expect(detector_with_handler.isSame(_origin.children.john.hobby[0], _origin.children.john.hobby[1])).toBe(false);
        expect(detector_with_handler.isSame(_origin, same3)).toBe(true);
        expect(detector_with_handler.isSame(_origin, same4)).toBe(true);
        expect(detector_with_handler.isSame(_origin, same5)).toBe(true);
        expect(detector_with_handler.isSame(_origin, same6)).toBe(true);
    });

    it('struct diff()', () => {
        expect(detector_with_handler.isSame(_origin, same7)).toBe(true);
        expect(detector_with_handler.isSame(_origin, same8)).toBe(true);
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

const input =  {
		"_id":  "63c606cbedaaea9f17e8c27e",
		"enabled": true,
		"name": "23-01-17 11:24:11",
		"user_id": "611dbca07e8ef04625ce1505",
		"platform": {
			"type": 0,
			"_public": false,
			"scope": 0,
			"description": {
				"club": 1,
				"score": 70.5,
				"postureScore": 59,
				"ballisticScore": 82,
				"studio": "studio1",
				"sites": "site1",
				"message": "",
				"like": false
			},
			"files": {
				"sm": {
					"video1": [
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/movie.mp4",
							"description": "side"
						}
					],
					"video2": [
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/movie2.mp4",
							"description": "back"
						}
					],
					"image1": [
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a0.png",
							"description": "address"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a1.png",
							"description": "backswing"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a2.png",
							"description": "top"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a3.png",
							"description": "halfdown"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a4.png",
							"description": "impact"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a5.png",
							"description": "follow"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a6.png",
							"description": "finish"
						}
					]
				}
			},
			"username": "manager@gmail.com",
			"content": {
				"mails": [],
				"nickname": "manager",
				"id": "a56145270ce6b3bebd1dd012b73948677dd618d496488bc608a3cb43ce3547dd",
				"description": "ユーザの追加変更削除が可能。",
				"image": "",
				"stripe_id": "",
				"friends": [],
				"height": 2,
				"experience": 2,
				"score": 100,
				"driver": 101,
				"seveniron": 0,
				"rounds": 10,
				"practice": 0,
				"handicap": 0,
				"facebook_id": "",
				"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaF90b2tlbiIsImV4cCI6MTY3OTQ2NTQ0MywidXNlcl9pZCI6IjYxMWRiY2EwN2U4ZWYwNDYyNWNlMTUwNSJ9.vTdard2gfFxAA8eyjusEVJYtA8KyAR1K7Rq6-XS0F8o",
				"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjc5NjU4MDQxLCJ1c2VyX2lkIjoiNjExZGJjYTA3ZThlZjA0NjI1Y2UxNTA1In0.oza-iBpkbKSv0n7fP1Wx66ayvZMPgl8YV7lWy5UkicA"
			}
		},
		"prizm": {
			"ClubType": "LONG_IRON",
			"DataList": [
				{
					"Name": "トータル",
					"Unit": "Yard",
					"Value": 240.6
				},
				{
					"Name": "トータルブレ",
					"Unit": "Yard",
					"Value": -10
				},
				{
					"Name": "キャリー",
					"Unit": "Yard",
					"Value": 230.9
				},
				{
					"Name": "キャリーブレ",
					"Unit": "Yard",
					"Value": -20
				},
				{
					"Name": "ヘッドスピード",
					"Unit": "m/s",
					"Value": 200
				},
				{
					"Name": "ボール初速",
					"Unit": "m/s",
					"Value": 120.7
				},
				{
					"Name": "ミート率",
					"Unit": "",
					"Value": 10
				},
				{
					"Name": "打ち出し角 上下",
					"Unit": "度",
					"Value": 5.1
				},
				{
					"Name": "打ち出し角 左右",
					"Unit": "度",
					"Value": 3.5
				},
				{
					"Name": "バックスピン",
					"Unit": "rpm",
					"Value": -672.8
				},
				{
					"Name": "サイドスピン",
					"Unit": "rpm",
					"Value": -149.4
				},
				{
					"Name": "ブロー角",
					"Unit": "度",
					"Value": 20
				},
				{
					"Name": "ヘッド軌道",
					"Unit": "度",
					"Value": 30
				},
				{
					"Name": "フェイス角",
					"Unit": "度",
					"Value": 20
				}
			]
		},
		"sm": {
			"前傾角度": {
				"address": {
					"frame": 30,
					"metrics": 30.462885755068655,
					"unit": "°",
					"criterion": 34,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": 27.84564012928042,
					"unit": "°",
					"criterion": 34,
					"level": "Good"
				},
				"top": {
					"frame": 86,
					"metrics": 25.84135144450915,
					"unit": "°",
					"criterion": 34,
					"level": "Bad"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 25.29329599130874,
					"unit": "°",
					"criterion": 38,
					"level": "Terrible"
				},
				"impact": {
					"frame": 108,
					"metrics": 24.44342767183044,
					"unit": "°",
					"criterion": 40,
					"level": "Terrible"
				},
				"follow": {
					"frame": 116,
					"metrics": 19.83852280141767,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"背骨の傾き": {
				"address": {
					"frame": 30,
					"metrics": 0.6972709104804584,
					"unit": "°",
					"criterion": -1,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": -9.14082587884874,
					"unit": "°",
					"criterion": -1,
					"level": "Terrible"
				},
				"top": {
					"frame": 86,
					"metrics": -6.600129208664068,
					"unit": "°",
					"criterion": -1,
					"level": "Terrible"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -8.20681816858033,
					"unit": "°",
					"criterion": -5,
					"level": "Bad"
				},
				"impact": {
					"frame": 108,
					"metrics": -8.174673242715206,
					"unit": "°",
					"criterion": -8,
					"level": "Excellent"
				},
				"follow": {
					"frame": 116,
					"metrics": -4.1264463132117815,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"首元の動き": {
				"address": {
					"frame": 30,
					"metrics": 0,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": -9.273393879173877,
					"unit": "cm",
					"criterion": -1,
					"level": "Terrible"
				},
				"top": {
					"frame": 86,
					"metrics": -10.719302334857396,
					"unit": "cm",
					"criterion": -1,
					"level": "Terrible"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -7.878804048267702,
					"unit": "cm",
					"criterion": -1,
					"level": "Bad"
				},
				"impact": {
					"frame": 108,
					"metrics": -7.73311363961588,
					"unit": "cm",
					"criterion": -1,
					"level": "Terrible"
				},
				"follow": {
					"frame": 116,
					"metrics": 9.502447068998022,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"右腰の動き": {
				"address": {
					"frame": 30,
					"metrics": 12.660299263197995,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 12.556511408224868,
					"unit": "°",
					"criterion": 7,
					"level": "Terrible"
				},
				"top": {
					"frame": 86,
					"metrics": 13.236249493843982,
					"unit": "°",
					"criterion": 7,
					"level": "Terrible"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 14.465396813508569,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": 16.499109501372168,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"左腰の動き": {
				"address": {
					"frame": 30,
					"metrics": 12.484568081005335,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 13.835992388797264,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 17.54036787873258,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 9.642401809638908,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": 6.688904641835042,
					"unit": "°",
					"criterion": 4,
					"level": "Good"
				},
				"follow": {
					"frame": 116,
					"metrics": 5.94863139878199,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"重心の動き_正面": {
				"address": {
					"frame": 30,
					"metrics": 0,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": -1.1908643204891707,
					"unit": "cm",
					"criterion": -1,
					"level": "Bad"
				},
				"top": {
					"frame": 86,
					"metrics": -3.1000188722968547,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 1.9637100708288124,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"impact": {
					"frame": 108,
					"metrics": 6.21207073364564,
					"unit": "cm",
					"criterion": -1,
					"level": "Good"
				},
				"follow": {
					"frame": 116,
					"metrics": 6.790367721873045,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"右膝の角度": {
				"address": {
					"frame": 30,
					"metrics": 23.917085761508332,
					"unit": "°",
					"criterion": 17,
					"level": "Good"
				},
				"backswing": {
					"frame": 60,
					"metrics": 10.123441833049649,
					"unit": "°",
					"criterion": 21,
					"level": "Terrible"
				},
				"top": {
					"frame": 86,
					"metrics": 13.787076187809912,
					"unit": "°",
					"criterion": 23,
					"level": "Bad"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 7.194529115078759,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": 7.811108668431483,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": 19.12568209802982,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": 21.457108170351578,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"手元の浮き": {
				"address": {
					"frame": 30,
					"metrics": 0,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": 12.97437522966982,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 60.821360897809654,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 27.212979505388546,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": 13.873295027389402,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"follow": {
					"frame": 116,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"左膝の角度": {
				"address": {
					"frame": 30,
					"metrics": 21.236383783640605,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 22.922710824045154,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 24.418168560259097,
					"unit": "°",
					"criterion": 31,
					"level": "Good"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 23.718573131451443,
					"unit": "°",
					"criterion": 30,
					"level": "Good"
				},
				"impact": {
					"frame": 108,
					"metrics": 16.751905640431175,
					"unit": "°",
					"criterion": 19,
					"level": "Excellent"
				},
				"follow": {
					"frame": 116,
					"metrics": 20.727903260367135,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"頭の動き": {
				"address": {
					"frame": 30,
					"metrics": 0,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": -9.190896598191058,
					"unit": "cm",
					"criterion": -1,
					"level": "Bad"
				},
				"top": {
					"frame": 86,
					"metrics": -13.924062090077385,
					"unit": "cm",
					"criterion": -1,
					"level": "Terrible"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -7.7200435361468305,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"impact": {
					"frame": 108,
					"metrics": -6.940688102763845,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"follow": {
					"frame": 116,
					"metrics": 0.42537814637162974,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"両肩の傾き_正面": {
				"address": {
					"frame": 30,
					"metrics": -6.324087915218015,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 2.7968135022555307,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 35.39376437957012,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 0.4129428745448065,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": -14.043811262449125,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": -39.81951477929043,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"重心の動き_後方": {
				"address": {
					"frame": 30,
					"metrics": 0,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 3.583785416618773,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 4.819310325976007,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 6.30564510877411,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": 7.527084791611951,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"グリップ位置": {
				"address": {
					"frame": 30,
					"metrics": 30.505409858538137,
					"unit": "cm",
					"criterion": -1,
					"level": "Bad"
				},
				"backswing": {
					"frame": 60,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"手首軌道": {
				"address": {
					"frame": 30,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 84.55040016841743,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 74.44256428608811,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"腰の開き": {
				"address": {
					"frame": 30,
					"metrics": -19.02465344496846,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": -28.63574256575372,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": -51.2332092700866,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -32.20033340628316,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": -20.313560021304255,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": 27.153346771287517,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": 42.22504339302543,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"肩の開き": {
				"address": {
					"frame": 30,
					"metrics": -9.09454472414855,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": -44.66956335569116,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": -76.1412787366587,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -47.8149407683286,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": -24.497836725570806,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": 41.67870516718966,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": 99.90639128244152,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			}
		},
        "create": "2023-01-17T11:24:11.965Z",
		"modify": "2023-01-18T13:30:36.120Z",
		"__v": 0
	};

const output = {
		"_id": "63c606cbedaaea9f17e8c27e",
		"enabled": true,
		"name": "23-01-17 11:24:11",
		"user_id": "611dbca07e8ef04625ce1505",
		"platform": {
			"type": 0,
			"_public": false,
			"scope": 0,
			"description": {
				"club": 1,
				"score": 70.5,
				"postureScore": 59,
				"ballisticScore": 82,
				"studio": "studio1",
				"sites": "site1",
				"message": "dddxxxx",
				"like": false
			},
			"files": {
				"sm": {
					"video1": [
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/movie.mp4",
							"description": "side"
						}
					],
					"video2": [
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/movie2.mp4",
							"description": "back"
						}
					],
					"image1": [
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a0.png",
							"description": "address"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a1.png",
							"description": "backswing"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a2.png",
							"description": "top"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a3.png",
							"description": "halfdown"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a4.png",
							"description": "impact"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a5.png",
							"description": "follow"
						},
						{
							"filename": "2233a5b96b3949ed83a21e3d3752693c/sm-a6.png",
							"description": "finish"
						}
					]
				}
			},
			"username": "manager@gmail.com",
			"content": {
				"mails": [],
				"nickname": "manager",
				"id": "a56145270ce6b3bebd1dd012b73948677dd618d496488bc608a3cb43ce3547dd",
				"description": "ユーザの追加変更削除が可能。",
				"image": "",
				"stripe_id": "",
				"friends": [],
				"height": 2,
				"experience": 2,
				"score": 100,
				"driver": 101,
				"seveniron": 0,
				"rounds": 10,
				"practice": 0,
				"handicap": 0,
				"facebook_id": "",
				"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaF90b2tlbiIsImV4cCI6MTY3OTQ2NTQ0MywidXNlcl9pZCI6IjYxMWRiY2EwN2U4ZWYwNDYyNWNlMTUwNSJ9.vTdard2gfFxAA8eyjusEVJYtA8KyAR1K7Rq6-XS0F8o",
				"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjc5NjU4MDQxLCJ1c2VyX2lkIjoiNjExZGJjYTA3ZThlZjA0NjI1Y2UxNTA1In0.oza-iBpkbKSv0n7fP1Wx66ayvZMPgl8YV7lWy5UkicA"
			}
		},
		"prizm": {
			"ClubType": "LONG_IRON",
			"DataList": [
				{
					"Name": "トータル",
					"Unit": "Yard",
					"Value": 240.6
				},
				{
					"Name": "トータルブレ",
					"Unit": "Yard",
					"Value": -10
				},
				{
					"Name": "キャリー",
					"Unit": "Yard",
					"Value": 230.9
				},
				{
					"Name": "キャリーブレ",
					"Unit": "Yard",
					"Value": -20
				},
				{
					"Name": "ヘッドスピード",
					"Unit": "m/s",
					"Value": 200
				},
				{
					"Name": "ボール初速",
					"Unit": "m/s",
					"Value": 120.7
				},
				{
					"Name": "ミート率",
					"Unit": "",
					"Value": 10
				},
				{
					"Name": "打ち出し角 上下",
					"Unit": "度",
					"Value": 5.1
				},
				{
					"Name": "打ち出し角 左右",
					"Unit": "度",
					"Value": 3.5
				},
				{
					"Name": "バックスピン",
					"Unit": "rpm",
					"Value": -672.8
				},
				{
					"Name": "サイドスピン",
					"Unit": "rpm",
					"Value": -149.4
				},
				{
					"Name": "ブロー角",
					"Unit": "度",
					"Value": 20
				},
				{
					"Name": "ヘッド軌道",
					"Unit": "度",
					"Value": 30
				},
				{
					"Name": "フェイス角",
					"Unit": "度",
					"Value": 20
				}
			]
		},
		"sm": {
			"前傾角度": {
				"address": {
					"frame": 30,
					"metrics": 30.462885755068655,
					"unit": "°",
					"criterion": 34,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": 27.84564012928042,
					"unit": "°",
					"criterion": 34,
					"level": "Good"
				},
				"top": {
					"frame": 86,
					"metrics": 25.84135144450915,
					"unit": "°",
					"criterion": 34,
					"level": "Bad"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 25.29329599130874,
					"unit": "°",
					"criterion": 38,
					"level": "Terrible"
				},
				"impact": {
					"frame": 108,
					"metrics": 24.44342767183044,
					"unit": "°",
					"criterion": 40,
					"level": "Terrible"
				},
				"follow": {
					"frame": 116,
					"metrics": 19.83852280141767,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"背骨の傾き": {
				"address": {
					"frame": 30,
					"metrics": 0.6972709104804584,
					"unit": "°",
					"criterion": -1,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": -9.14082587884874,
					"unit": "°",
					"criterion": -1,
					"level": "Terrible"
				},
				"top": {
					"frame": 86,
					"metrics": -6.600129208664068,
					"unit": "°",
					"criterion": -1,
					"level": "Terrible"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -8.20681816858033,
					"unit": "°",
					"criterion": -5,
					"level": "Bad"
				},
				"impact": {
					"frame": 108,
					"metrics": -8.174673242715206,
					"unit": "°",
					"criterion": -8,
					"level": "Excellent"
				},
				"follow": {
					"frame": 116,
					"metrics": -4.1264463132117815,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"首元の動き": {
				"address": {
					"frame": 30,
					"metrics": 0,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": -9.273393879173877,
					"unit": "cm",
					"criterion": -1,
					"level": "Terrible"
				},
				"top": {
					"frame": 86,
					"metrics": -10.719302334857396,
					"unit": "cm",
					"criterion": -1,
					"level": "Terrible"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -7.878804048267702,
					"unit": "cm",
					"criterion": -1,
					"level": "Bad"
				},
				"impact": {
					"frame": 108,
					"metrics": -7.73311363961588,
					"unit": "cm",
					"criterion": -1,
					"level": "Terrible"
				},
				"follow": {
					"frame": 116,
					"metrics": 9.502447068998022,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"右腰の動き": {
				"address": {
					"frame": 30,
					"metrics": 12.660299263197995,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 12.556511408224868,
					"unit": "°",
					"criterion": 7,
					"level": "Terrible"
				},
				"top": {
					"frame": 86,
					"metrics": 13.236249493843982,
					"unit": "°",
					"criterion": 7,
					"level": "Terrible"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 14.465396813508569,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": 16.499109501372168,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"左腰の動き": {
				"address": {
					"frame": 30,
					"metrics": 12.484568081005335,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 13.835992388797264,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 17.54036787873258,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 9.642401809638908,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": 6.688904641835042,
					"unit": "°",
					"criterion": 4,
					"level": "Good"
				},
				"follow": {
					"frame": 116,
					"metrics": 5.94863139878199,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"重心の動き_正面": {
				"address": {
					"frame": 30,
					"metrics": 0,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": -1.1908643204891707,
					"unit": "cm",
					"criterion": -1,
					"level": "Bad"
				},
				"top": {
					"frame": 86,
					"metrics": -3.1000188722968547,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 1.9637100708288124,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"impact": {
					"frame": 108,
					"metrics": 6.21207073364564,
					"unit": "cm",
					"criterion": -1,
					"level": "Good"
				},
				"follow": {
					"frame": 116,
					"metrics": 6.790367721873045,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"右膝の角度": {
				"address": {
					"frame": 30,
					"metrics": 23.917085761508332,
					"unit": "°",
					"criterion": 17,
					"level": "Good"
				},
				"backswing": {
					"frame": 60,
					"metrics": 10.123441833049649,
					"unit": "°",
					"criterion": 21,
					"level": "Terrible"
				},
				"top": {
					"frame": 86,
					"metrics": 13.787076187809912,
					"unit": "°",
					"criterion": 23,
					"level": "Bad"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 7.194529115078759,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": 7.811108668431483,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": 19.12568209802982,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": 21.457108170351578,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"手元の浮き": {
				"address": {
					"frame": 30,
					"metrics": 0,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": 12.97437522966982,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 60.821360897809654,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 27.212979505388546,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": 13.873295027389402,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"follow": {
					"frame": 116,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"左膝の角度": {
				"address": {
					"frame": 30,
					"metrics": 21.236383783640605,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 22.922710824045154,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 24.418168560259097,
					"unit": "°",
					"criterion": 31,
					"level": "Good"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 23.718573131451443,
					"unit": "°",
					"criterion": 30,
					"level": "Good"
				},
				"impact": {
					"frame": 108,
					"metrics": 16.751905640431175,
					"unit": "°",
					"criterion": 19,
					"level": "Excellent"
				},
				"follow": {
					"frame": 116,
					"metrics": 20.727903260367135,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"頭の動き": {
				"address": {
					"frame": 30,
					"metrics": 0,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"backswing": {
					"frame": 60,
					"metrics": -9.190896598191058,
					"unit": "cm",
					"criterion": -1,
					"level": "Bad"
				},
				"top": {
					"frame": 86,
					"metrics": -13.924062090077385,
					"unit": "cm",
					"criterion": -1,
					"level": "Terrible"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -7.7200435361468305,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"impact": {
					"frame": 108,
					"metrics": -6.940688102763845,
					"unit": "cm",
					"criterion": -1,
					"level": "Excellent"
				},
				"follow": {
					"frame": 116,
					"metrics": 0.42537814637162974,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"両肩の傾き_正面": {
				"address": {
					"frame": 30,
					"metrics": -6.324087915218015,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 2.7968135022555307,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 35.39376437957012,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 0.4129428745448065,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": -14.043811262449125,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": -39.81951477929043,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"重心の動き_後方": {
				"address": {
					"frame": 30,
					"metrics": 0,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 3.583785416618773,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 4.819310325976007,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": 6.30564510877411,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": 7.527084791611951,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"グリップ位置": {
				"address": {
					"frame": 30,
					"metrics": 30.505409858538137,
					"unit": "cm",
					"criterion": -1,
					"level": "Bad"
				},
				"backswing": {
					"frame": 60,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "cm",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"手首軌道": {
				"address": {
					"frame": 30,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": 84.55040016841743,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": 74.44256428608811,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": -1,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"腰の開き": {
				"address": {
					"frame": 30,
					"metrics": -19.02465344496846,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": -28.63574256575372,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": -51.2332092700866,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -32.20033340628316,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": -20.313560021304255,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": 27.153346771287517,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": 42.22504339302543,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			},
			"肩の開き": {
				"address": {
					"frame": 30,
					"metrics": -9.09454472414855,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"backswing": {
					"frame": 60,
					"metrics": -44.66956335569116,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"top": {
					"frame": 86,
					"metrics": -76.1412787366587,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"halfdown": {
					"frame": 104,
					"metrics": -47.8149407683286,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"impact": {
					"frame": 108,
					"metrics": -24.497836725570806,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"follow": {
					"frame": 116,
					"metrics": 41.67870516718966,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				},
				"finish": {
					"frame": 124,
					"metrics": 99.90639128244152,
					"unit": "°",
					"criterion": -1,
					"level": "NotJudged"
				}
			}
		},
		"create": "2023-01-17T11:24:11.965Z",
		"modify": "2023-01-18T13:30:36.120Z",
		"__v": 0
	};

describe('structdiff(BIG)', () => {

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
        expect(cjs_detector.isSame(input, output)).toBe(true);
    });
});



describe('debug', () => {

	/*
	comp_type:
		0: default. 構造と値の「タイプ」の違いを検出します。
		1: strict.  構造と値の違いを検出します。
		2: loose.   構造の違いのみが検出されます。
	*/

	const detector = new StructDiff();

	it('debug', () => {
		expect(detector.isSame(_origin, diff1,2)).toBe(true);
	});

});

