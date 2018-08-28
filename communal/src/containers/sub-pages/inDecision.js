import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardSubtitle, CardText,
    Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';

class InDecisionCompo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'InDecision App',
            subtitle: 'Collect life todo list here.',
            options: []
        };
    }

    onRemoveAll = () => {
        this.setState({
            options: []
        });
        this.render();
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        const newThing = e.target.elements.thingName.value;
        if (newThing) {
            this.setState((preState) => {
                return {
                    options: [...preState.options, newThing]
                };
            });
            e.target.elements.thingName.value = '';
        }
        this.render();
    };

    render () {
        return (
            <div className="row mx-3">
                <div className="col-12 col-sm-12 col-md-6 offset-md-3">
                    <Card className="mt-3">
                        <CardHeader>
                            Decision (Todo List)
                        </CardHeader>
                        <CardBody>
                        <CardTitle>
                            Title: {this.state.title.toUpperCase()}
                        </CardTitle>
                        {this.state.subtitle && <CardSubtitle>Subtitle: {this.state.subtitle}</CardSubtitle>}
                        <p>
                            {this.state.options.length > 0 ? 'There are some item in you list.' : 'No item in list'}
                        </p>
                        { this.state.options.length > 0 && <CardText>Item Qty: {this.state.options.length}</CardText> }
                        <Button outline block color="danger" onClick={this.onRemoveAll}>
                            Remove_All
                        </Button>
                        <ListGroup className="my-3 hover-darker">
                            {
                                this.state.options.map((item, idx) => {
                                    return (
                                        <ListGroupItem key={idx}>
                                            {item}
                                        </ListGroupItem>
                                    );
                                })
                            }
                        </ListGroup>
                        <Form inline noValidate name="InDecision-todolist-form" onSubmit={(event) => {this.onFormSubmit(event);}}>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="New_tHing" className="mr-sm-2">New Thing:</Label>
                                <Input type="text" name="thingName" id="New_tHing" placeholder="sth todo" />
                            </FormGroup>
                            <Button color="warning" size="lg" block className="rounded-0 mt-2">
                                Add_Thing
                            </Button>
                        </Form>
                        </CardBody>
                        <CardFooter>InDecision Footer</CardFooter>
                    </Card>
                </div>
            </div>
        )
    }
}

export default InDecisionCompo;