
import { Table, Group, Button, Text, Avatar } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { TableComponentProps } from '../interfaces';
import { table } from '../styles';

function TableComponent({ expenses, handleStatusChange }: TableComponentProps) {
  const { classes } = table();

  const rows = expenses.map((element) => (
    <tr key={element.id}>
      <td>
        <Avatar
          radius="50%"
          src={element.picture}
          alt="it's me"
          size='md'
        />
      </td>
      <td>{element.name}</td>
      <td className='email'>{element.amount}</td>
      <td>
        {
          element.status !== 'pending'
            ? <Text className={classes[element.status]}>{element.status}</Text>
            : <>
              {
                handleStatusChange
                  ? (
                    <Group spacing="sm">
                      <Button onClick={() => { handleStatusChange(element.id, 'rejected') }} variant="light" color="red" radius="xs">
                        <IconX />
                      </Button>
                      <Button onClick={() => { handleStatusChange(element.id, 'approved') }} variant="light" color="teal" radius="xs">
                        <IconCheck />
                      </Button>
                    </Group>
                    )
                  :
                  <Text c="#F29339">{element.status}</Text>
              }
            </>
        }
      </td>
    </tr>
  ));

  return (
    <Table verticalSpacing="xs" className={classes.tableWrapper} withBorder>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default TableComponent;
