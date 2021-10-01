function GamelySmallCard(props) {
  const { title, number } = props;

  return (
    <div>
      {title}
      {number}
    </div>
  );
}

export default GamelySmallCard;
