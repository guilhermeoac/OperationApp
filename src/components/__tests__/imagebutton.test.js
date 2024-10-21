import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageButton from '../ImageButton'; 
import { BiSearch } from 'react-icons/bi'; 

import '@testing-library/jest-dom'

describe('ImageButton Component', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('calls onClick function when button is clicked', () => {
    render(<ImageButton type="button" img={<BiSearch />} color="blue" onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when button is disabled', () => {
    render(<ImageButton type="button" img={<BiSearch />} color="blue" onClick={mockOnClick} disable={true} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('button is disabled when disable prop is true', () => {
    render(<ImageButton type="button" img={<BiSearch />} color="blue" onClick={mockOnClick} disable={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('button is enabled when disable prop is false', () => {
    render(<ImageButton type="button" img={<BiSearch />} color="blue" onClick={mockOnClick} disable={false} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  test('renders without crashing when no img is provided', () => {
    render(<ImageButton type="button" color="blue" onClick={mockOnClick} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600'); 
  });
});
