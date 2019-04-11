import React, { Component, ReactNode, Ref } from 'react';
import { InView, Props as InViewProps } from 'react-peekaboo';

type RenderFuncWithRef = (ref: Ref<any>) => ReactNode;

export type LazyProps = {
  children: ReactNode;
  renderPlaceholder: RenderFuncWithRef;
} & Partial<Pick<InViewProps, 'offsetBottom' | 'offsetTop' | 'throttle'>>;

type State = {
  isInViewport: boolean;
};

export default class Lazy extends Component<LazyProps, State> {
  state: State = {
    isInViewport: false,
  };

  handleChange = (change: boolean) => {
    this.setState({ isInViewport: change });
  };

  shouldComponentUpdate(nextProps: LazyProps, nextState: State) {
    return (
      nextProps.children !== this.props.children ||
      nextProps.offsetBottom !== this.props.offsetBottom ||
      nextProps.offsetTop !== this.props.offsetTop ||
      nextProps.renderPlaceholder !== this.props.renderPlaceholder ||
      nextProps.throttle !== this.props.throttle ||
      nextState.isInViewport !== this.state.isInViewport
    );
  }

  renderChildren = () => this.props.children;

  render() {
    const { offsetBottom, offsetTop, renderPlaceholder, throttle } = this.props;
    const { isInViewport } = this.state;

    return (
      <InView
        enabled={!isInViewport}
        offsetBottom={offsetBottom}
        offsetTop={offsetTop}
        onChange={this.handleChange}
        throttle={throttle}
      >
        {isInViewport ? this.renderChildren : renderPlaceholder}
      </InView>
    );
  }
}
