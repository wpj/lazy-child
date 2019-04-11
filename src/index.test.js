import React from 'react';
import { cleanup, render, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';

function createMockInView(mockInViewport) {
  return class MockInView extends React.Component {
    componentDidMount() {
      this.props.onChange(mockInViewport);
    }

    render() {
      return this.props.children();
    }
  };
}

describe('Lazy', () => {
  beforeEach(jest.resetModules);
  afterEach(cleanup);

  test('renders a placeholder when not in viewport', async () => {
    jest.doMock('react-peekaboo', () => ({ InView: createMockInView(false) }));
    const Lazy = require('.').default;

    const { getByTestId } = render(
      <Lazy
        renderPlaceholder={ref => (
          <div ref={ref} data-testid="target">
            placeholder
          </div>
        )}
      >
        <div data-testid="target">rendered</div>
      </Lazy>,
    );

    expect(getByTestId('target')).toHaveTextContent('placeholder');
  });

  test('renders its child when in viewport', async () => {
    jest.doMock('react-peekaboo', () => ({ InView: createMockInView(true) }));
    const Lazy = require('.').default;

    const { getByTestId } = render(
      <Lazy
        renderPlaceholder={ref => (
          <div ref={ref} data-testid="target">
            placeholder
          </div>
        )}
      >
        <div data-testid="target">rendered</div>
      </Lazy>,
    );

    expect(getByTestId('target')).toHaveTextContent('rendered');
  });
});
