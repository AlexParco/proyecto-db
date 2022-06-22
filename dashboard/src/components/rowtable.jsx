import { Checkbox, Td } from "@chakra-ui/react"
import { useState } from "react"

const RowTable = (props) => {
  const [toggle, setToggle] = useState(true)
  const { emp, isDisable } = props
  console.log({ isDisable })

  const onToggle = (id) => {
    console.log(id)
  }

  return (
    <>
      <Td pr={1}>
        <Checkbox
          onChange={() => onToggle(emp.id)}
          defaultChecked={false}
        />
      </Td>
      <Td >{emp.first_name + " " + emp.last_name}</Td>
      <Td>{emp.dept_name}</Td>
      <Td>{emp.salary}</Td>
      <Td>{emp.gender}</Td>
      <Td>{emp.hire_date}</Td>
    </>
  )
}


export default RowTable