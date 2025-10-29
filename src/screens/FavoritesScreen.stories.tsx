import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FavoritesScreen } from './FavoritesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Mock navigation wrapper
const Stack = createStackNavigator();

const NavigationWrapper = ({ children }: { children: React.ReactNode }) => (
  <NavigationContainer independent={true}>
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={() => <>{children}</>} />
    </Stack.Navigator>
  </NavigationContainer>
);

const meta: Meta<typeof FavoritesScreen> = {
  title: 'Screens/FavoritesScreen',
  component: FavoritesScreen,
  decorators: [
    Story => (
      <NavigationWrapper>
        <Story />
      </NavigationWrapper>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFavorites: Story = {
  parameters: {
    mockData: {
      favorites: [
        {
          id: 'fav1',
          product_id: 'prod1',
          created_at: new Date().toISOString(),
        },
        {
          id: 'fav2',
          product_id: 'prod2',
          created_at: new Date().toISOString(),
        },
      ],
    },
  },
};

export const EmptyState: Story = {
  parameters: {
    mockData: {
      favorites: [],
    },
  },
};

export const Loading: Story = {
  parameters: {
    mockData: {
      loading: true,
    },
  },
};
