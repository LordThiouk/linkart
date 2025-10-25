import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button onPress={jest.fn()}>Test Button</Button>);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('renders with different modes', () => {
    const { getByText } = render(
      <Button variant="outline" onPress={() => {}}>
        Outlined Button
      </Button>
    );
    expect(getByText('Outlined Button')).toBeTruthy();
  });

  it('handles onPress events', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Press Me</Button>);

    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    const { getByText } = render(
      <Button loading onPress={() => {}}>
        Loading Button
      </Button>
    );
    expect(getByText('Loading Button')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={onPress}>
        Disabled Button
      </Button>
    );

    fireEvent.press(getByText('Disabled Button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders with different sizes', () => {
    const { getByText } = render(
      <Button size="large" onPress={() => {}}>
        Large Button
      </Button>
    );
    expect(getByText('Large Button')).toBeTruthy();
  });
});
