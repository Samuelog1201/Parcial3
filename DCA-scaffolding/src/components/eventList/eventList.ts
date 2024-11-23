import EventComponent from '../eventComponent/eventComponent'; 
import { AttributeEvent } from '../eventComponent/eventComponent';
import { appState } from '../../store/';
import { addEvent } from '../../utils/firebase';
import { EventsData } from '../../types/events';

export const dataEvent: EventsData[] = [];

class EventsList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
            shadowRoot.innerHTML = `
                <style>
                /* Estilos del componente central */
                .event-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                #public {
                    font-family: "Rubik", sans-serif;
                    color: #333; /* Color del título */
                    text-align: center;
                    font-weight: bold;
                    
                }

                p {
                    font-family: "Rubik", sans-serif;
                    color: #555; /* Color del texto */
                }

                .event-input {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    align-items: center;
                    width: 100%; /* Ocupa todo el ancho disponible */
                    max-width: 500px; /* Ancho máximo para los inputs */
                    margin: 0 auto; /* Centra el contenedor */
                    padding: 15px; /* Espaciado interno */
                    background-color: #f9f9f9; /* Fondo claro */
                    border-radius: 10px; /* Bordes redondeados */
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra suave */
                }

                textarea, input[type="text"] {
                    width: 100%; /* Ancho completo */
                    padding: 10px; /* Espaciado interno */
                    border: 1px solid #ccc; /* Borde gris claro */
                    border-radius: 5px; /* Bordes redondeados */
                    font-family: "Rubik", sans-serif; /* Fuente */
                    font-size: 1em; /* Tamaño de fuente */
                    resize: none; /* Evita el redimensionamiento manual en textarea */
                    overflow: hidden; /* Evita barras de desplazamiento en textarea */
                }

                textarea:focus, input[type="text"]:focus {
                    border-color: #9c9c9c; /* Color del borde al enfocar */
                    outline: none; /* Quitar el contorno por defecto */
                }

                button {
                    padding: 10px 20px; /* Espaciado interno del botón */
                    background-color: #808080; /* Color de fondo del botón */
                    color: white; /* Color del texto */
                    border: none; /* Sin borde */
                    border-radius: 5px; /* Bordes redondeados */
                    font-family: "Rubik", sans-serif; /* Fuente */
                    font-size: 1em; /* Tamaño de fuente */
                    cursor: pointer; /* Cursor de mano al pasar sobre el botón */
                    transition: background-color 0.3s; /* Transición suave para el color de fondo */
                }

                button:hover {
                    background-color: #4b4b4b; /* Color de fondo al pasar el mouse */
                }

                section {
                padding-top: 15px
                }
            </style>

            <section>
                <h1 id="public">EVENTOS:</h1>
                <div class="event-input">
                    <input type="text" id="event-title" placeholder="Título del evento" />
                    <textarea id="event-text" placeholder="Descripción del evento" rows="3"></textarea>
                    <input type="text" id="event-image" placeholder="URL de la imagen" />
                    <button id="event-button" disabled>Publicar Evento</button>
                </div>
            </section>

            <div class="event-list"></div>
            `;

            const eventList = shadowRoot.querySelector('.event-list');
            const eventButton = shadowRoot.querySelector('#event-button') as HTMLButtonElement;
            const eventText = shadowRoot.querySelector('#event-text') as HTMLTextAreaElement;
            const eventImage = shadowRoot.querySelector('#event-image') as HTMLInputElement;
            const eventTitle = shadowRoot.querySelector('#event-title') as HTMLInputElement;
            const eventLocation = shadowRoot.querySelector('#event-location') as HTMLInputElement;
            const eventAttendees = shadowRoot.querySelector('#event-attendees') as HTMLInputElement;


            eventText.addEventListener('input', () => {
                eventButton.disabled = !eventText.value.trim();
            });

            if (eventButton) {
                eventButton.addEventListener('click', () => {
                    const eventTextValue = eventText.value;
                    const eventImageValue = eventImage.value;
                    const eventTitleValue = eventTitle.value;
                    const eventLocationValue = eventLocation.value;
                    const eventAttendeesValue = eventAttendees.value;

                    if (appState.user) {
                        if (eventTextValue.trim() !== "") {
                            const newEventData: EventsData = {
                                title: eventTitleValue,
                                image: eventImageValue,
                                location: eventLocationValue,
                                attendees: eventAttendeesValue,
                                date: new Date(),
                                
                            };
                            
                            dataEvent.push(newEventData);
                            addEvent(newEventData);
                            this.renderEvents(eventList);

                           
                            eventTitle.value = '';
                            eventText.value = '';
                            eventImage.value = '';
                            eventButton.disabled = true; 
                        } else {
                            alert("No se puede publicar un evento vacío");
                        }
                    } else {
                        alert("No hay un perfil logueado");
                    }
                });
            }

    
            this.renderEvents(eventList);
        }
    }

    private renderEvents(eventList: Element | null) {
        if (eventList) {
            eventList.innerHTML = '';  
          
            dataEvent.slice().reverse().forEach((event) => {
                const eventCard = document.createElement("my-event");
                eventCard.setAttribute(AttributeEvent.title, event.title);
                eventCard.setAttribute(AttributeEvent.image, event.image);
                eventCard.setAttribute(AttributeEvent.date, event.date.toISOString());  
                
                eventList.appendChild(eventCard);
            });
        }
    }
}

customElements.define("event-list", EventsList);
export default EventsList;
