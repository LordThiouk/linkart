import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { SearchBar } from '../SearchBar';

// Mock lucide-react-native icons
jest.mock('lucide-react-native', () => ({
  Search: 'SearchIcon',
  X: 'XIcon',
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(component);
};

describe('SearchBar', () => {
  const mockOnChangeText = jest.fn();
  const mockOnSearch = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  beforeEach(() => {
    mockOnChangeText.mockClear();
    mockOnSearch.mockClear();
    mockOnFocus.mockClear();
    mockOnBlur.mockClear();
  });

  it('renders correctly with default placeholder', () => {
    renderWithTheme(<SearchBar value="" onChangeText={mockOnChangeText} testID="search-bar" />);

    expect(screen.getByTestId('search-bar')).toBeOnTheScreen();
    expect(screen.getByTestId('search-bar-input')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Rechercher beats, artistes, services...')).toBeOnTheScreen();
    expect(screen.getByText('SearchIcon')).toBeOnTheScreen();
  });

  it('renders with custom placeholder', () => {
    renderWithTheme(
      <SearchBar value="" onChangeText={mockOnChangeText} placeholder="Custom placeholder" testID="search-bar" />
    );

    expect(screen.getByPlaceholderText('Custom placeholder')).toBeOnTheScreen();
  });

  it('displays the current value', () => {
    renderWithTheme(<SearchBar value="test query" onChangeText={mockOnChangeText} testID="search-bar" />);

    expect(screen.getByDisplayValue('test query')).toBeOnTheScreen();
  });

  it('calls onChangeText when text is entered', () => {
    renderWithTheme(<SearchBar value="" onChangeText={mockOnChangeText} testID="search-bar" />);

    fireEvent.changeText(screen.getByTestId('search-bar-input'), 'new text');
    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  it('calls onFocus when input is focused', () => {
    renderWithTheme(<SearchBar value="" onChangeText={mockOnChangeText} onFocus={mockOnFocus} testID="search-bar" />);

    fireEvent(screen.getByTestId('search-bar-input'), 'focus');
    expect(mockOnFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when input loses focus', () => {
    renderWithTheme(<SearchBar value="" onChangeText={mockOnChangeText} onBlur={mockOnBlur} testID="search-bar" />);

    fireEvent(screen.getByTestId('search-bar-input'), 'blur');
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when submit is pressed', () => {
    renderWithTheme(
      <SearchBar value="test query" onChangeText={mockOnChangeText} onSearch={mockOnSearch} testID="search-bar" />
    );

    fireEvent(screen.getByTestId('search-bar-input'), 'submitEditing');
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('shows clear button when value is not empty', () => {
    renderWithTheme(<SearchBar value="test" onChangeText={mockOnChangeText} testID="search-bar" />);

    expect(screen.getByTestId('search-bar-clear')).toBeOnTheScreen();
    expect(screen.getByText('XIcon')).toBeOnTheScreen();
  });

  it('does not show clear button when value is empty', () => {
    renderWithTheme(<SearchBar value="" onChangeText={mockOnChangeText} testID="search-bar" />);

    expect(screen.queryByTestId('search-bar-clear')).toBeNull();
  });

  it('calls onChangeText with empty string when clear button is pressed', () => {
    renderWithTheme(<SearchBar value="test" onChangeText={mockOnChangeText} testID="search-bar" />);

    fireEvent.press(screen.getByTestId('search-bar-clear'));
    expect(mockOnChangeText).toHaveBeenCalledWith('');
  });

  it('shows search button when value is not empty', () => {
    renderWithTheme(
      <SearchBar value="test" onChangeText={mockOnChangeText} onSearch={mockOnSearch} testID="search-bar" />
    );

    expect(screen.getByTestId('search-bar-search')).toBeOnTheScreen();
  });

  it('does not show search button when value is empty', () => {
    renderWithTheme(<SearchBar value="" onChangeText={mockOnChangeText} onSearch={mockOnSearch} testID="search-bar" />);

    expect(screen.queryByTestId('search-bar-search')).toBeNull();
  });

  it('calls onSearch when search button is pressed', () => {
    renderWithTheme(
      <SearchBar value="test query" onChangeText={mockOnChangeText} onSearch={mockOnSearch} testID="search-bar" />
    );

    fireEvent.press(screen.getByTestId('search-bar-search'));
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('trims whitespace when searching', () => {
    renderWithTheme(
      <SearchBar value="  test query  " onChangeText={mockOnChangeText} onSearch={mockOnSearch} testID="search-bar" />
    );

    fireEvent.press(screen.getByTestId('search-bar-search'));
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('does not call onSearch when value is empty after trim', () => {
    renderWithTheme(
      <SearchBar value="   " onChangeText={mockOnChangeText} onSearch={mockOnSearch} testID="search-bar" />
    );

    fireEvent.press(screen.getByTestId('search-bar-search'));
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    renderWithTheme(<SearchBar value="" onChangeText={mockOnChangeText} style={customStyle} testID="search-bar" />);

    const container = screen.getByTestId('search-bar');
    expect(container.props.style).toEqual(expect.arrayContaining([customStyle]));
  });
});
