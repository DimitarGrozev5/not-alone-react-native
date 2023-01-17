import { ImageBackground, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Props = React.PropsWithChildren;

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/bgImage.jpg')}
        resizeMode="cover"
        style={styles.container}
      >
        <StatusBar style="auto" />
        {children}
      </ImageBackground>
    </View>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    zIndex: -1,
  },
});
