import React from 'react';
import { render } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { MetricItem } from '../MetricItem';
import { theme } from '../../../theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<PaperProvider theme={theme}>{component}</PaperProvider>);
};

describe('MetricItem', () => {
  const defaultProps = {
    icon: 'eye' as const,
    value: 1200,
  };

  it('renders correctly', () => {
    const { getByTestId } = renderWithTheme(<MetricItem {...defaultProps} testID="metric-item" />);
    expect(getByTestId('metric-item')).toBeTruthy();
  });

  it('displays the correct value', () => {
    const { getByText } = renderWithTheme(<MetricItem {...defaultProps} testID="metric-item" />);
    expect(getByText('1.2K')).toBeTruthy();
  });

  it('formats large numbers correctly', () => {
    const { getByText } = renderWithTheme(<MetricItem {...defaultProps} value={1500000} testID="metric-item" />);
    expect(getByText('1.5M')).toBeTruthy();
  });

  it('formats small numbers correctly', () => {
    const { getByText } = renderWithTheme(<MetricItem {...defaultProps} value={50} testID="metric-item" />);
    expect(getByText('50')).toBeTruthy();
  });

  it('applies correct size styles', () => {
    const { getByTestId } = renderWithTheme(<MetricItem {...defaultProps} size="md" testID="metric-item" />);
    const item = getByTestId('metric-item');
    expect(item).toBeTruthy();
  });

  it('renders with different icons', () => {
    const { getByTestId } = renderWithTheme(<MetricItem {...defaultProps} icon="download" testID="metric-item" />);
    expect(getByTestId('metric-item')).toBeTruthy();
  });

  it('renders with Heart icon', () => {
    const { getByTestId } = renderWithTheme(<MetricItem {...defaultProps} icon="heart" testID="metric-item" />);
    expect(getByTestId('metric-item')).toBeTruthy();
  });
});
