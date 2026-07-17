declare module 'bootstrap/dist/js/bootstrap.bundle.min' {
  export class Collapse {
    constructor(element: Element, options?: Record<string, unknown>);
    hide(): void;
    show(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): Collapse | null;
    static getOrCreateInstance(element: Element, options?: Record<string, unknown>): Collapse;
  }
}
