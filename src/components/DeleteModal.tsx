import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
  } from '@chakra-ui/react'
import { RefObject } from 'react'

  interface Props {
    isOpen: boolean,
    onClose: () => void,
    cancelRef: RefObject<FocusableElement>
  }

  interface FocusableElement {
    focus(options?: {preventScroll?: boolean;}): void;
  }

const DeleteModal = (props: Props) => {
  return (
    <AlertDialog
        isOpen={props.isOpen}
        leastDestructiveRef={props.cancelRef}
        onClose={props.onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={props.onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={props.onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}

export default DeleteModal