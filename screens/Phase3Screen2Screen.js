import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import palettes from '../themes/palettes';
import useWindowDimensions from '../utils/useWindowDimensions';

const Phase3Screen2Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return <ScreenContainer hasSafeArea={false} scrollable={false} />;
};

export default withTheme(Phase3Screen2Screen);
