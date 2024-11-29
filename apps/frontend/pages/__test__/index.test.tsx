import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { appService } from '../../service/app.service';
import Page from '../index';
import { ApiResponse } from '@repo/models';

// Mock Router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock AppService
jest.mock('../../service/app.service', () => ({
  appService: {
    useGetRequest: jest.fn(),
  },
}));

const mockResponse: ApiResponse = {
  items: [
    {
      id: '1',
      author: 'Author 1',
      title: 'Title 1',
      createdAt: 21313123,
      published: true,
      auction: true,
    },
    {
      id: '2',
      author: 'Author 2',
      title: 'Title 2',
      createdAt: 123123123,
      published: true,
      auction: true,
    },
  ],
  currentPage: 1,
  totalPages: 1,
  totalItems: 2,
  limit: 10,
};

const mockResponseNodata: ApiResponse = {
  items: [],
  limit: 10,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
};

describe('Request page', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: jest.fn(),
    });
    (appService.useGetRequest as jest.Mock).mockReturnValue({
      isLoading: false,
      isValidating: false,
      error: null,
      data: mockResponse,
    });
  });

  test('renders Title', () => {
    render(<Page response={mockResponse} />);
    expect(screen.getByText('Requests')).toBeInTheDocument();
  });

  test('get api response', () => {
    (appService.useGetRequest as jest.Mock).mockReturnValue({
      isLoading: true,
      isValidating: false,
      error: null,
      data: null,
    });
    render(<Page response={mockResponse} />);
    expect(screen.getAllByTestId('card-skeleton')).toHaveLength(12);
  });

  test('call api fail', () => {
    (appService.useGetRequest as jest.Mock).mockReturnValue({
      isLoading: false,
      isValidating: false,
      error: {
        message: "Sorry, We couldn't get data",
      },
      data: null,
    });
    render(<Page response={{}} />);
    expect(
      screen.getByText("Sorry, We couldn't get data! Please try again later!")
    ).toBeInTheDocument();
  });

  test('renders no data state', () => {
    (appService.useGetRequest as jest.Mock).mockReturnValue({
      isLoading: false,
      isValidating: false,
      data: { items: [] },
    });
    render(<Page response={mockResponseNodata} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('Next page', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1', limit: '1' },
      push: pushMock,
    });

    render(
      <Page
        response={{
          ...mockResponse,
          currentPage: 1,
          totalPages: 2,
          totalItems: 2,
          limit: 1,
        }}
      />
    );
    const nextPageButton = await screen.findByTestId('next-page-button');
    fireEvent.click(nextPageButton);

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith({
      query: { page: 2, limit: 1 },
    });
  });
  test('Prev page', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '2', limit: '10' },
      push: pushMock,
    });

    render(<Page response={mockResponse} />);
    const nextPageButton = await screen.findByTestId('prev-page-button');
    fireEvent.click(nextPageButton);

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith({
      query: { page: 1, limit: 10 },
    });
  });

  test('Click on pagination number', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1', limit: '1' },
      push: pushMock,
    });

    render(
      <Page
        response={{
          ...mockResponse,
          currentPage: 1,
          totalPages: 2,
          totalItems: 2,
          limit: 1,
        }}
      />
    );

    const pageNumber = await screen.findByTestId('pagination-number-2');

    fireEvent.click(pageNumber);

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith({
      query: { page: 2, limit: 1 },
    });
  });
});
