import React, { useState, useEffect } from "react";
import "./styles.css";
import { Button, Checkbox, InputNumber, InputTextarea } from "./components";

export default function App() {
  const stickersInitialState = [
    {
      value: "react",
      label: "React",
      checked: false
    },
    {
      value: "vue",
      label: "Vue",
      checked: false
    },
    {
      value: "angular",
      label: "Angular",
      checked: false
    }
  ];

  const [stickers, setStickers] = useState(stickersInitialState);
  const [counter, setCounter] = useState(0);
  const [observation, setObservation] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (isNaN(counter)) {
      setCounter(1);
    }
  }, [counter]);

  function addSticker() {
    const c = parseInt(counter, 10) + 1;
    setCounter(c);
  }

  function removeSticker() {
    if (counter > 0) {
      setCounter(counter - 1, 10);
    }
  }

  function handleChecked(event) {
    setShowSuccessMessage(false);

    const clickedSticker = event.target.value;

    setStickers(
      stickers.map(sticker => {
        if (sticker.value === clickedSticker) {
          return { ...sticker, checked: !sticker.checked };
        }

        return sticker;
      })
    );
  }

  function orderStickers(event) {
    event.preventDefault();

    const checkedStickers = stickers
      .filter(sticker => sticker.checked)
      .map(sticker => sticker.value);

    const body = {
      stickers: checkedStickers,
      quantity: counter,
      observation
    };

    setShowSuccessMessage(true);
    clearForm();

    // send to backend...
    console.log(JSON.stringify(body));
  }

  function clearForm() {
    setCounter(0);
    setStickers(stickersInitialState);
    setObservation("");
  }

  return (
    <div className="container">
      <header>
        <section className="title">
          <h1>
            Formulário <br aria-hidden="true" />
            para compra de <br aria-hidden="true" />
            <b>Pacote de Stickers</b>
          </h1>
        </section>
      </header>
      <main>
        <form>
          <fieldset>
            <legend id="sticker-type">Quais stickers?</legend>
            <div className="checking">
              {stickers.map(item => (
                <Checkbox
                  key={item.value}
                  value={item.value}
                  label={item.label}
                  onChange={handleChecked}
                  isChecked={item.checked}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend id="sticker-quantity">Quantos stickers de cada?</legend>

            <div className="counter">
              <Button
                type="button"
                ariaLabel="Retirar 1 sticker"
                onClick={removeSticker}
                disabled={
                  !(
                    typeof stickers !== "undefined" &&
                    stickers.filter(sticker => sticker.checked).length > 0 &&
                    counter > 0
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  aria-labelledby="minus"
                >
                  <title id="minus">Menos</title>
                  <path d="M4.667 0A4.668 4.668 0 0 0 0 4.667v32.666A4.668 4.668 0 0 0 4.667 42h32.666A4.668 4.668 0 0 0 42 37.333V4.667A4.668 4.668 0 0 0 37.333 0H4.667zm28 23.333H9.333v-4.666h23.334v4.666z" />
                </svg>
              </Button>
              <InputNumber
                value={counter}
                ariaLabel={counter}
                onChange={e => {
                  let aux = e.target.value.replace(/[^0-9]/g, "");
                  setCounter(aux);
                }}
                error={counter < 0}
                disabled={
                  !(
                    (typeof stickers !== "undefined" &&
                      stickers.filter(sticker => sticker.checked).length > 0) ||
                    counter > 0
                  )
                }
              />
              <Button
                type="button"
                ariaLabel="Adicionar 1 sticker"
                onClick={addSticker}
                disabled={
                  !(
                    typeof stickers !== "undefined" &&
                    stickers.filter(sticker => sticker.checked).length > 0
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  aria-labelledby="plus"
                >
                  <title id="plus">Mais</title>
                  <path d="M4.667 42h32.666A4.668 4.668 0 0 0 42 37.333V4.667A4.668 4.668 0 0 0 37.333 0H4.667A4.668 4.668 0 0 0 0 4.667v32.666A4.668 4.668 0 0 0 4.667 42zm4.666-23.333h9.334V9.333h4.666v9.334h9.334v4.666h-9.334v9.334h-4.666v-9.334H9.333v-4.666z" />
                </svg>
              </Button>
            </div>
          </fieldset>

          <fieldset>
            <legend id="stickers-obs">Observações:</legend>
            <InputTextarea
              value={observation}
              onChange={e => setObservation(e.target.value)}
            />
          </fieldset>

          <section className="form-footer">
            <p className={showSuccessMessage ? "show" : "hide"}>
              Formulário enviado com sucesso!
            </p>
            <Button
              type="submit"
              onClick={orderStickers}
              disabled={
                counter <= 0 ||
                stickers.filter(sticker => sticker.checked).length === 0
              }
            >
              Enviar
            </Button>
          </section>
        </form>
      </main>
    </div>
  );
}
