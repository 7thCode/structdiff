"use strict";

const base: any = require("./base");


class DetectHandler {

    /**
     * Symbol Handler
     *
     * @remarks
     * ParserがSymbolを発見した
     *
     * @param s
     * @param d
     * @returns void
     *
     */
    public detect(s: any, d: any): boolean {
        return (s === d);
    }

}

class StrDiffDetector {

    private handler: DetectHandler | null;

    constructor(handler: DetectHandler | null = null) {
        this.handler = handler;
    }

    private compareValue(s: any, d: any, comp_type: number): boolean {
        let result = true;
        if (this.handler) {
            result = this.handler.detect(s, d);
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
                const attrs = Object.keys(s);
                for (let index = 0; index < attrs.length; index++) {
                    let attr = attrs[index];
                    if (!(this.isSame(s[attr], d[attr], comp_type))) {
                        result = false;
                        break;
                    }
                }
            } else {
                result = this.compareValue(s, d, comp_type);
            }
        }
        return result;
    }

}

module.exports = {StrDiffDetector,DetectHandler};