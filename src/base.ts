/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

/**
 * isNumber
 *
 * @remarks
 * 値がnull,undef以外
 *
 * @param value - 値
 * @returns null,undef以外
 */
export function isValue(value: unknown): boolean {
    return ((value !== null) && (typeof value !== 'undefined'));
}

/**
 * isObject
 *
 * @remarks
 * 値がオブジェクトか.
 * [],{}はオブジェクト。
 *
 * @param value - 値
 * @returns オブジェクトか
 */
export function isContainer(value: unknown): boolean {
    return ((value !== null) && (typeof value === 'object'));
}

export function isType(value: unknown): string {
    let result:string = typeof value;
    if (Array.isArray(value)) {
         result = "array";
    }
    return result;
}
