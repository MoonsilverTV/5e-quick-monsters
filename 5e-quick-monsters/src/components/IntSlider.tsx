import { useId } from "react"

export function IntSlider(props: { min: number, max: number, value: number, setValue: (newValue: number) => void, labelText: string }) {
  const id = useId()
  return (
    <>
      <label htmlFor={id}>{props.labelText} {props.value}</label>
      <input
        id={id}
        type="range"
        min={props.min}
        max={props.max}
        step="1"
        value={props.value}
        onChange={(e) => props.setValue(Number(e.target.value))}
      />
    </>)
}
