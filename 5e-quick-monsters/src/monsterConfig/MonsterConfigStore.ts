import { create } from 'zustand'
import { crValues, type CR } from './CR'

interface MonsterConfigState {
  cr: CR,
  offense: number,
  defense: number,
  offenseMod: number,
  acMod: number,
}

interface MonsterConfigActions {
  setCR: (val: CR) => void,
  setOffense: (val: number) => void,
  setDefense: (val: number) => void,
  setOffenseMod: (val: number) => void,
  setACMod: (val: number) => void,
}

export const useMonsterConfigStore = create<MonsterConfigState & { actions: MonsterConfigActions }>()((set) => ({
  cr: crValues[0],
  offense: 1,
  defense: 1,
  offenseMod: 0,
  acMod: 0,

  actions: {
    setCR: (cr) => set(() => ({ cr })),
    setOffense: (offense) => set(() => ({ offense })),
    setDefense: (defense) => set(() => ({ defense })),
    setOffenseMod: (offenseMod) => set(() => ({ offenseMod })),
    setACMod: (acMod) => set(() => ({ acMod })),
  }
}))

export const useMonsterConfigCR = () => useMonsterConfigStore((state) => state.cr)
export const useMonsterConfigOffense = () => useMonsterConfigStore((state) => state.offense)
export const useMonsterConfigOffenseMod = () => useMonsterConfigStore((state) => state.offenseMod)
export const useMonsterConfigDefense = () => useMonsterConfigStore((state) => state.defense)
export const useMonsterConfigACMod = () => useMonsterConfigStore((state) => state.acMod)

export const useMonsterConfigActions: () => MonsterConfigActions =
  () => useMonsterConfigStore((state) => state.actions)
