import { USER } from '../config/user';
import { AnimatedSpan, Terminal, TypingAnimation } from '@/shared/ui/terminal';
import { LineShadow } from '@/shared/ui/text-animation';
import { Github, Instagram } from 'lucide-react';
import { Button, Card, Image, Link, Text, View } from 'reshaped';

export default function Home() {
  return (
    <View width="100%" height="100%" align="center" gap={16}>
      <LineShadow
        className="font-family-montserrat text-5xl font-bold italic sm:text-6xl"
        shadowColor="white"
      >
        IMAGINARY
      </LineShadow>
      <View width="100%" height="100%" align="center" gap={4}>
        <TerminalContent />
        <Profile />
      </View>
    </View>
  );
}

function TerminalContent() {
  return (
    <Terminal className="h-130 max-w-full">
      <TypingAnimation delay={800}>$ pnpm install</TypingAnimation>
      <AnimatedSpan delay={1600} className="text-gray-400">
        Installing packages...
      </AnimatedSpan>
      <AnimatedSpan delay={2200} className="text-green-500">
        + @swarvy/frontend-skills@latest
      </AnimatedSpan>
      <AnimatedSpan delay={2600} className="text-green-500">
        + @swarvy/creative-thinking@latest
      </AnimatedSpan>
      <AnimatedSpan delay={3000} className="text-green-500">
        + @swarvy/coffee-dependency@∞
      </AnimatedSpan>
      <AnimatedSpan delay={3400} className="text-blue-500">
        added 3 packages in 2.4s
      </AnimatedSpan>
      <TypingAnimation delay={4200}>$ pnpm dev</TypingAnimation>
      <AnimatedSpan delay={5000} className="text-green-500">
        CREATIVITY ENGINE v∞ ready in 0.42s ✨
      </AnimatedSpan>
      <AnimatedSpan delay={5400} className="text-cyan-500">
        ➜ Local: http://localhost:3000
      </AnimatedSpan>
      <AnimatedSpan delay={5800} className="text-yellow-500">
        👨‍💻 Frontend Developer
      </AnimatedSpan>
      <AnimatedSpan delay={6200} className="text-yellow-500">
        🎨 UI/UX Enthusiast
      </AnimatedSpan>
      <AnimatedSpan delay={6600} className="text-yellow-500">
        ☕ Coffee == Code
      </AnimatedSpan>
      <AnimatedSpan delay={7000} className="font-bold text-green-500">
        ✨ Ready to create magic
      </AnimatedSpan>
    </Terminal>
  );
}

function Profile() {
  return (
    <Card className="w-full bg-transparent!">
      <View width="100%" direction="row" align="center" justify="space-between">
        <View direction="row" align="center" gap={2}>
          <View width={12} aspectRatio={1}>
            <Image
              className="rounded-full"
              src={USER.image}
              alt="profile"
              width="100%"
            />
          </View>
          <View direction="column" gap={1}>
            <Text variant="body-3" weight="bold">
              {USER.name}
            </Text>
            <Text variant="caption-1" color="neutral-faded">
              {USER.role}
            </Text>
          </View>
        </View>
        <View direction="row" align="center" gap={2}>
          <Link
            href={USER.github}
            attributes={{ target: '_blank', rel: 'noopener noreferrer' }}
          >
            <Button variant="ghost" icon={Github} />
          </Link>
          <Link
            href={USER.instagram}
            attributes={{ target: '_blank', rel: 'noopener noreferrer' }}
          >
            <Button variant="ghost" icon={Instagram} />
          </Link>
        </View>
      </View>
    </Card>
  );
}
