import { render, screen } from '@testing-library/react';
import List from './List';
import { IItems } from '../../../models/Items';

test('should render component with items', async () => {
  const items: IItems = {
    '0': {
      id: 'id-01',
      name: 'Test 01',
      children: {},
    },
    '1': {
      id: 'id-02',
      name: 'Test 02',
      children: {},
    }
  };

  render(<List items={items} />);

  expect(await screen.queryByText('Test 01')).toBeInTheDocument();
  expect(await screen.queryByText('Test 02')).toBeInTheDocument();
});
