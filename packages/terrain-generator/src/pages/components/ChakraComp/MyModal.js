import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton
  } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'

function MyModal(isDisabled) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
  return (
    <>
      <IconButton rounded="full" colorScheme="orange" onClick={onOpen} aria-label='Search database' icon={<InfoOutlineIcon />} mb="2" p="5"/>

      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terrain Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <h3 className='flex flex-row mb-3'>Sea: <div style={{width:"300px", height:"30px", backgroundColor:"#0366a4", marginLeft:"30px", borderRadius:"25px"}}></div></h3>
                <h3 className='flex flex-row mb-3'>Mount: <div style={{width:"300px", height:"30px", backgroundColor:"#beb89f", marginLeft:"8px", borderRadius:"25px"}}></div></h3>
                <h3 className='flex flex-row'>Land: <div style={{width:"300px", height:"30px", backgroundColor:"#547315", marginLeft:"21px", borderRadius:"25px"}}></div></h3>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MyModal
