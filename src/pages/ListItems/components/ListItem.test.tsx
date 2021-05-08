import { render, screen, fireEvent, act } from '@testing-library/react';
import ListItem from './ListItem';
import { IItem } from '../../../models/Items';

test('should render component with name', async () => {
  const item: IItem = {
    id: 'id-01',
    name: 'Test 01',
    children: {},
  };

  render(<ListItem item={item} />);

  expect(screen.queryByText('Test 01')).toBeInTheDocument();
});

test('should render children component with no items', async () => {
  const item: IItem = {
    id: 'id-01',
    name: 'Test 01',
    children: {},
  };

  render(<ListItem item={item} renderSubItems={() => <>test-children</>} />);

  expect(screen.queryByText('test-children')).not.toBeInTheDocument();
});

test('should render children component with items', async () => {
  const item: IItem = {
    id: 'id-01',
    name: 'Test 01',
    children: {
      '0': {
        id: 'id-02',
        name: 'Test 02',
        children: {},
      }
    },
  };

  await act(async() => {
    render(<ListItem item={item} renderSubItems={() => <>test-children</>} />);
  });

  expect(screen.queryByText('test-children')).not.toBeInTheDocument();

  await fireEvent.click(screen.getByText('open-icon'));
  expect(screen.queryByText('test-children')).toBeInTheDocument();
});

test('should dispacth onChangeCheckbox', async () => {
  const item: IItem = {
    id: 'id-01',
    name: 'Test 01',
    children: {},
  };

  const onChangeCheckbox = jest.fn();

  render(<ListItem item={item} onChangeCheckbox={onChangeCheckbox} />);

  expect(onChangeCheckbox).not.toHaveBeenCalled();

  await fireEvent.click(screen.getByTestId('#checkbox-item'));
  expect(onChangeCheckbox).toHaveBeenCalledWith(true);

  await fireEvent.click(screen.getByTestId('#checkbox-item'));
  expect(onChangeCheckbox).toHaveBeenCalledWith(false);
});
