import { Home } from '@/pages/home';
import { createFileRoute } from '@tanstack/react-router';
import { Container } from 'reshaped';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <Container width="480px" height="100%">
      <Home />
    </Container>
  );
}
