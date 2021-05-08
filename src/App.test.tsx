import { render } from '@testing-library/react';
import App from './App';

jest.mock('./components/DBProvider');

test('renders learn react link', () => {
  render(<App />);
});
