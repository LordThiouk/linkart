import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { RoleSelector } from './RoleSelector';
import { Headphones, ShoppingBag, Users } from 'lucide-react-native';

const meta: Meta<typeof RoleSelector> = {
  title: 'features/auth/RoleSelector',
  component: RoleSelector,
};

export default meta;
type Story = StoryObj<typeof RoleSelector>;

const mockRoles = [
  {
    id: 'buyer' as const,
    icon: Headphones,
    title: 'Acheteur',
    description: 'Je cherche des beats et des sons pour mes projets',
  },
  {
    id: 'seller' as const,
    icon: ShoppingBag,
    title: 'Vendeur',
    description: 'Je veux vendre mes productions et beats',
  },
  {
    id: 'both' as const,
    icon: Users,
    title: 'Les deux',
    description: "J'achète et je vends de la musique",
  },
];

export const Default: Story = {
  render: () => {
    const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | 'both' | null>(null);
    return <RoleSelector roles={mockRoles} selectedRole={selectedRole} onSelectRole={setSelectedRole} />;
  },
};
