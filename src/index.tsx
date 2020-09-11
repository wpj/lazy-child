import React, { useState, Fragment, ReactNode, Ref } from 'react';
import {
  useIntersectionChange,
  Options as PeekabooOptions,
} from 'react-peekaboo';

type RenderPlaceholder<E extends HTMLElement> = (ref: Ref<E>) => ReactNode;

export type LazyProps<E extends HTMLElement> = {
  children: ReactNode;
  renderPlaceholder: RenderPlaceholder<E>;
} & Pick<
  PeekabooOptions,
  'offsetBottom' | 'offsetLeft' | 'offsetRight' | 'offsetTop' | 'throttle'
>;

export default function Lazy<E extends HTMLElement>({
  children,
  renderPlaceholder,
  ...peekabooOptions
}: LazyProps<E>) {
  let [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  let ref = useIntersectionChange(setIsIntersecting, {
    enabled: !isIntersecting,
    ...peekabooOptions,
  });

  return (
    <Fragment>{isIntersecting ? children : renderPlaceholder(ref)}</Fragment>
  );
}
