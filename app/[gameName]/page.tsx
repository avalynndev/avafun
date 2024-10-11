import { games } from "@/config/games";

export default function GamePage({ params }: any) {
  const { gameName } = params;

  const gameData = games.find((game) => game.title === gameName);

  if (!gameData) {
    return <p>Game not found</p>;
  }

  return (
    <>
      <p>{gameData.title}</p>
      <iframe
        src={gameData.iframe}
        sandbox="allow-scripts allow-same-origin"
        scrolling="no"
        style={{ width: "901.562px", height: "600px", border: "none" }}
      />
    </>
  );
}
