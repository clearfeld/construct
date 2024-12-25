import { create } from "zustand";

export enum E_Theme {
	Light = "LIGHT",
	Dark = "DARK",
}

export interface SettingsState {
	theme: E_Theme;
	toggleTheme: (arg: E_Theme) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
	theme: E_Theme.Dark,
	toggleTheme: () =>
		set((state) => ({
			theme: state.theme === E_Theme.Light ? E_Theme.Dark : E_Theme.Light,
		})),
}));

export default useSettingsStore;
