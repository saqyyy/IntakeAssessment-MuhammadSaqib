import React from 'react'
import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { ExpenseForm } from './ExpenseForm';
import { addExpense } from '../../styles';

const AddExpense = () => {
  const { classes } = addExpense();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal closeOnClickOutside={false} opened={opened} onClose={close} title="Add New Expense">
        <ExpenseForm close={close} />
      </Modal>
      <div className={classes.buttonWrapper}>
        <Button onClick={open} variant="light" radius="xs" size="md">
          Add Expense
        </Button>
      </div>
    </>
  )
}

export default AddExpense
