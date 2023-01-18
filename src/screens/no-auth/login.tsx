import { useState } from 'react';
import { Text } from 'react-native';
import UiButton from '../../components/inputs/ui-button';
import UiTextInput from '../../components/inputs/ui-text-input';
import AppLayout from '../../components/layout/app-layput';
import Card from '../../components/layout/card';
import Spacer from '../../components/layout/spacer';
import UiText from '../../components/typography/generic-text';
import H2 from '../../components/typography/h2';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AppLayout>
      <Card>
        <H2>Login to your account</H2>
        <Spacer />

        <UiTextInput label="Email" value={email} onChangeText={setEmail} />
        <Spacer />

        <UiTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          password
        />
        <Spacer />

        <UiButton onPress={() => {}}>Login</UiButton>
      </Card>
    </AppLayout>
  );
};

export default Login;
