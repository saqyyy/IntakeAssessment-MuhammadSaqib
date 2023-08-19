import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Menu,
} from '@mantine/core';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';

import { useContextApi } from '../context/Context';
import { ProfileProps } from '../interfaces';
import { profile } from '../styles';

function Profile({name, email, image}: ProfileProps) {
  const { setUser } = useContextApi();
  const { classes } = profile();

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton className={classes.user}>
        <Group>
          <Avatar src={image || ''} radius="xl" />
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>

            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </div>

          <IconChevronRight size="0.9rem" stroke={1.5} />
        </Group>
      </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconLogout size={14} />} onClick={logout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Profile;
