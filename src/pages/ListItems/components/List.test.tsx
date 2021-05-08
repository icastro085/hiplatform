import { render, screen, fireEvent } from '@testing-library/react';
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
    }
  };

  render(<List items={items} />);

  expect(screen.queryByText('Test 01')).toBeInTheDocument();
  expect(screen.queryByText('Test 02')).toBeInTheDocument();
});

test('should not render sub-items', async () => {
  const items: IItems = {
    '0': {
      id: 'id-01',
      name: 'Test 01',
      children: {},
    },
    '1': {
      id: 'id-02',
      name: 'Test 02',
      children: {
        '0': {
          id: 'id-03',
          name: 'Test 03',
          children: {},
        }
      },
    }
  };

  render(<List items={items} />);

  expect(await screen.queryByText('Test 01')).toBeInTheDocument();
  expect(await screen.queryByText('Test 02')).toBeInTheDocument();
  expect(await screen.queryByText('Test 03')).not.toBeInTheDocument();
});

test('should render sub-items after click to show', async () => {
  const items: IItems = {
    '0': {
      id: 'id-01',
      name: 'Test 01',
      children: {
        '0': {
          id: 'id-02',
          name: 'Test 02',
          children: {},
        }
      },
    }
  };

  render(<List items={items} />);

  expect(await screen.queryByText('Test 01')).toBeInTheDocument();
  expect(await screen.queryByText('Test 02')).not.toBeInTheDocument();

  await fireEvent.click(await screen.getByText('open-icon'));

  expect(await screen.queryByText('Test 02')).toBeInTheDocument();
});

test('should render all sub-items', async () => {
  const items: IItems = {
    '0': {
      id: 'id-01',
      name: 'Test 01',
      children: {
        '0': {
          id: 'id-02',
          name: 'Test 02',
          children: {
            '0': {
              id: 'id-03',
              name: 'Test 03',
              children: {},
            },
            '1': {
              id: 'id-04',
              name: 'Test 04',
              children: {},
            }
          },
        }
      },
    }
  };

  render(<List items={items} />);

  expect(await screen.queryByText('Test 01')).toBeInTheDocument();
  expect(await screen.queryByText('Test 02')).not.toBeInTheDocument();
  expect(await screen.queryByText('Test 03')).not.toBeInTheDocument();
  expect(await screen.queryByText('Test 04')).not.toBeInTheDocument();

  await fireEvent.click(await screen.getAllByText('open-icon')[0]);
  expect(await screen.queryByText('Test 02')).toBeInTheDocument();

  await fireEvent.click(await screen.getAllByText('open-icon')[1]);
  expect(await screen.queryByText('Test 03')).toBeInTheDocument();
  expect(await screen.queryByText('Test 04')).toBeInTheDocument();
});

test('should change checkbox as true and apply for the subitems', async () => {
  const items: IItems = {
    '0': {
      id: 'id-01',
      name: 'Test 01',
      children: {
        '0': {
          id: 'id-02',
          name: 'Test 02',
          children: {
            '0': {
              id: 'id-03',
              name: 'Test 03',
              children: {},
            },
            '1': {
              id: 'id-04',
              name: 'Test 04',
              children: {},
            }
          },
        }
      },
    }
  };

  render(<List items={items} />);

  await fireEvent.click(await screen.getAllByTestId('#checkbox-item')[0]);
  await fireEvent.click(await screen.getAllByText('open-icon')[0]);

  expect(await screen.queryAllByText('checked-icon')).toHaveLength(2);

  await fireEvent.click(await screen.getAllByText('open-icon')[1]);
  expect(await screen.queryAllByText('checked-icon')).toHaveLength(4);
});
