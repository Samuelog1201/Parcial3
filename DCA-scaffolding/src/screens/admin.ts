import { addEventAction } from '../store/actions'; 
import { addObserver, appState, dispatch } from '../store';
import { getState } from '../store/index'; 
import { Screens } from '../types/store';
import { EventsData } from '../types/events';

class Admin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initialize();
  }

  initialize() {
    addObserver(this.update.bind(this));
  }

  update() {
    const state = getState();
    console.log('Current State:', state);
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        /* Tus estilos aquí */
      </style>
      <div>
        <!-- Agrega otras secciones si es necesario -->
      </div>
    `;

    const centerSection = this.shadowRoot!.querySelector('center-section');
    if (centerSection) {
      centerSection.addEventListener('addEvent', (e: Event) => {
        const customEvent = e as CustomEvent<{ title: string; image: string; location: string, attendees: string }>;
        this.handleAddEvent(customEvent.detail);
      });
    }
  }

  handleAddEvent(eventContent: { title: string; image: string; location: string, attendees: string }) {   
    const event: EventsData = {
        title: eventContent.title,
        date: new Date(),
        location: eventContent.location,
        image: eventContent.image,
        attendees: eventContent.attendees || null,
    };

    dispatch(addEventAction(event));

    this.update();
  }
}

customElements.define('admin-screen', Admin);
