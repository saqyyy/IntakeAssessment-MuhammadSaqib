import { Divider, Group, Loader, Space, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { apiEndpoints } from '../config/apiConfig';
import { useContextApi } from '../context/Context';
import useApi from '../hooks/useApi';
import { dashboardStyles } from '../styles';
import Profile from './Profile';
import Table from './Table';

const Dashboard = () => {
  const { classes } = dashboardStyles();
  const { sendRequest, loading } = useApi();
  const { user, expenses, setExpenses } = useContextApi()

  const loadExpenses = async (showLoading: boolean = true) => {
    console.log(showLoading);

    try {
      const data = await sendRequest(apiEndpoints.getExpenses, null, "GET", showLoading);
      setExpenses(data);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleStatusChange = async (expenseId: number, status: 'approved' | 'rejected') => {
    try {
      await sendRequest(
        apiEndpoints.updateStatus(expenseId),
        { status },
        'PATCH',
        false
      );
      await loadExpenses(false);
    } catch (e) {
      console.log(e.message);

    }
  };

  return (
    <>
      <Group position='apart' className={classes.wrapper} >
        <Title align='center'>Expense Management Dashboard</Title>
        {
          user && <Profile name={user.name} email={user.email} />
        }
      </Group>
      <Divider size="xs" mb='lg' />
      <Space h="lg" />
      {
        loading ?
          <Loader className={classes.loader} /> :
          <Table expenses={expenses} handleStatusChange={handleStatusChange} />
      }
    </>
  )
}

export default Dashboard;
