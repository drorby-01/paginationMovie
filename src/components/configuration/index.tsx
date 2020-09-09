import React from "react";
import { StarColors } from "../rank/"
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


interface IProps {
    color: string
    setColorInGlobalState: Function
}

interface IState {
    color: string
}


export default class Configuration extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        console.log("Configuration constructor")
        this.state = { color: props.color }
    }

    changeColor = (event: any) => {
        this.setState({ color: event.target.value })
    }

    changeColorCustom = (color: string) => {
        this.setState({ color })
    }

    componentDidMount() {
        console.log("Configuration componentDidMount")
    }

    componentDidUpdate() {

        console.log("Configuration componentDidUpdate")
    }

    shouldComponentUpdate(props: any, nextState: any) {
        // const newColorWithoutSpaces = nextState.color.replace(/ /g, "");

        console.log("Configuration shouldComponentUpdate")
        if (nextState.color === this.state.color) return false;
        return true;
    }

    render() {
        console.log("Configuration render")
        return <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Toggle Configuration
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body><div>
                        <h1 style={{ backgroundColor: this.state.color }}>
                            Configuration
                       </h1>
                        <InputGroup className="mb-3">
                            <FormControl
                                aria-label="color"
                                aria-describedby="basic-addon1"
                                onChange={this.changeColor}
                                value={this.state.color}
                            />
                            <Button onClick={() => { this.props.setColorInGlobalState(this.state.color) }}> Set Color </Button>
                            <Button onClick={() => { this.changeColorCustom("Pink") }}> Pink </Button>
                            <Button onClick={() => { this.changeColorCustom("Green") }}> Green </Button>
                            <Button onClick={() => { this.changeColorCustom("Blue") }}> Blue </Button>
                        </InputGroup>
                    </div></Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    }
}



