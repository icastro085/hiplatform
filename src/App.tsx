import { GlobalStyle } from './styles/shared';
import Router from './Router';
import Container from './components/Container';

export default function App() {
  return (
    <>
      <Container>
        <Router />
      </Container>
      <GlobalStyle />
    </>
  );
}
