import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableFilter from '../TableFilter';

import '@testing-library/jest-dom'

jest.mock('../Input', () => ({ label, name, type, onChange, value }) => (
  <input aria-label={label} name={name} type={type} onChange={onChange} value={value} />
));

describe('TableFilter Component', () => {
  const mockHandlerFilter = jest.fn();
  const mockSetApplyFilter = jest.fn();
  const mockColumns = [
    { name: 'name', label: 'Name' },
    { name: 'beginDate', label: 'Begin Date' },
    { name: 'endDate', label: 'End Date' },
  ];
  const mockFilter = {
    name: '',
    beginDate: '',
    endDate: '',
  };
  
  beforeEach(() => {
    mockHandlerFilter.mockClear();
    mockSetApplyFilter.mockClear();
  });

  test('renders input fields and filter button correctly', () => {
    render(
      <TableFilter
        columns={mockColumns}
        filter={mockFilter}
        handlerFilter={mockHandlerFilter}
        applyFilter={true}
        setApplyFilter={mockSetApplyFilter}
      />
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Begin Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument();
  });

  test('calls handlerFilter when input changes', () => {
    render(
      <TableFilter
        columns={mockColumns}
        filter={mockFilter}
        handlerFilter={mockHandlerFilter}
        applyFilter={true}
        setApplyFilter={mockSetApplyFilter}
      />
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });

    expect(mockHandlerFilter).toHaveBeenCalledWith({ ...mockFilter, name: 'John' });
  });

  test('calls setApplyFilter when form is submitted', () => {
    render(
      <TableFilter
        columns={mockColumns}
        filter={mockFilter}
        handlerFilter={mockHandlerFilter}
        applyFilter={true}
        setApplyFilter={mockSetApplyFilter}
      />
    );

    fireEvent.submit(screen.getByRole('button', { name: 'Filter' }));

    expect(mockSetApplyFilter).toHaveBeenCalledWith(false);
  });

  test('renders date inputs for beginDate and endDate fields', () => {
    render(
      <TableFilter
        columns={mockColumns}
        filter={mockFilter}
        handlerFilter={mockHandlerFilter}
        applyFilter={true}
        setApplyFilter={mockSetApplyFilter}
      />
    );

    const beginDateInput = screen.getByLabelText('Begin Date');
    const endDateInput = screen.getByLabelText('End Date');

    expect(beginDateInput).toHaveAttribute('type', 'date');
    expect(endDateInput).toHaveAttribute('type', 'date');
  });

  test('does not call handlerFilter when form is submitted without changes', () => {
    render(
      <TableFilter
        columns={mockColumns}
        filter={mockFilter}
        handlerFilter={mockHandlerFilter}
        applyFilter={true}
        setApplyFilter={mockSetApplyFilter}
      />
    );

    fireEvent.submit(screen.getByRole('button', { name: 'Filter' }));

    expect(mockHandlerFilter).not.toHaveBeenCalled();
  });
});