import {
  Anchor, Button, Checkbox, Divider, Group, Loader, Paper, PaperProps, PasswordInput, Stack, Text, TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';

import { notifications } from '@mantine/notifications';
import { apiEndpoints } from '../config/apiConfig';
import { useContextApi } from '../context/Context';
import useApi from '../hooks/useApi';
import { SignupPayload } from '../interfaces';
import { authForm } from '../styles';
import { Notifications } from '@mantine/notifications';


export function AuthenticationForm(props: PaperProps) {
  const { setUser } = useContextApi();
  const { sendRequest, loading } = useApi();
  const { classes } = authForm();
  const [type, toggle] = useToggle(['login', 'register']);

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      role: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleLogin = async () => {
    try {
      const { email, password } = form.values;
      const resData = await sendRequest(apiEndpoints.login, { email, password }, 'POST');
      if (resData?.statusCode) {
        throw new Error('invalid email or password')
      }
      const { data } = resData;

      setUser(prevState => {
        return {
          ...prevState,
          ...data,
        }
      });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (e) {
      console.log(e.message);
    } finally {
    }
  };

  const handleSignup = async () => {
    const { name, email, password, role } = form.values;
    const payload: SignupPayload = { name, email, password, role: role ? 'admin' : 'user' };

    const resData = await sendRequest(apiEndpoints.signup, payload, 'POST');

    if (resData?.statusCode) {
      throw new Error(resData?.message || 'Something went wrong');
    }
    notifications.show({
      title: 'Success.',
      message: 'Account created successfully.',
      autoClose: 5000,
      color: 'green',
    });
    toggle('login');
  };

  const handleClearForm = () => {
    form.setFieldValue('email', '');
    form.setFieldValue('name', '');
    form.setFieldValue('password', '');
  };

  return (
    <Paper className={classes.formWrapper} shadow='lg' radius="md" p="xl" {...props}>
      <Notifications position='top-right' />
      <Text size="lg" weight={500} ta="center">
        {type === 'login' ? 'Login' : 'Register'}
      </Text>

      <Divider label={`Enter your ${type === 'login' ? 'Login' : 'Register'} details`} labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(type === 'login' ? handleLogin : handleSignup)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="example@email.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="Signup as admin"
              checked={form.values.role}
              onChange={(event) => form.setFieldValue('role', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group position="right" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => {
              handleClearForm();
              toggle();
            }}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" className={classes.button}>
            {loading ?
              <Loader color='#fff' size="sm" />
              : upperFirst(type)
            }
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
