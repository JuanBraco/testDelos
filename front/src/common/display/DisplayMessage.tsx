import React from "react";

interface GameMessageProps {
  player: string;
  message: string;
  subMessage: string;
}

const GameMessage: React.FC<GameMessageProps> = ({ player, message, subMessage }) => (
  <div className="text-center p-4">
    <h4 className="text-2xl font-bold mb-2">{message}</h4>
    <h5 className="text-xl font-semibold mb-2">{player}</h5>
    <p className="text-base mb-4">{subMessage}</p>
    <button className="font-bold py-2 px-4 rounded mt-2">
      Join Game
    </button>
  </div>
);

export { GameMessage };
