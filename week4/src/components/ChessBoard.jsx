import { useEffect, useState } from "react";
import { Chess, DEFAULT_POSITION } from "chess.js";
import { Chessboard } from "react-chessboard";
import React from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Select, Spin } from "antd";

const ChessEvalBar = ({ currEval }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "30px",
        marginBlock: "5px",
        position: "relative",
        background: "black",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          height: "100%",
          transition: "width 0.5s ease",
          width: `${((currEval + 30) / 60) * 100}%`,
          backgroundColor: "white",
        }}
      />
    </div>
  );
};

export function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());
  const [depth, setDepth] = useState(4);
  const [thinking, setThinking] = useState(false);
  const [currEval, setCurrEval] = useState(0);

  function makeAMove(move) {
    const gameCopy = Object.assign(
      Object.create(Object.getPrototypeOf(game)),
      game
    );

    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result;
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return;
    setThinking(true);
    axios
      .get(
        `https://stockfish.online/api/s/v2.php?fen=${game.fen()}&depth=${depth}`
      )
      .then(({ data }) => {
        console.log();
        const bestMove = data.bestmove.split(" ")[1];
        setCurrEval(data.evaluation);
        makeAMove({
          from: bestMove.slice(0, 2),
          to: bestMove.slice(2),
          promotion: "q", // always promote to a queen for simplicity
        });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setThinking(false);
      });
  }
  useEffect(() => {
    const color = game.fen().split(" ")[1];
    if (color == "b") {
      makeRandomMove();
    }
  }, [game]);

  function onDrop(sourceSquare, targetSquare) {
    if (game.fen().split(" ")[1] == "b") return false;
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;
    return true;
  }

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        gap: "10px",
        position: "relative",
        marginBottom: "10px",
      }}
    >
      <div style={{ height: "30px" }}>
        <Spin
          spinning={thinking}
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      </div>
      <div style={{ width: "500px" }}>
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        <ChessEvalBar currEval={currEval} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "10px",
          }}
        >
          <Button type="primary" onClick={() => [setGame(new Chess())]}>
            Reset Board
          </Button>
          <div>
            <label>Depth: </label>
            <Select
              value={depth}
              style={{ width: 100 }}
              onChange={(v) => setDepth(v)}
            >
              {Array.from({ length: 15 }, (_, i) => (
                <Select.Option key={i + 1} value={String(i + 1)}>
                  {i + 1}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayRandomMoveEngine;
