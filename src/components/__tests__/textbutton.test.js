import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextButton from '../TextButton'; 

import '@testing-library/jest-dom'

describe('TextButton Component', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders the button with correct label', () => {
    render(<TextButton label="Click Me" onClick={mockOnClick} />);
    expect(screen.getByRole('button', { name: /Click Me/i })).toBeInTheDocument();
  });

  test('calls onClick function when button is clicked', () => {
    render(<TextButton label="Click Me" onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('button', { name: /Click Me/i }));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when button is disabled', () => {
    render(<TextButton label="Disabled" disable={true} onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('button', { name: /Disabled/i }));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('applies correct classes when enabled', () => {
    const { container } = render(<TextButton label="Enabled" onClick={mockOnClick} />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-blue-600'); 
    expect(button).not.toHaveClass('bg-gray-600');
  });

  test('applies correct classes when disabled', () => {
    const { container } = render(<TextButton label="Disabled" disable={true} onClick={mockOnClick} />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-gray-600'); 
    expect(button).not.toHaveClass('bg-blue-600');
  });

  test('button is disabled when disable prop is true', () => {
    render(<TextButton label="Disabled" disable={true} onClick={mockOnClick} />);
    expect(screen.getByRole('button', { name: /Disabled/i })).toBeDisabled();
  });

  test('button is enabled when disable prop is false', () => {
    render(<TextButton label="Enabled" disable={false} onClick={mockOnClick} />);
    expect(screen.getByRole('button', { name: /Enabled/i })).not.toBeDisabled();
  });

  test('correct type is set for the button', () => {
    render(<TextButton label="Submit" type="submit" onClick={mockOnClick} />);
    expect(screen.getByRole('button', { name: /Submit/i })).toHaveAttribute('type', 'submit');
  });
});
