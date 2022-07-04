import React, { useEffect, useState } from "react";
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
  useToast,
} from '@chakra-ui/react'
import { EditIcon, Icon } from "@chakra-ui/icons";
import { useEmployee } from "../../context/emp.context";

// TODO: authenticate form fields
const EditMenu = ({ emp = { first_name: '' } }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { updateEmployee } = useEmployee()
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
      "dept_name": !deptname ? emp.dept_name : deptname,
      "first_name": !firstname ? emp.first_name : firstname,
      "last_name": !lastname ? emp.last_name : lastname,
      "salary": !salary ? emp.salary : parseInt(salary),
      "gender": !gender ? emp.gender : gender,
      "hire_date": !hiredate ? emp.hire_date : hiredate.toISOString().split('T')[0]
    }

    updateEmployee(employee, emp.id)
    onClose()
  }

  return (
    <>
      <Button ref={firstField} onClick={onOpen} colorScheme="teal" size="sm" ><Icon as={EditIcon} /></Button>
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
            Editar Empleado
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
              <FormControl>
                <Input
                  mb={6}
                  placeholder={emp.first_name}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <Input
                  mb={6}
                  placeholder={emp.last_name}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <Input
                  mb={6}
                  placeholder={emp.dept_name}
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
                    mb={6}
                    placeholder={emp.salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </InputGroup>
                <Input
                  mb={6}
                  w='auto'
                  placeholder={emp.gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                <Input
                  mb={6}
                  w='auto'
                  placeholder={emp.hire_date}
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

export default EditMenu