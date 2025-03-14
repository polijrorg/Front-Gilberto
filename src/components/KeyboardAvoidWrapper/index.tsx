import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, DimensionValue } from 'react-native';

interface KeyboardAvoidWrapperProps {
  children: React.ReactNode;
  maxHeight?: DimensionValue,
}

const KeyboardAvoidWrapper: React.FC<KeyboardAvoidWrapperProps> = ({ children, maxHeight }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', maxHeight: maxHeight ?? 'auto' }}>
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidWrapper;
