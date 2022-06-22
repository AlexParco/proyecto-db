import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
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
  Box,
  Divider,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from '../context/auth.context'
import useEmployees from '../hooks/useEmployee'
import RowTable from './rowtable'

const TableEmployees = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [employeesPerPage, setEmployeesPerPage] = useState(10)
  const { token } = useAuth()
  const { colorMode } = useColorMode()
  const { employees } = useEmployees(token)
  const [edit, setEdit] = useState(false)

  const onToggle = (id) => {
    setEdit(!edit)
  }

  return (
    <>
      <TableContainer
        border="1px"
        borderRadius={8}
        borderColor={colorMode === 'light' ? '#C5CFDC' : '#ffffff29'}
      >
        <Stack
          direction='row'
          spacing={1}
          justify="end"
          align="center"
          p={1}
        >
          {
            !edit &&
            (
              < Button colorScheme="red" size="sm" leftIcon={<DeleteIcon />} variant="ghost"> Eliminar</Button>
            )
          }
          <Button colorScheme="teal" size="sm" leftIcon={<EditIcon />} variant="ghost"> Editar</Button>
          <Button colorScheme="blue" size="sm" leftIcon={<AddIcon />} variant="ghost"> Crear</Button>
        </Stack>
        <Divider />
        <Table>
          <Thead >
            <Tr>
              <Th></Th>
              <Th>Empleado</Th>
              <Th>Departamento</Th>
              <Th>Salario</Th>
              <Th>Genero</Th>
              <Th>Fecha Contratacion</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((e, index) => (
              <Tr key={index}>
                <RowTable
                  isDisable={edit}
                  emp={e}
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer >
    </>
  )

}


const Pagination = ({ perPage, total }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <Tabs>
      <TabList>
        {pageNumbers.map(e => (
          <Tab key={e}>{e}</Tab>
        ))}
      </TabList>
    </Tabs>
  )
}

export default TableEmployees
