import React from "react";
import PlayRandomMoveEngine from "../components/ChessBoard";
import NavBar from "../components/NavBar";
import { PageUpWrapper } from "../components/Animations";

const Chess = () => {
  return (
    <div>
        <NavBar />
        <PageUpWrapper>
        <div style={{
          width: "500px",
          margin: "auto",marginBlock: '20px 10px', fontSize: '1.5rem'}}>

      <div
        style={{
          fontSize: "4rem",
          fontWeight: 700,
        }}
      >
        Chess
      </div>
      You play as white and I play as black
        </div>
      <PlayRandomMoveEngine />
      </PageUpWrapper>
    </div>
  );
};
export default Chess;
