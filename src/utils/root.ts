/** Detect free variable `global` from Node.js. */
declare const global: any
const freeGlobal: any =
  typeof global === 'object' &&
  global !== null &&
  global.Object === Object &&
  global

/** Detect free variable `globalThis` */
declare const globalThis: any
const freeGlobalThis: any =
  typeof globalThis === 'object' &&
  globalThis !== null &&
  globalThis.Object == Object &&
  globalThis

/** Detect free variable `self`. */
declare const self: any
const freeSelf: any =
  typeof self === 'object' && self !== null && self.Object === Object && self

/** Used as a reference to the global object. */
export const root: any =
  freeGlobalThis || freeGlobal || freeSelf || Function('return this')()

export default root
