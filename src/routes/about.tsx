import { About } from '@/pages/about';
import { createFileRoute } from '@tanstack/react-router';
import { Container } from 'reshaped';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container width="480px" height="100%">
      <About />
    </Container>
  );
}
