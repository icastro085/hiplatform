import { render, screen } from '@testing-library/react';
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
