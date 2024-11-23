import { Actions, AppState, Observer, Screens } from "../types/store";
import { reducer } from "./reducer";

// El estado global, appState
const initialState: AppState = {
	screen: Screens.ADMIN, 
	userRole: 'USER', 
    user: null,
	events: [], 
};

export let appState = initialState;

let observers: Observer[] = [];

// Crear el dispatch
export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;

	// Notificar a los observadores
	observers.forEach((o: any) => o.render());
};

// Agregar los observadores
export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};

// Función para obtener el estado actual
export const getState = (): AppState => {
	return appState;
};
