/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {isType, isValue, isContainer} from "./base";

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
export abstract class DetectHandler {

    abstract compare(s: any, d: any): boolean;

}

export class StrDiffDetector {

    private handler: DetectHandler | null;

    constructor(handler: DetectHandler | null = null) {
        this.handler = handler;
    }

    private isSameValue(s: any, d: any, comp_type: number): boolean {
        let result = true;
        if (this.handler) {
            if (this.handler.compare) {
                result = this.handler.compare(s, d);
            }
        } else {
            switch (comp_type) {
                case 0:
                    result = (isType(s) === isType(d));
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
        let result = true;
        if ((isValue(s)) && (isValue(d))) {
            if ((isContainer(s)) && (isContainer(d))) {
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
                            break;
                        }
                    }
                } else {
                    result = false;
                }
            } else {
                result = this.isSameValue(s, d, comp_type);
            }
        } else {
            result = false;
        }
        return result;
    }

}

// module.exports = {StrDiffDetector, DetectHandler};