import { getEvents} from '../utils/firebase'; 
import { EventsData } from './events';

export type Observer = { render: () => void } & HTMLElement; 

export enum Actions {
    NAVIGATE = 'NAVIGATE',
    ADD_EVENT = 'ADD_EVENT',
    DELETE_EVENT = 'DELETE_EVENT',
    GET_EVENTS = 'GET_EVENTS',
    TOGGLE_ROLE = 'TOGGLE_ROLE',
    USER = "USER"
}

export enum Screens {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface AppState {
    screen: Screens;  

    events: EventsData[];  
}


export interface Action {
    action: Actions;
    payload: any;  
}