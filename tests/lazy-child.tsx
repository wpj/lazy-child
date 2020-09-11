import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('react-peekaboo', () => ({
  useIntersectionChange: jest.fn(),
}));

import { useIntersectionChange } from 'react-peekaboo';

import Lazy from '../src';

const mockedUseIntersectionChange = useIntersectionChange as jest.Mock;

describe('Lazy', () => {
  beforeEach(() => {
    mockedUseIntersectionChange.mockClear();
  });

  test("renders a placeholder when it's not intersecting", () => {
    mockedUseIntersectionChange.mockImplementationOnce((onChange) => {
      onChange(false);
    });

    const { getByTestId } = render(
      <Lazy<HTMLDivElement>
        renderPlaceholder={(ref) => (
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

  test("renders its children when it's intersecting", () => {
    mockedUseIntersectionChange.mockImplementationOnce((onChange) => {
      onChange(true);
    });

    const { getByTestId } = render(
      <Lazy<HTMLDivElement>
        renderPlaceholder={(ref) => (
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
