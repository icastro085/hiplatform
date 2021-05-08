import { GlobalStyle } from './styles/shared';
import Router from './Router';
import Container from './components/Container';
import DBProvider from './components/DBProvider';

export default function App() {
  return (
    <>
      <DBProvider>
        <Container>
          <Router />
        </Container>
      </DBProvider>
      <GlobalStyle />
    </>
  );
}
