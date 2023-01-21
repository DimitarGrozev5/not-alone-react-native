import { View } from 'react-native';
import { LightColorsRock } from '../../styling/colors';
import { toggle } from '../../styling/toggleStyle';

type Props = {
  gap?: number;
  divider?: boolean;
};

const Spacer: React.FC<Props> = ({ gap = 16, divider = false }) => {
  return (
    <View
      style={[
        { paddingTop: gap },
        toggle(divider, {
          borderTopColor: LightColorsRock.A900,
          borderTopWidth: 1,
        }),
      ]}
    />
  );
};

export default Spacer;
