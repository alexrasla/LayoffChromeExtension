function SocialMedaiThumbnail(props) {
	return (
		<a href={props.url} target="_blank" rel="noreferrer">
			<img src={props.src}></img>
		</a>)
}

export default SocialMedaiThumbnail;