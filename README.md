The built Storybook is published on https://playground.isoppp.com.

---

## shadcn/ui customization

This repository is a personal react component playground for experimenting with different component implementations and patterns.
Custom shadcn/ui components also have been implemented for my specific use cases.

To copy and use components you would need...

- Copy @radix-ui/xxx packages manually
  - other shadcn dependencies
- Apply Tailwindcss config diff
- Fix `cn` and other import paths
- Setup vitest / jsdom to satisfy types
  - Install dependencies
  - Create vitest-setup.ts
  - Add `"./vitest-setup.ts` to include
  - Add `"types": ["vitest/globals"]` to include field in tsconfig
- You may need Storybook setup
