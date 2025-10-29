import { formatMetricValue } from '../formatMetricValue';

describe('formatMetricValue', () => {
  it('should return exact number for values < 1000', () => {
    expect(formatMetricValue(42)).toBe('42');
    expect(formatMetricValue(999)).toBe('999');
    expect(formatMetricValue(0)).toBe('0');
  });

  it('should return K format for values >= 1000', () => {
    expect(formatMetricValue(1000)).toBe('1.0K');
    expect(formatMetricValue(1250)).toBe('1.3K');
    expect(formatMetricValue(15000)).toBe('15.0K');
    expect(formatMetricValue(999999)).toBe('1000.0K');
  });

  it('should return M format for values >= 1000000', () => {
    expect(formatMetricValue(1000000)).toBe('1.0M');
    expect(formatMetricValue(1500000)).toBe('1.5M');
    expect(formatMetricValue(2500000)).toBe('2.5M');
    expect(formatMetricValue(10000000)).toBe('10.0M');
  });

  it('should handle edge cases', () => {
    expect(formatMetricValue(999.9)).toBe('999.9');
    expect(formatMetricValue(1000.0)).toBe('1.0K');
    expect(formatMetricValue(1000000.0)).toBe('1.0M');
  });
});
