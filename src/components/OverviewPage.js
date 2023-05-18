import {
	Card,
	CardBody,
	CardTitle,
	ListGroup,
	ListGroupItem
} from "reactstrap";
import SocialMedaiThumbnail from "./SocialMediaThumbnail";
import Header from "./Header";

function OverviewPage(props) {
	return (
		<Card>
			<Header />
			<CardBody>
				<CardTitle>
					{props.companyName}
					<SocialMedaiThumbnail url='' />
					<SocialMedaiThumbnail />
					<SocialMedaiThumbnail />
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

export default OverviewPage;