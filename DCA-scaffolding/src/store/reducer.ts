import { Actions, AppState, Action } from '../types/store';


export const reducer = (currentAction: Action, currentState: AppState): AppState => {
    const { action, payload } = currentAction;

    switch (action) {
        case Actions.NAVIGATE:
            return {
                ...currentState,
                screen: payload,
            };

        case Actions.ADD_EVENT:
            return {
                ...currentState,
                events: [...currentState.events, payload],
            };

        case Actions.TOGGLE_ROLE:
            return {
                ...currentState,
                userRole: currentState.userRole === 'USER' ? 'ADMIN' : 'USER',  
            };

        default:
            console.warn(`Acción desconocida: ${action}`);
            return currentState;
    }
};
