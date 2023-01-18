import { observer } from 'mobx-react-lite';
import { useForm, Controller } from 'react-hook-form';

import UiButton from '../../components/inputs/ui-button';
import UiTextInput from '../../components/inputs/ui-text-input';
import AppLayout from '../../components/layout/app-layput';
import Card from '../../components/layout/card';
import Spacer from '../../components/layout/spacer';
import H2 from '../../components/typography/h2';
import { useStore } from '../../store/useStore';

type RegisterFormData = {
  email: string;
  repeatEmail: string;
  name: string;
  phone: string;
  password: string;
  repeatPassword: string;
};

const Register: React.FC = observer(() => {
  const userDataStore = useStore('userData');

  const { control, handleSubmit, watch } = useForm<RegisterFormData>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      repeatEmail: '',
      name: '',
      phone: '',
      password: '',
      repeatPassword: '',
    },
  });

  const submitHandler = (data: RegisterFormData) => {
    userDataStore.register({
      email: data.email,
      name: data.name,
      phone: data.phone,
      password: data.password,
    });
  };

  return (
    <AppLayout>
      <Card>
        <H2>Register a new account</H2>
        <Spacer />
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Please enter your Email',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid Email',
            },
          }}
          render={({
            field: { value, onChange, onBlur },
            formState: { errors },
          }) => (
            <UiTextInput
              label="Enter your email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Spacer />

        <Controller
          control={control}
          name="repeatEmail"
          rules={{
            validate: (value) => {
              const email = watch('email');
              if (value === '' && email === '') return true;
              if (value !== email) return "Emails don't match";
            },
          }}
          render={({
            field: { value, onChange, onBlur },
            formState: { errors },
          }) => (
            <UiTextInput
              label="Repeat email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.repeatEmail}
              helperText={errors.repeatEmail?.message}
            />
          )}
        />
        <Spacer />

        <Controller
          control={control}
          name="name"
          rules={{ required: 'Please enter your name' }}
          render={({
            field: { value, onChange, onBlur },
            formState: { errors },
          }) => (
            <UiTextInput
              label="Enter your name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Spacer />

        <Controller
          control={control}
          name="phone"
          rules={{ required: 'Please enter your phone' }}
          render={({
            field: { value, onChange, onBlur },
            formState: { errors },
          }) => (
            <UiTextInput
              label="Enter your phone"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />
        <Spacer />

        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Please enter a password',
            minLength: {
              value: 6,
              message: 'Password must be at least six characters',
            },
          }}
          render={({
            field: { value, onChange, onBlur },
            formState: { errors },
          }) => (
            <UiTextInput
              label="Enter a password"
              password
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Spacer />

        <Controller
          control={control}
          name="repeatPassword"
          rules={{
            validate: (value) => {
              const email = watch('password');
              if (value === '' && email === '') return true;
              if (value !== email) return "Paswords don't match";
            },
          }}
          render={({
            field: { value, onChange, onBlur },
            formState: { errors },
          }) => (
            <UiTextInput
              label="Repeat your password"
              password
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.repeatPassword}
              helperText={errors.repeatPassword?.message}
            />
          )}
        />
        <Spacer />

        <UiButton onPress={handleSubmit(submitHandler)}>
          Register your new Account
        </UiButton>
      </Card>
    </AppLayout>
  );
});

export default Register;
