import { getAll } from './server';

jest.mock('./data/items.json', () => true);

test('should server return list of items', async () => {
  const items = await getAll();
  expect(items).toBe(true);
});
