import Kanban from './Kanban.js';
const dragElement = document.querySelectorAll('.kanban-item');
const dropElement = document.querySelectorAll('.kanban-list');
const buttonModal = document.querySelectorAll('.add-card');
const elementsArray = Array.from(dragElement) as HTMLElement[];
const arrayDropped = Array.from(dropElement) as HTMLElement[];
const arrayButtons = Array.from(buttonModal) as HTMLButtonElement[];
const kanban = new Kanban(elementsArray, arrayDropped, arrayButtons);
kanban.init();
