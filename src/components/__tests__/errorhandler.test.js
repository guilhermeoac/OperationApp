import { Errorhandler } from '../ErrorHandler';

describe('Errorhandler', () => {
  let mockNavigate;
  let mockToast;

  beforeEach(() => {
    mockNavigate = jest.fn();
    mockToast = {
      error: jest.fn(),
    };
  });

  test('navigates to home and shows "Session expired!" message for 401 status', () => {
    const mockData = {
      status: 401,
      error: {
        message: 'Unauthorized',
      },
    };

    Errorhandler(mockData, mockNavigate, mockToast);

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockToast.error).toHaveBeenCalledWith('Session expired!');
  });

  test('navigates to home and shows "Session expired!" message for 403 status', () => {
    const mockData = {
      status: 403,
      error: {
        message: 'Forbidden',
      },
    };

    Errorhandler(mockData, mockNavigate, mockToast);

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockToast.error).toHaveBeenCalledWith('Session expired!');
  });

  test('shows error message from data for non-401/403 statuses', () => {
    const mockData = {
      status: 500,
      error: {
        message: 'Internal Server Error',
      },
    };

    Errorhandler(mockData, mockNavigate, mockToast);

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockToast.error).toHaveBeenCalledWith('Internal Server Error');
  });

  test('logs data in the console', () => {
    console.log = jest.fn();
    const mockData = {
      status: 500,
      error: {
        message: 'Some error',
      },
    };

    Errorhandler(mockData, mockNavigate, mockToast);

    expect(console.log).toHaveBeenCalledWith(mockData);
  });
});