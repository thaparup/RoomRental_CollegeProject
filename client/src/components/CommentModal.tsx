import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';

export default function CommentModal() {

    const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
<Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open Modal</Button>
      </Group>
    </>
  );
    </div>
  )
}
