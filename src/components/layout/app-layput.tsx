import { ImageBackground, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Props = React.PropsWithChildren;

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.rootView}>
      <ImageBackground
        source={require('../../../assets/bgImage.jpg')}
        resizeMode="cover"
        style={[styles.rootView, styles.container]}
      >
        <StatusBar style="light" />
        {children}
      </ImageBackground>
    </View>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'stretch',
  },
});
