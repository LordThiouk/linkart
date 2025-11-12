/**
 * Decorator pour gérer le state des composants interactifs dans Storybook
 *
 * Ce decorator permet aux composants contrôlés (Checkbox, Switch, etc.)
 * de fonctionner de manière interactive dans Storybook en gérant
 * automatiquement leur état interne.
 */

import React, { useState } from 'react';
import type { Decorator } from '@storybook/react';

/**
 * Wrapper component pour Checkbox/Switch avec state management
 */
const CheckboxWrapper = ({ Story, args }: any) => {
  const [checked, setChecked] = useState(args.checked ?? false);

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked);
    args.onCheckedChange?.(newChecked);
  };

  return <Story args={{ ...args, checked, onCheckedChange: handleChange }} />;
};

/**
 * Wrapper component pour RadioGroup/Select/Slider avec value management
 */
const ValueWrapper = ({ Story, args }: any) => {
  const [value, setValue] = useState(args.value);

  const handleChange = (newValue: any) => {
    setValue(newValue);
    args.onValueChange?.(newValue);
  };

  return <Story args={{ ...args, value, onValueChange: handleChange }} />;
};

/**
 * Wrapper component pour Dialog/Sheet/Popover avec open management
 */
const OpenWrapper = ({ Story, args }: any) => {
  const [open, setOpen] = useState(args.open ?? false);

  const handleChange = (newOpen: boolean) => {
    setOpen(newOpen);
    args.onOpenChange?.(newOpen);
  };

  return <Story args={{ ...args, open, onOpenChange: handleChange }} />;
};

/**
 * Decorator qui enveloppe les stories avec un state management automatique
 * pour les composants contrôlés (checked, value, etc.)
 */
export const withInteractiveState: Decorator = (Story, context) => {
  const { args } = context;

  // Pattern 1: Checkbox, Switch (checked)
  if ('checked' in args && typeof args.checked === 'boolean') {
    return <CheckboxWrapper Story={Story} args={args} />;
  }

  // Pattern 2: RadioGroup, Select, Slider (value)
  if ('value' in args && args.value !== undefined) {
    return <ValueWrapper Story={Story} args={args} />;
  }

  // Pattern 3: Dialog, Sheet, Popover (open)
  if ('open' in args && typeof args.open === 'boolean') {
    return <OpenWrapper Story={Story} args={args} />;
  }

  // Si aucun pattern détecté, retourner la story normale
  return <Story />;
};

export default withInteractiveState;
