import { fireEvent, wait } from '@testing-library/react';
import React from 'react';

import { Search } from '../components';
import { TOGGLE_SEARCH_ACTIVE } from '../context/Movie';
import { Tab } from '../types';
import customRender, { initialValue as value } from '../utils/customRender';

const setup = () => {
  const onSearch = jest.fn();
  const utils = customRender(
    <Search tab={Tab.MOVIES} onSearch={onSearch} />,
    {}
  );
  const input = utils.getByPlaceholderText(/search/i);

  return {
    input: input as HTMLInputElement,
    onSearch,
    ...utils,
  };
};

jest.useFakeTimers();

Storage.prototype.setItem = jest.fn();
Storage.prototype.getItem = jest.fn();

describe('Search', () => {
  test('user should be able to type', async () => {
    const { input } = setup();
    const value = 'jack';
    fireEvent.change(input, { target: { value } });

    await wait();

    expect(input.value).toBe(value);
  });

  test("shouldn't call onSearch if there are less than 3 characters", async () => {
    const { input, onSearch, rerender } = setup();
    const text = 'jo';

    fireEvent.change(input, { target: { value: text } });

    rerender(<Search tab={Tab.MOVIES} onSearch={onSearch} />, {});

    jest.runAllTimers();

    expect(onSearch).not.toBeCalled();
    expect(value.dispatch).toHaveBeenCalled();
    expect(value.dispatch).toHaveBeenCalledWith({
      type: TOGGLE_SEARCH_ACTIVE,
      payload: false,
    });
  });

  test('should call onSearch prop if there are more than 3 characters', async () => {
    const { input, onSearch, rerender } = setup();

    const text = 'jack';

    expect(window.localStorage.getItem).toBeCalled();
    expect(window.localStorage.getItem).toBeCalledWith('term');

    fireEvent.change(input, { target: { value: text } });

    expect(input.value).toBe(text);

    rerender(<Search tab={Tab.MOVIES} onSearch={onSearch} />, {});

    jest.runAllTimers();

    expect(onSearch).toBeCalled();
    expect(window.localStorage.setItem).toBeCalled();
    expect(window.localStorage.setItem).toBeCalledWith('term', text);

    expect(onSearch).toHaveBeenCalledWith(text);
  });

  test('on tab change should call onSearch', async () => {
    const { input, onSearch, rerender } = setup();

    const text = 'jack';

    fireEvent.change(input, { target: { value: text } });

    rerender(<Search tab={Tab.MOVIES} onSearch={onSearch} />, {});

    jest.runAllTimers();

    rerender(<Search tab={Tab.SHOWS} onSearch={onSearch} />, {});

    jest.runAllTimers();

    expect(onSearch).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(onSearch).toHaveBeenCalledWith(text);
  });
});
