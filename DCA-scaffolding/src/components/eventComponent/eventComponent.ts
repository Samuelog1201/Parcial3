import { getEvents } from "../../utils/firebase";
import { EventsData } from "../../types/events";  

export enum AttributeEvent {
    "title" = "title",
    "date" = "date",
    "location" = "location",
    "image" = "image",
    "attendees" = "attendees",
}

class EventComponent extends HTMLElement {
    eTitle?: string;
    date?: string | Date ;
    location? : string;
    image?: string;
    attendees?: string|null

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return [
            AttributeEvent.title,
            AttributeEvent.date,
            AttributeEvent.location,
            AttributeEvent.image,
            AttributeEvent.attendees,
        ];
    }

    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case AttributeEvent.title:
                this.eTitle = newValue;
                break;
            case AttributeEvent.date:
                this.date = newValue;
                break;
            case AttributeEvent.location:
                this.location = newValue;
                break;
            case AttributeEvent.image:
                this.image = newValue;
                break;
            case AttributeEvent.attendees:
                this.attendees = newValue;
                break;
        }
        this.render();
    }

    connectedCallback() {
        this.loadEvents();
    }

    async loadEvents() {
        try {
            const events = await getEvents();  // Obtenemos los eventos de Firebase
            if (events.length > 0) {
                const latestEvent: EventsData = events[events.length - 1];  // Obtenemos el evento más reciente

                // Asegúrate de tener los valores correctos para todas las propiedades
                this.title = latestEvent.title || 'Contenido no disponible';
                this.image = latestEvent.image || 'ruta/a/imagen/predeterminada.png';
                this.location = latestEvent.location || '';
                this.date = latestEvent.date || new Date();
                
                this.render();  // Volver a renderizar después de obtener los datos
            }
        } catch (error) {
            console.error("Error al cargar los tweets desde Firebase:", error);
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    section {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        background-color: white;
                        border-radius: 10px;
                        padding: 15px;
                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        font-size: 1.5em;
                        margin: 5px 0;
                        font-family: "Rubik", sans-serif;
                        font-weight: bold;
                    }
                    p {
                        font-family: "Rubik", sans-serif;
                        font-size: 1em;
                        margin-block-start: 1em;
                        margin-block-end: 1em;
                        white-space: pre-wrap;
                    }
                    #image-upload {
                        max-width: 100%;
                        border-radius: 10px;
                        width: 500px;
                        height: auto;
                    }
                    #icono-perfil {
                        width: 50px;
                        height: auto;
                        margin-right: 5px; 
                    }
                    .info-perfil {
                        display: flex;
                        align-items: center; 
                        justify-content: flex-start; 
                    }
                </style>
                <section>
                    <div>
                        <div class="info-perfil">
                            <img id="icono-perfil" src="${this.eTitle}" alt="avatar"> 
                            <h1>${this.location}</h1>
                        </div>         
                        <p>${this.date}</p>
                        <img id="image-upload" src="${this.image}" alt="image upload">
                    </div>
                </section>
            `;
        }
    }
}

customElements.define("event-component", EventComponent);  // Define el nuevo nombre de la clase
export default EventComponent;
