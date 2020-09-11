# lazy-child

[![CI Status](https://github.com/wpj/lazy-child/workflows/CI/badge.svg)](https://github.com/wpj/lazy-child/actions)

React component that renders its child when it enters the viewport.

## Installation

```
npm install lazy-child
```

## Usage

```tsx
import Lazy from 'lazy-child';

function LazyLoadedImageExample() {
  return (
    <Lazy<HTMLImageElement>
      renderPlaceholder={(ref) => <img ref={ref} alt="Lazy loaded image" />}
    >
      <img src="example.jpg" alt="Lazy loaded image" />
    </Lazy>
  );
}
```

## API

### `Lazy`

#### Props

##### `children: React.ReactNode`

A React element to render when the placeholder enters the viewport.

##### `offsetBottom?: number`

Passed to the wrapped [react-peekaboo](https://github.com/wpj/react-peekaboo)
instance.

Number of pixels to add to the bottom of the area checked against when computing
in view elements.

Default: `0`

##### `offsetLeft?: number`

Passed to the wrapped [react-peekaboo](https://github.com/wpj/react-peekaboo)
instance.

Number of pixels to add to the left of the area checked against when computing
in view elements.

Default: `0`

##### `offsetRight?: number`

Passed to the wrapped [react-peekaboo](https://github.com/wpj/react-peekaboo)
instance.

Number of pixels to add to the right of the area checked against when computing
in view elements.

Default: `0`

##### `offsetTop?: number`

Passed to the wrapped [react-peekaboo](https://github.com/wpj/react-peekaboo)
instance.

Number of pixels to add to the top of the area checked against when computing in
view elements.

Default: `0`

##### `renderPlaceholder<E extends HTMLElement>: (ref: React.Ref<E>) => React.ReactNode`

Render prop that returns a React element to use as a placeholder. The function
receives a ref as its first parameter that must be applied to a DOM element.

##### `throttle?: number`

Passed to the wrapped [react-peekaboo](https://github.com/wpj/react-peekaboo)
instance.

Number of ms to throttle scroll events (only applies in environments that don't
support IntersectionObserver).

Default: `100`
