import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ProductMetrics } from '../ProductMetrics';

const renderWithTheme = (component: React.ReactElement) => {
  return render(component);
};

describe('ProductMetrics', () => {
  it('should render all three metrics', () => {
    renderWithTheme(<ProductMetrics viewCount={1250} downloadCount={42} likeCount={89} testID="product-metrics" />);

    expect(screen.getByTestId('product-metrics')).toBeTruthy();
    expect(screen.getByTestId('product-metrics-views')).toBeTruthy();
    expect(screen.getByTestId('product-metrics-downloads')).toBeTruthy();
    expect(screen.getByTestId('product-metrics-likes')).toBeTruthy();
  });

  it('should display formatted values', () => {
    renderWithTheme(<ProductMetrics viewCount={1250} downloadCount={42} likeCount={89} testID="product-metrics" />);

    expect(screen.getByText('1.3K')).toBeTruthy(); // viewCount
    expect(screen.getByText('42')).toBeTruthy(); // downloadCount
    expect(screen.getByText('89')).toBeTruthy(); // likeCount
  });

  it('should render with horizontal layout by default', () => {
    renderWithTheme(<ProductMetrics viewCount={1000} downloadCount={1000} likeCount={1000} testID="product-metrics" />);

    const container = screen.getByTestId('product-metrics');
    expect(container.props.style.flexDirection).toBe('row');
  });

  it('should render with vertical layout when specified', () => {
    renderWithTheme(
      <ProductMetrics
        viewCount={1000}
        downloadCount={1000}
        likeCount={1000}
        layout="vertical"
        testID="product-metrics"
      />
    );

    const container = screen.getByTestId('product-metrics');
    expect(container.props.style.flexDirection).toBe('column');
  });

  it('should render with small size by default', () => {
    renderWithTheme(<ProductMetrics viewCount={1000} downloadCount={1000} likeCount={1000} testID="product-metrics" />);

    // All MetricItem components should be rendered
    expect(screen.getByTestId('product-metrics-views')).toBeTruthy();
    expect(screen.getByTestId('product-metrics-downloads')).toBeTruthy();
    expect(screen.getByTestId('product-metrics-likes')).toBeTruthy();
  });

  it('should render with medium size when specified', () => {
    renderWithTheme(
      <ProductMetrics viewCount={1000} downloadCount={1000} likeCount={1000} size="md" testID="product-metrics" />
    );

    // All MetricItem components should be rendered
    expect(screen.getByTestId('product-metrics-views')).toBeTruthy();
    expect(screen.getByTestId('product-metrics-downloads')).toBeTruthy();
    expect(screen.getByTestId('product-metrics-likes')).toBeTruthy();
  });

  it('should handle large values correctly', () => {
    renderWithTheme(
      <ProductMetrics viewCount={1500000} downloadCount={2500000} likeCount={5000000} testID="product-metrics" />
    );

    expect(screen.getByText('1.5M')).toBeTruthy(); // viewCount
    expect(screen.getByText('2.5M')).toBeTruthy(); // downloadCount
    expect(screen.getByText('5.0M')).toBeTruthy(); // likeCount
  });

  it('should handle zero values', () => {
    renderWithTheme(<ProductMetrics viewCount={0} downloadCount={0} likeCount={0} testID="product-metrics" />);

    expect(screen.getByText('0')).toBeTruthy();
    expect(screen.getAllByText('0')).toHaveLength(3);
  });
});
