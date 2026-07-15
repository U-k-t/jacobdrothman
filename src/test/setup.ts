import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement matchMedia or IntersectionObserver — provide safe
// defaults so components/hooks that use them don't crash. Individual tests
// override these where the specific value matters (e.g. reduced motion).
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (!("IntersectionObserver" in window)) {
  // @ts-expect-error -- test environment stub
  window.IntersectionObserver = MockIntersectionObserver;
  // @ts-expect-error -- test environment stub
  global.IntersectionObserver = MockIntersectionObserver;
}
