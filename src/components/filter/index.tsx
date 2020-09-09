import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

interface IProps {
    filterOperation: Function
}
export default function Filter(props: IProps) {
    const [filterValue, setFilterValue] = useState("")
    const { filterOperation } = props;
    console.log("filter render")
    return <div>
        <InputGroup className="mb-3">
            <FormControl
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setFilterValue(e.target.value)}
                value={filterValue}
            />
            <Button onClick={() => { filterOperation(filterValue) }}> Filter </Button>
            <Button onClick={() => {
                setFilterValue("");
                filterOperation("")
            }}> Clear </Button>
        </InputGroup>

    </div>
}