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

  expect(await screen.queryByText('Test 01')).toBeInTheDocument();
});

test('should render children component with no items', async () => {
  const item: IItem = {
    id: 'id-01',
    name: 'Test 01',
    children: {},
  };

  render(<ListItem item={item}>test-children</ListItem>);

  expect(await screen.queryByText('test-children')).not.toBeInTheDocument();
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
    render(<ListItem item={item}>test-children</ListItem>);
  });

  expect(await screen.queryByText('test-children')).not.toBeInTheDocument();

  await fireEvent.click(await screen.getByText('open-icon'));
  expect(screen.queryByText('test-children')).toBeInTheDocument();
});
