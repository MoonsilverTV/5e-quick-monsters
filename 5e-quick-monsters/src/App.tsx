import { useId, useState } from "react"
import { IntSlider } from "./components/IntSlider"

function App() {
  return (
    <>
      <h1>5e Quick Monster Creator</h1>
      <p>Easily generate a monster fit for your situation while you're running your game!</p>
      <MonsterSettings />
    </>
  )
}

function MonsterSettings() {
  /*
   * target CR 0-30
   * offense to defense ratio
   * AC adjustment
   * to hit / dc adjustment
   * 
   * derived:
   * hp (from ac adjustment)
   * damage (from to-hit / dc adjustment)
   * proficiency
   * saves
   *
   */
  return (
    <>
      <CRSlider />
      <OffenseDefenseMixSelector />
      <AccuracyAdjustmentsSelector />
    </>
  )
}

const crValues = [{ val: 0, label: "0" },
{ val: 1 / 8, label: "1/8" },
{ val: 1 / 4, label: "1/4" },
{ val: 1 / 2, label: "1/2" },
...Array.from(Array(30).keys()).map((i) => ({ val: i + 1, label: `${i + 1}` }))]

function CRSlider() {
  const id = useId()
  const [index, setIndex] = useState(0)
  const selectedCr = crValues[index]

  return (
    <>
      <label htmlFor={id}>Desired CR: {selectedCr.label}</label>
      <input
        id={id}
        type="range"
        min="0"
        max={crValues.length - 1}
        step="1"
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
      />
    </>
  )
}

function OffenseDefenseMixSelector() {
  const [offense, setOffense] = useState(1)
  const [defense, setDefense] = useState(1)
  return (
    <>
      <IntSlider min={1} max={13} value={offense} setValue={setOffense} labelText="Relative offensive power:" />
      <IntSlider min={1} max={5} value={defense} setValue={setDefense} labelText="Relative defensive power:" />
    </>
  )
}

function AccuracyAdjustmentsSelector() {
  const [offenseMod, setOffenseMod] = useState(0)
  const [acMod, setAcMod] = useState(0)
  return (
    <>
      <IntSlider min={-10} max={10} value={offenseMod} setValue={setOffenseMod} labelText="Adjust to-hit / DC by:" />
      <IntSlider min={-10} max={10} value={acMod} setValue={setAcMod} labelText="Adjust AC by:" />
    </>
  )
}

export default App
