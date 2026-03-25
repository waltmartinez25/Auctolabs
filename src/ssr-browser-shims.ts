/**
 * Browser API shims for SSR pre-rendering.
 *
 * This file MUST be the first import in prerender.tsx so Rollup places its
 * module-level code before any library that references browser globals at
 * module evaluation time (e.g. number-flow references HTMLElement and
 * customElements at module load).
 *
 * These shims are no-ops — they exist solely to prevent ReferenceErrors
 * during renderToString. No browser behaviour is replicated.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

if (typeof HTMLElement === 'undefined') {
  (globalThis as any).HTMLElement = class HTMLElement {
    shadowRoot: any = null;
    style: Record<string, string> = {};
    setAttribute(_n: string, _v: string) {}
    getAttribute(_n: string) { return null; }
    addEventListener() {}
    removeEventListener() {}
    dispatchEvent() { return true; }
    attachShadow() { return (this.shadowRoot = {}); }
    appendChild(_child: any) {}
    getAnimations() { return []; }
  };
}

if (typeof customElements === 'undefined') {
  (globalThis as any).customElements = {
    define: () => {},
    get: () => undefined,
  };
}

if (typeof document === 'undefined') {
  (globalThis as any).document = {
    createElement: (_tag: string) => ({
      style: {},
      setAttribute: () => {},
      addEventListener: () => {},
      appendChild: () => {},
      animate: () => ({ finished: Promise.resolve() }),
      getAnimations: () => [],
      shadowRoot: null,
    }),
    createTextNode: (_text: string) => ({}),
  };
}

if (typeof window === 'undefined') {
  (globalThis as any).window = globalThis;
}

// Ensure global addEventListener/removeEventListener are available
// (some libraries call window.addEventListener at module level)
if (typeof (globalThis as any).addEventListener !== 'function') {
  (globalThis as any).addEventListener = () => {};
  (globalThis as any).removeEventListener = () => {};
}

if (typeof CSS === 'undefined') {
  (globalThis as any).CSS = {
    supports: () => false,
    registerProperty: () => {},
  };
}

if (typeof matchMedia === 'undefined') {
  (globalThis as any).matchMedia = (_query: string) => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}
