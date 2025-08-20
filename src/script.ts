import Kanban from './Kanban.js';
const dragElement = document.querySelectorAll('.kanban-item');
const dropElement = document.querySelectorAll('.kanban-list');

if (dragElement.length && dropElement.length) {
  const elementsArray = Array.from(dragElement) as HTMLElement[];
  const arrayDropped = Array.from(dropElement) as HTMLElement[];
  const kanban = new Kanban(elementsArray, arrayDropped);
  kanban.init();
}
