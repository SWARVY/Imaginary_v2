import { USER } from '../config/user';
import { Github, Instagram } from 'lucide-react';
import { Button, Card, Image, Link, Text, View } from 'reshaped';

export default function Profile() {
  return (
    <Card className="w-full bg-transparent!">
      <View width="100%" direction="row" align="center" justify="space-between">
        <View direction="row" align="center" gap={2}>
          <View width={12} aspectRatio={1}>
            <Image
              className="rounded-full"
              src={USER.image}
              alt={USER.name}
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
