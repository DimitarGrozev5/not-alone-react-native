import { ImageBackground, View, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = React.PropsWithChildren;

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../../assets/bgImage.jpg')}
      resizeMode="cover"
      style={[styles.rootView, styles.container]}
    >
      <KeyboardAwareScrollView>
        <View style={styles.rootView}>
          <StatusBar style="light" />
          {children}
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'stretch',
  },
});
