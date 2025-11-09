import { useId, useState } from "react"
import { IntSlider } from "./components/IntSlider"
import { crValues } from "./monsterConfig/CR"
import { useMonsterConfigActions, useMonsterConfigStore } from "./monsterConfig/MonsterConfigStore"

function App() {
  return (
    <>
      <h1>5e Quick Monster Creator</h1>
      <p>Easily generate a monster fit for your situation while you're running your game!</p>
      <MonsterSettings />
      <MonsterDisplay />
    </>
  )
}

function MonsterDisplay() {
  const config = useMonsterConfigStore()
  return (
    <article>
      <div>CR: {config.cr.label}</div>
      <div>Offensiveness: {config.offense / config.defense}</div>
      <div>Adjustments: to-hit/DC {config.offenseMod}; AC: {config.acMod}</div>
    </article>
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

  const actions = useMonsterConfigActions()

  const [crIndex, setCrIndex] = useState(0) // fixme this breaks if something else updates CR
  const updateCr = (val: number) => {
    setCrIndex(val)
    actions.setCR(crValues[val])
  }

  const config = useMonsterConfigStore()

  return (
    <>
      <CRSlider crIndex={crIndex} setCrIndex={updateCr} />
      <IntSlider min={1} max={13} value={config.offense} setValue={actions.setOffense} labelText="Relative offensive power:" />
      <IntSlider min={1} max={5} value={config.defense} setValue={actions.setDefense} labelText="Relative defensive power:" />
      <IntSlider min={-10} max={10} value={config.offenseMod} setValue={actions.setOffenseMod} labelText="Adjust to-hit / DC by:" />
      <IntSlider min={-10} max={10} value={config.acMod} setValue={actions.setACMod} labelText="Adjust AC by:" />
    </>
  )
}
/*
 *
 */

function CRSlider(props: { crIndex: number, setCrIndex: (newValue: number) => void }) {
  const id = useId()
  const selectedCr = crValues[props.crIndex]

  return (
    <>
      <label htmlFor={id}>Desired CR: {selectedCr.label}</label>
      <input
        id={id}
        type="range"
        min="0"
        max={crValues.length - 1}
        step="1"
        value={props.crIndex}
        onChange={(e) => props.setCrIndex(Number(e.target.value))}
      />
    </>
  )
}

export default App
