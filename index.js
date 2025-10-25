import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';
import App from './App';
import StorybookUIRoot from './.storybook';

// Should we show storybook?
const SHOW_STORYBOOK = Constants.expoConfig?.extra?.storybook ?? false;

const RootComponent = SHOW_STORYBOOK && __DEV__ ? StorybookUIRoot : App;

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(RootComponent);
