import { upperFirst, useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Loader,
} from '@mantine/core';

import { authForm } from '../styles';
import { useContextApi } from '../context/Context';
import { apiEndpoints } from '../config/apiConfig';
import { SignupPayload } from '../interfaces';
import { useState } from 'react';
import useApi from '../hooks/useApi';


export function AuthenticationForm(props: PaperProps) {
  const { setUser } = useContextApi();
  const {sendRequest, loading} = useApi();
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
    try {
      const { name, email, password, role } = form.values;
      const payload: SignupPayload = { name, email, password, role: role ? 'admin' : 'user'};

      const resData = await sendRequest(apiEndpoints.signup, payload, 'POST');
      
      if (resData?.statusCode) { 
        throw new Error(resData?.message || 'something went wrong');
      }
    } catch (e) {
      console.log(e.message);
    } finally{
    }
  };

  const handleClearForm = () => {
    form.setFieldValue('email', '');
    form.setFieldValue('name', '');
    form.setFieldValue('password', '');
  };

  return (
    <Paper className={classes.formWrapper} shadow='lg' radius="md" p="xl" {...props}>
      <Text size="lg" weight={500} ta="center">
        {type === 'login' ? 'Login' : 'Register'}
      </Text>

      <Divider label={`Enter your ${type === 'login' ? 'Login' : 'Register' } details`} labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(type==='login' ? handleLogin : handleSignup)}>
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
