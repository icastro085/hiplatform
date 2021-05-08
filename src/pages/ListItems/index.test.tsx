import { render, screen, act } from '@testing-library/react';

import { getAll } from '../../api/server';
import List from './components/List';

import ListItems from './';

jest.mock('../../api/server', () => ({
  getAll: jest.fn(async () => Promise.resolve({})),
}));

jest.mock('./components/List', () => ({
  __esModule: true,
  default: jest.fn(() => <div>List</div>),
}));

const getAllMock = getAll as jest.Mock;
const ListMock = List as jest.Mock;

test('shound render list component', async () => {
  ListMock.mockImplementation(() => {
    return <div>List</div>
  });

  getAllMock.mockImplementation(() => ({
    getAll: jest.fn(async () => Promise.resolve({})),
  }));

  await act(async () => {
    render(<ListItems />);
  });

  expect(screen.queryByText('List')).toBeInTheDocument();
});
