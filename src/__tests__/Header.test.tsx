import { fireEvent } from '@testing-library/react';
import React from 'react';

import { Header } from '../components';
import { setActiveTab } from '../context/Movie';
import { Tab } from '../types';
import customRender from '../utils/customRender';

const setup = () => {
  const utils = customRender(<Header />, {});
  const movieTab = utils.getByText(/movies/i);
  const showsTab = utils.getByText(/shows/i);

  return {
    ...utils,
    movieTab,
    showsTab,
  };
};

describe('Header', () => {
  test('should switch tab on click', async () => {
    const { movieTab, showsTab, value, rerender } = setup();

    expect(movieTab).not.toHaveClass('active');
    expect(showsTab).toHaveClass('active');

    if (movieTab) {
      fireEvent.click(movieTab as HTMLElement);
    }

    expect(value.dispatch).toHaveBeenCalled();
    expect(value.dispatch).toHaveBeenCalledWith(setActiveTab(Tab.MOVIES));

    rerender(<Header />, {
      value: {
        ...value,
        state: {
          ...value.state,
          activeTab: Tab.MOVIES,
        },
      },
    });

    expect(showsTab).not.toHaveClass('active');
    expect(movieTab).toHaveClass('active');
  });
});
