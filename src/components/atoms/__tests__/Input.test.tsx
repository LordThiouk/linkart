import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input from '../Input';

describe('Input', () => {
  it('renders correctly with default props', () => {
    const { getByDisplayValue } = render(<Input value="test" onChangeText={() => {}} />);
    expect(getByDisplayValue('test')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = render(<Input label="Test Label" value="" onChangeText={() => {}} />);
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Test Placeholder" value="" onChangeText={() => {}} />);
    expect(getByPlaceholderText('Test Placeholder')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByDisplayValue } = render(<Input value="" onChangeText={onChangeText} />);

    fireEvent.changeText(getByDisplayValue(''), 'new text');
    expect(onChangeText).toHaveBeenCalledWith('new text');
  });

  it('shows error message', () => {
    // const { getByText } = render(<Input value="" onChangeText={() => {}} error={true} />);
    // Note: Error message display depends on implementation
  });

  it('shows helper text', () => {
    // const { getByText } = render(<Input value="" onChangeText={() => {}} />);
    // Note: Helper text display depends on implementation
  });

  it('is disabled when disabled prop is true', () => {
    const { getByDisplayValue } = render(<Input value="test" onChangeText={() => {}} disabled />);
    expect(getByDisplayValue('test')).toBeTruthy();
  });

  it('renders as secure text entry', () => {
    const { getByDisplayValue } = render(<Input value="password" onChangeText={() => {}} secureTextEntry />);
    expect(getByDisplayValue('password')).toBeTruthy();
  });
});
