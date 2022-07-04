import { DeleteIcon, EditIcon, Icon } from '@chakra-ui/icons'
import {
  useColorMode,
  TableContainer,
  Table,
  Tr,
  Td,
  Tbody,
  Thead,
  Th,
  Checkbox,
  Stack,
  Divider,
  Button,
  useRadio,
  useToast,
  ButtonGroup,
} from '@chakra-ui/react'
import { useEmployee } from '../context/emp.context'
import CreateMenu from './crud/create'
import EditMenu from './crud/edit'

const TableEmployees = () => {
  const { colorMode } = useColorMode()
  const { employees, delEmployee } = useEmployee()

  const handleDelete = (id) => {
    delEmployee(id)
  }

  return (
    <>
      <TableContainer
        border="1px"
        borderRadius={8}
        borderColor={colorMode === 'light' ? '#C5CFDC' : '#ffffff29'}
        mt={8}
      >
        <CreateMenu />
        <Divider />
        <Table>
          <Thead >
            <Tr>
              <Th pr={1}>
                Acciones
              </Th>
              <Th>Empleado</Th>
              <Th>Departamento</Th>
              <Th>Salario</Th>
              <Th>Genero</Th>
              <Th>Fecha Contratacion</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((emp, index) => (
              <Tr key={index}>
                <Td pr={1}>
                  <ButtonGroup isAttached variant='outline'>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(emp.id)}
                    >
                      <Icon as={DeleteIcon} />
                    </Button>
                    <EditMenu emp={emp} />
                  </ButtonGroup>
                </Td>
                <Td >{emp.first_name + " " + emp.last_name}</Td>
                <Td>{emp.dept_name}</Td>
                <Td>{emp.salary}</Td>
                <Td>{emp.gender}</Td>
                <Td>{emp.hire_date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer >
    </>
  )
}

export default TableEmployees