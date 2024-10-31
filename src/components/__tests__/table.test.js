import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Table from './../Table';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';
import '@testing-library/jest-dom'

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useQueryClient: jest.fn(),
  useMutation: jest.fn()
}));

jest.mock('./../TableFilter', () => () => <div>TableFilter Component</div>);
jest.mock('./../ImageButton', () => ({ img, label, ...props }) => (
  <button {...props}>
    {label}
  </button>
));
jest.mock('./../Pagination', () => () => <div>Pagination Component</div>);
jest.mock('./../Loading', () => () => <div>Loading...</div>);
jest.mock('./../ErrorHandler', () => ({
  Errorhandler: jest.fn(),
}));

describe('Table Component', () => {
  const mockColumns = [
    { name: 'name', label: 'Name' },
    { name: 'date', label: 'Date' },
  ];

  const mockData = {
    success: true,
    data: {
      empty: false,
      content: [
        { id: 1, name: 'Test User', date: '2022-01-01' },
      ],
      totalPages: 1,
    },
  };

  const mockEndpoint = jest.fn(() => Promise.resolve(mockData));
  const mockHandlerFilter = jest.fn();
  const mockFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortDirection: 'none',
    sortField: null,
  };

  beforeEach(() => {
    useQuery.mockImplementation(() => ({
      isLoading: false,
      data: mockData,
    }));
    useMutation.mockImplementation(() => ({
      isLoading: false,
      data: {success: true},
    }));
  });

  test('renders loading state correctly', () => {
    useQuery.mockImplementationOnce(() => ({
      isLoading: true,
    }));
    
    render(
      <Router>
        <Table columns={mockColumns} endpoint={mockEndpoint} filter={mockFilter} handlerFilter={mockHandlerFilter} invalidateCacheParam="test" />
      </Router>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders table with data', async () => {
    render(
      <Router>
        <Table columns={mockColumns} endpoint={mockEndpoint} filter={mockFilter} handlerFilter={mockHandlerFilter} invalidateCacheParam="test" />
      </Router>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });

  test('handles filter toggle button', () => {
    render(
      <Router>
        <Table columns={mockColumns} endpoint={mockEndpoint} filter={mockFilter} handlerFilter={mockHandlerFilter} invalidateCacheParam="test" />
      </Router>
    );

    fireEvent.click(screen.getByText('Filter'));

    expect(screen.getByText('TableFilter Component')).toBeInTheDocument();
  });

  test('handles sorting function on column header click', () => {
    render(
      <Router>
        <Table columns={mockColumns} endpoint={mockEndpoint} filter={mockFilter} handlerFilter={mockHandlerFilter} invalidateCacheParam="test" />
      </Router>
    );

    fireEvent.click(screen.getByText('Name'));

    expect(mockHandlerFilter).toHaveBeenCalledWith({ ...mockFilter, sortDirection: 'ASC', sortField: 'name' });
  });

  test('renders pagination', () => {
    render(
      <Router>
        <Table columns={mockColumns} endpoint={mockEndpoint} filter={mockFilter} handlerFilter={mockHandlerFilter} invalidateCacheParam="test" />
      </Router>
    );

    expect(screen.getByText('Pagination Component')).toBeInTheDocument();
  });
});
