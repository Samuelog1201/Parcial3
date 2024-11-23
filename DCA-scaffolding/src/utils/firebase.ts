import { appState } from '../store';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { EventsData } from '../types/events'

let db: any;
let auth: any;
let storage: any;

export const getFirebaseInstance = async () => {
    if (!db) {
        const { initializeApp } = await import('firebase/app');
		const { getFirestore } = await import('firebase/firestore');

        const firebaseConfig = {
            apiKey: "AIzaSyDjMCOA8iOA-pDjiTKqQg3opVtmXLszPsQ",
            authDomain: "parcial3-dcd34.firebaseapp.com",
            projectId: "parcial3-dcd34",
            storageBucket: "parcial3-dcd34.firebasestorage.app",
            messagingSenderId: "499567924796",
            appId: "1:499567924796:web:04b4cd5d25849cb60f5539"
          };
        
        const app = initializeApp(firebaseConfig);
		db = getFirestore(app);
	}
	return { db, auth, storage };
};


// Función para agregar un tweet
export const addEvent = async (event: EventsData) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, addDoc } = await import('firebase/firestore');

        const where = collection(db, 'Eventos');
        const eventData = {
            title: event.title,
            image: event.image || '', 
            date: event.date, 
            location: event.location,
            
        };
        await addDoc(where, eventData);

        console.log('Evento añadido con éxito');
    } catch (error) {
        console.error('Error al añadir el Evento', error);
    }
};

// Función para obtener Eventos
export const getEvents = async () => {
    try {
        const { db } = await getFirebaseInstance();
        const where = collection(db, 'Eventos');
        const querySnapshot = await getDocs(where);
        const data: EventsData[] = [];

        querySnapshot.forEach((doc) => {
            data.push(doc.data() as EventsData);  // Aseguramos que los datos tienen la forma de un Tweet
        });

        return data;
    } catch (error) {
        console.error('Error al obtener los eventos', error);
        return []; // Regresamos un array vacío en caso de error
    }
};


// Función para eliminar un tweet
export const deleteEvent = async (eventId: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const eventRef = doc(db, 'tweets', eventId);  // Referencia al evento en Firestore
        await deleteDoc(eventRef);  // Eliminar el Evento
        console.log('Tweet eliminado con éxito');
    } catch (error) {
        console.error('Error al eliminar el tweet', error);
    }
};

