'use client'
import CreateItemForm from './forms/create-item'
import { Button, useDisclosure } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader } from '@nextui-org/modal'
import { PlusSignIcon } from 'hugeicons-react'

export default function UploadInventory() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={<PlusSignIcon className="h-5 w-5" />}
      >
        Crear Artículo
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Artículo
              </ModalHeader>
              <CreateItemForm onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
