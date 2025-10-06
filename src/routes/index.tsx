import { Shuffle } from '@/shared/ui/shuffle';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <section className="flex flex-col">
      <Shuffle className="font-bold" text="Hello." loop loopDelay={1} />
    </section>
  );
}
