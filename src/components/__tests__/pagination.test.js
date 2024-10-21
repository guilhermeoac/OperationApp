import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';
import { BiChevronsLeft, BiChevronLeft, BiChevronsRight, BiChevronRight } from "react-icons/bi";
import '@testing-library/jest-dom'

describe('Pagination Component', () => {
  const mockSetPage = jest.fn();
  const mockFilter = {
    pageNumber: 0,
    pageSize: 10,
  };

  beforeEach(() => {
    mockSetPage.mockClear();
  });

  test('renders pagination buttons correctly', () => {
    render(
      <Pagination filter={mockFilter} setPage={mockSetPage} lastPage={5} setPageSize={mockSetPage} />
    );

    expect(screen.getByTitle('First')).toBeInTheDocument();
    expect(screen.getByTitle('Previous')).toBeInTheDocument();
    expect(screen.getByTitle('Next')).toBeInTheDocument();
    expect(screen.getByTitle('Last')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); 
  });

  test('disables First and Previous buttons on the first page', () => {
    render(
      <Pagination filter={mockFilter} setPage={mockSetPage} lastPage={5} setPageSize={mockSetPage} />
    );

    expect(screen.getByTitle('First')).toBeDisabled();
    expect(screen.getByTitle('Previous')).toBeDisabled();
  });

  test('enables Next and Last buttons when not on the last page', () => {
    render(
      <Pagination filter={mockFilter} setPage={mockSetPage} lastPage={5} setPageSize={mockSetPage} />
    );

    expect(screen.getByTitle('Next')).toBeEnabled();
    expect(screen.getByTitle('Last')).toBeEnabled();
  });

  test('calls setPage with correct parameters when clicking Next', () => {
    render(
      <Pagination filter={mockFilter} setPage={mockSetPage} lastPage={5} setPageSize={mockSetPage} />
    );

    fireEvent.click(screen.getByTitle('Next'));
    expect(mockSetPage).toHaveBeenCalledWith({ ...mockFilter, pageNumber: 1 });
  });

  test('calls setPage with correct parameters when clicking Last', () => {
    render(
      <Pagination filter={mockFilter} setPage={mockSetPage} lastPage={5} setPageSize={mockSetPage} />
    );

    fireEvent.click(screen.getByTitle('Last'));
    expect(mockSetPage).toHaveBeenCalledWith({ ...mockFilter, pageNumber: 5 });
  });

  test('changes page size when selecting a different page size', () => {
    render(
      <Pagination filter={mockFilter} setPage={mockSetPage} lastPage={5} setPageSize={mockSetPage} />
    );

    fireEvent.change(screen.getByTitle('Page size'), { target: { value: '20' } });
    expect(mockSetPage).toHaveBeenCalledWith({ ...mockFilter, pageSize: '20' });
  });

  test('disables Next and Last buttons on the last page', () => {
    const filterOnLastPage = { pageNumber: 5, pageSize: 10 };

    render(
      <Pagination filter={filterOnLastPage} setPage={mockSetPage} lastPage={5} setPageSize={mockSetPage} />
    );

    expect(screen.getByTitle('Next')).toBeDisabled();
    expect(screen.getByTitle('Last')).toBeDisabled();
  });
});
