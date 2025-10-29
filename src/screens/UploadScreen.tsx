import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UploadFormContainer } from '../features/uploads/components/UploadFormContainer';

export function UploadScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <UploadFormContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
