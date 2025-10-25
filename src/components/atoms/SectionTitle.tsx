import React from 'react';
import { Title, TitleProps } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

interface SectionTitleProps extends Omit<TitleProps, 'style'> {
  children: React.ReactNode;
  fontSize?: number;
  fontWeight?: string;
  marginBottom?: number;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  fontSize = 18,
  fontWeight = '600',
  marginBottom = 16,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Title
      style={{
        fontSize,
        fontWeight: fontWeight as any,
        marginBottom,
        color: theme.colors.onSurface,
      }}
      {...props}
    >
      {children}
    </Title>
  );
};
