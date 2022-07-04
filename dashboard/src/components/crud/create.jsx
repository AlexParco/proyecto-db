import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  useDisclosure,
  InputGroup,
  Flex,
  FormControl,
  DrawerFooter,
  InputLeftElement,
  Divider,
} from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import { useEmployee } from "../../context/emp.context";

// TODO: authenticate form fields
const CreateMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { addEmployee } = useEmployee()
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [deptname, setDeptname] = useState('')
  const [salary, setSalary] = useState('')
  const [gender, setGender] = useState('')
  const [hiredate] = useState(new Date())
  const firstField = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    let employee = {
      "dept_name": deptname,
      "first_name": firstname,
      "last_name": lastname,
      "salary": parseInt(salary),
      "gender": gender,
      "hire_date": hiredate.toISOString().split('T')[0]
    }
    addEmployee(employee)
    onClose()
  }

  return (
    <>
      <Button ref={firstField} onClick={onOpen} colorScheme="blue" size="sm" leftIcon={<AddIcon />} variant="ghost" m={1} ml={4}> Crear</Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Crear Nuevo empleado
          </DrawerHeader>

          <DrawerBody>
            <Flex
              id="create"
              flexDirection="column"
              mt={4}
              p={4}
              borderRadius={8}
              border='0px'
              as='form' onSubmit={handleSubmit}
            >
              <FormControl isRequired>
                <Input
                  placeholder='Nombre'
                  mb={6}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <Input
                  placeholder='Apellidos'
                  mb={6}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <Input
                  placeholder='Nombre de dapartamento'
                  mb={6}
                  onChange={(e) => setDeptname(e.target.value)}
                />
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children='$'
                  />
                  <Input
                    placeholder='Ingrese un monto'
                    mb={6}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </InputGroup>
                <Input
                  mb={6}
                  w='auto'
                  placeholder='Genero'
                  onChange={(e) => setGender(e.target.value)}
                />
                <Input
                  mb={6}
                  w='auto'
                  placeholder={hiredate.toLocaleString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  isDisabled={true}
                />
              </FormControl>
            </Flex>
          </DrawerBody>
          <Divider />
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' colorScheme='blue' form="create">Guardar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CreateMenu