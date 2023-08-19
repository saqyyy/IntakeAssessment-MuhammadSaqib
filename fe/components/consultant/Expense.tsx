import { Divider, Group, Loader, Title } from '@mantine/core';
import { useEffect } from 'react';
import { apiEndpoints } from '../../config/apiConfig';
import { useContextApi } from '../../context/Context';
import useApi from '../../hooks/useApi';
import { expensesStyles } from '../../styles';
import Profile from '../Profile';
import Table from '../Table';
import AddExpense from './AddExpense';

const ExpenseComponent = () => {
  const { classes } = expensesStyles();
  const { user, expenses, setExpenses } = useContextApi()
  const { sendRequest, loading } = useApi();

  useEffect(() => {
    (async () => {
      try {
        const data = await sendRequest(apiEndpoints.getUserExpenses);
        setExpenses(data);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  return (
    <>
      <Group position='apart' className={classes.wrapper}>
        <Title align='center'>{user.name} - Expenses</Title>
        {
          user && <Profile name={user.name} email={user.email} />
        }
      </Group>
      <Divider size="xs" mb='lg' />
      <AddExpense />
      {loading ?
        <Loader className={classes.loader} /> :
        <Table expenses={expenses} />
      }
    </>
  )
}

export default ExpenseComponent;
