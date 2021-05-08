import { IItems } from '../models/Items';
import items from './data/items.json';

export const getAll = async (): Promise<IItems> => {
  return Promise.resolve(items);
};
