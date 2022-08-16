import { FormControl, FormGroup } from "@angular/forms";
import { isString } from "util";

/**
 * 对象克隆
 * @param o
 * @return {any}
 */
export function clone(o: any) {
  if (o !== null && typeof o === 'object')
    return JSON.parse(JSON.stringify(o));
  return o;
}

/**
 * 增量步骤执行
 * @param {number} star 起始值
 * @param {number} end 结束边界值
 * @param {number} step 步长
 * @param {(v) => (boolean | void)} f 步长处理回调函数
 */
export function incrStep(star: number, end: number, step: number, f: (v) => boolean | void) {
  while (star <= end) {
    if (false === f(star)) break;
    star += step;
  }
}

/**
 * 对象属性遍历
 * @param {object} o 目标对象
 * @param {(v: T, k: (string | any)) => (boolean | any)} f 属性处理函数
 */
export function eachO<T>(o: object, f: (v: T, k: string | any) => boolean | any) {
  for (const k in o)
    if (false === f(o[k], k))
      break;
}

/**
 * 清空对象属性
 * @param {object} o 目标对象
 * @param {(v: any, k: string) => (boolean | void)} f   true-跳过当前属性, 
 * 														false-跳过后续所有, 
 * 														undefined-删除当前属性
 */
export function clearO(o: object, f?: (v: any, k: string) => boolean | void) {
  f = !isFunction(f) ? f : () => undefined;
  eachO(o, (v, k) => {
    let r = f(v, k);
    if (true === r) return;
    if (false === r) return false;
    delete o[k];
  });
}

/**
 * 数组遍历
 * @param {Array<T>} a
 * @param {((e: T, i?: number) => boolean) | void | any} f
 */
export function eachA<T>(a: Array<T>, f?: (((e: T, i?: number) => boolean) | void | any)) {
  if (!isFunction(f)) f = _ => true;
  for (let i = 0, len = a.length; i < len; i++)
    if (false === f(a[i], i))
      break;
}

/**
 * 追加唯一目标值, 如果校验存在则跳过
 * @param {Array<T>} a 数组
 * @param {T} e 新元素
 * @param {string | ((el: T, i: number) => boolean)} c 唯一值属性名或比较器函数(返回true表示存在)
 * @return {number} 与e匹配的元素索引
 */
export function pushUniqueA<T>(a: Array<T>, e: T, c?: string | ((el: T, i: number) => boolean)): number {
  let foundIndex = indexA(a, e, c);
  if (-1 !== foundIndex)
    return foundIndex;
  return a.push(e) - 1;
}

/**
 * 查找索引
 * @param {Array<T>} a 数组
 * @param {T} e 查找条件
 * @param {string | ((el: T, i: number) => boolean)} k 唯一值属性名或比较器函数(返回true表示找到)
 * @return {number} 索引, -1表示未找到
 */
export function indexA<T>(a: Array<T>, e: T, k?: string | ((el: T, i: number) => boolean)): number {
  let fn: (el: T, i: number) => boolean;
  if (!(k instanceof Function)) {
    if (k === null || k === undefined) fn = el => el === e;
    else if (typeof k === 'string') fn = el => el[k] === e[k];
  }

  let foundIdx = -1;
  eachA(a, (el, i) => {
    if (true === fn(el, i)) {
      foundIdx = i;
      return false;
    }
  });
  return foundIdx;
}

/**
 * 查找目标值
 * @param {Array<T>} a 数组
 * @param {T} e 查找条件
 * @param {string | ((el: T, i: number) => boolean)} k 唯一值属性名或比较器函数(返回true表示找到)
 * @return {T | null} 查找成功返回目标值, 否则返回null
 */
export function findA<T>(a: Array<T>, e: T, k?: string | ((el: T, i: number) => boolean)): T | null {
  const i = indexA(a, e, k);
  return -1 !== i ? a[i] : null;
}

/**
 * 删除
 * @param {Array<T>} a 数组
 * @param {T} e 查找条件
 * @param {string | ((el: T, i: number) => boolean)} k 唯一值属性名或比较器函数(返回true表示找到)
 * @return {T | null} 删除成功返回被删除目标值, 否则返回null
 */
export function removeA<T>(a: Array<T>, e: T, k?: string | ((el: T, i: number) => boolean)): T | null {
  const i = indexA(a, e, k);
  if (-1 === i) return null;
  return a.splice(i, 1)[0];
}

/**
 * 合并
 * @param {Array<T>} t 目标数组
 * @param {Array<T>} s 元素组
 */
export function concatA<T>(t: Array<T>, s: Array<T>) {
  if (!Array.isArray(t) || !Array.isArray(s)) throw '无效数组参数';
  Array.prototype.push.apply(t, s);
}

/**
 * angular表单校验
 * @param {FormGroup} fm 表单组
 * @return {boolean} true-校验通过, false-校验失败
 */
export function validNgForm(fm: FormGroup): boolean {
  eachO<FormControl>(fm.controls, c => {
    c.markAsDirty();
    c.updateValueAndValidity();
  });
  return fm.valid;
}
