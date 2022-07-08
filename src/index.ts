"use strict";

const base: any = require("./base");


    /**
     * Handler
     *
     * @remarks
     * 値が同一か？
     *
     * @param s
     * @param d
     * @returns boolean
     *
     */
class DetectHandler {

    public detect(s: any, d: any): boolean {
        return (s === d);
    }

}

class StrDiffDetector {

    private handler: DetectHandler | null;

    constructor(handler: DetectHandler | null = null) {
        this.handler = handler;
    }

    private isSameValue(s: any, d: any, comp_type: number): boolean {
        let result = true;
        if (this.handler) {
            if (this.handler.detect) {
                result = this.handler.detect(s, d);
            }
        } else {
            switch (comp_type) {
                case 0:
                    result = ((typeof s) === (typeof d));
                    break;
                case 1:
                    result = (s === d);
                    break;
                default:
            }
        }
        return result;
    }

    public isSame(s: any, d: any, comp_type: number = 0): boolean {
        let result = false;
        if ((base.isValue(s)) && (base.isValue(d))) {
            result = true;
            if (typeof s === "object") {
                const attrs_s = Object.keys(s);
                const attrs_d = Object.keys(d);
                if (attrs_s.length === attrs_d.length) {
                    attrs_s.sort();
                    attrs_d.sort();
                    for (let index = 0; index < attrs_s.length; index++) {
                        if (attrs_s[index] === attrs_d[index]) {
                            let attr = attrs_s[index];
                            if (!(this.isSame(s[attr], d[attr], comp_type))) {
                                result = false;
                                break;
                            }
                        } else {
                            result = false;
                        }
                    }
                } else {
                    result = false;
                }
            } else {
                result = this.isSameValue(s, d, comp_type);
            }
        }
        return result;
    }

}

module.exports = {StrDiffDetector, DetectHandler};