import { Actions, Screens } from '../types/store';
import { addEvent, getEvents, deleteEvent } from '../utils/firebase';
import { EventsData } from '../types/events';

// Acción para navegar entre pantallas
export const navigate = (screen: Screens) => {
    console.log('Navegando a', screen);
    return {
        action: Actions.NAVIGATE,
        payload: screen,
    };
};

export const getEventsAction = async () => {
    const events = await getEvents(); // Obtén los tweets desde Firestore
    return {
        action: Actions.GET_EVENTS,  // Puedes definir esta constante en tu archivo de Actions
        payload: events,  
    };
};

// Acción para agregar un evento
export const addEventAction = (event: EventsData) => {
    return async (dispatch: Function) => {
        try {
            await addEvent(event); 
            dispatch({
                action: Actions.ADD_EVENT,
                payload: event,  
            });
        } catch (error) {
            console.error("Error al agregar Evento:", error);
        }
    };
};

// Acción para eliminar un evento
export const deleteEventAction = (eventId: string) => {
    return async (dispatch: Function) => {
        try {
            await deleteEvent(eventId);  // Llamamos a la función para eliminar el tweet
            dispatch({
                action: Actions.DELETE_EVENT,
                payload: eventId,  
            });
        } catch (error) {
            console.error("Error al eliminar Evento:", error);
        }
    };
};


export const toggleRoleAction = () => {
    return {
        action: Actions.TOGGLE_ROLE,  
        payload: null,  
    };
};
