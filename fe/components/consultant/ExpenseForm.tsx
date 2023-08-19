import { useForm } from '@mantine/form';
import {
  TextInput,
  Paper,
  Group,
  Button,
  Stack,
  NumberInput,
  Loader,
} from '@mantine/core';
import { ImageUpload } from './ImageUpload';
import { apiEndpoints } from '../../config/apiConfig';
import { useContextApi } from '../../context/Context';
import useApi from '../../hooks/useApi';
import { useState } from 'react';
import { ExpenseFormProps } from '../../interfaces';
import { addExpenseFormStyles } from '../../styles';

export function ExpenseForm(props: ExpenseFormProps) {
  const { sendRequest, loading } = useApi();
  const { setExpenses } = useContextApi()
  const { classes } = addExpenseFormStyles();

  const [imageName, setImageName] = useState<string | undefined>();
  const form = useForm({
    initialValues: {
      name: '',
      amount: 0,
      image: null,
    },

    validate: {
      name: (val) => (val.trim().length > 0 ? null : 'Invalid email'),
      amount: (val) => (val < 0 ? 'Amount must be more than 0' : null),
    },
  });

  const handleFormSubmission = async () => {
    try {
      const { name, amount } = form.values;
      const { data } = await sendRequest(
        apiEndpoints.createExpense,
        { name, amount, picture: imageName },
        'POST'
      );
      setExpenses(prev => ([...prev, data]));
      props.close();
    } catch (e) {
      console.log(e.message);
    }
  }

  function getImageName(imgName: string) {
    setImageName(imgName);
  }

  return (
    <Paper radius="md" p="xl" {...props}>
      <form onSubmit={form.onSubmit(handleFormSubmission)}>
        <Stack>
          <TextInput
            required
            label="Name"
            placeholder="Enter expense name"
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            error={form.errors.name && 'Please fill out expense name'}
            radius="md"
          />

          <NumberInput
            required
            label="Amout"
            placeholder="Enter expense amount"
            value={form.values.amount}
            onChange={(number) => {
              form.setFieldValue('amount', +number)
            }}
            error={form.errors.amount && 'Expense amount missing'}
            radius="md"
          />

          <ImageUpload getImageName={getImageName} />
        </Stack>

        <Group position="right" mt="xl">
          <Button type="submit" radius="xl" size="md" className={classes.button}>
            {loading ?
              <Loader color='#fff' size="sm" />
              : 'Submit'}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
