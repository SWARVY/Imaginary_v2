import { LineShadow } from '@/shared/ui/text-animation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <section className="flex flex-col">
      <LineShadow
        className="font-family-montserrat text-6xl font-bold italic"
        shadowColor="white"
      >
        IMAGINARY
      </LineShadow>
    </section>
  );
}
