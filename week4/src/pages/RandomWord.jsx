import { Button, Input, Spin } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../components/AlertProvider";
import NavBar from "../components/NavBar";
import { LoadingOutlined } from "@ant-design/icons";
import { PageLeftWrapper, PageUpWrapper } from "../components/Animations";

const RandomWord = () => {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const alertMsg = useContext(AlertContext);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <div>
      <NavBar />
      <PageLeftWrapper>
        <Spin
          spinning={loading}
          indicator={<LoadingOutlined spin />}
          size="large"
          fullscreen
        />
        <div
          style={{
            margin: "auto",
            width: "500px",
            display: "grid",
            placeItems: "center",
            rowGap: "10px",
          }}
        >
          <div style={{ fontSize: "4rem", fontWeight: 700 }}>
            Word Definitions
          </div>
          <Input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            size="large"
            placeholder="Enter a word"
          />
          <Button
            onClick={() => {
              setLoading(true);
              axios
                .get("https://random-word-api.herokuapp.com/word")
                .then(({ data }) => {
                  setWord(data[0]);
                })
                .catch(() => {
                  alertMsg.showAlert("Couldn't generate random word");
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            Generate Random Word
          </Button>
          <Button
            type="primary"
            onClick={() => {
              if (!word) {
                alertMsg.showAlert("Enter a word to search mate", "warning");
                return;
              }
              setLoading(true);
              axios
                .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then(({ data }) => {
                  if (data[0].meanings) setMeanings(data[0].meanings);
                  else {
                    alertMsg.showAlert(
                      "Couldn't find definition right now",
                      "error"
                    );
                  }
                })
                .catch((e) => {
                  if (e.status == 404) {
                    alertMsg.showAlert(
                      "Sorry mate, we couldn't find definitions for the word you were looking for.",
                      "error"
                    );
                  } else {
                    alertMsg.showAlert(
                      "Couldn't connect to the server right now",
                      "error"
                    );
                  }
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            Get Definition
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* <div style={{   }}> */}

          {meanings.map((meaning) => {
            return (
              <div
                style={{
                  width: "500px",
                  border: "1px solid white",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBlock: "10px",
                }}
              >
                <div
                  style={{
                    paddingBlock: "5px",
                    paddingInline: "10px",
                    backgroundColor: "#12cc34",
                    borderRadius: "5px",
                    width: "max-content",
                  }}
                >
                  {meaning.partOfSpeech}
                </div>
                <div>
                  {/* {JSON.stringify(meaning.definitions)} */}
                  {meaning.definitions.map((definition) => {
                    return (
                      <div
                        style={{
                          backgroundColor: "#fefefe",
                          color: "black",
                          marginBlock: "10px",
                          paddingInline: "10px",
                          paddingBlock: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        {definition.definition}
                        {definition.example ? (
                          <div>
                            <b>Example: </b>
                            {definition.example}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {/* </div> */}
        </div>
      </PageLeftWrapper>
    </div>
  );
};
export default RandomWord;
