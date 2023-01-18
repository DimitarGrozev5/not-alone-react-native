import { View } from 'react-native';

type Props = {
  gap?: number;
};

const Spacer: React.FC<Props> = ({ gap = 8 }) => {
  return <View style={{ paddingTop: gap }} />;
};

export default Spacer;
