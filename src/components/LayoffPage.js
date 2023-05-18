import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import Image from 'react-bootstrap/Image'
import Header from "./Header";

function LayoffPage(props) {
    return (
        <Card>
            <Header />
            <CardBody>
                <CardTitle tag="h5">
                    Layoff Page
                </CardTitle >
            </CardBody >
            <ListGroup flush>
                <ListGroupItem>
                    <h6 class="font-bold">
                        Company Overview
                    </h6>
                    <p>
                        Short description...
                    </p>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default LayoffPage;