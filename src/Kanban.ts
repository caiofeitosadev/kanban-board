export default class Kanban {
  dragElement: HTMLElement[];
  dropElement: HTMLElement[];
  draggedItem: HTMLElement | null;
  constructor(dragElement: HTMLElement[], dropElement: HTMLElement[]) {
    this.dragElement = dragElement;
    this.dropElement = dropElement;
    this.draggedItem = null;
  }
  dragStart() {
    this.dragElement.forEach((el) => {
      el.addEventListener('dragstart', (e: DragEvent) => {
        this.draggedItem = e.currentTarget as HTMLElement;
        this.draggedItem.classList.add('dragging');
      });
    });
  }
  dragEnd() {
    this.dragElement.forEach((el) => {
      el.addEventListener('dragend', () => {
        if (this.draggedItem) {
          this.draggedItem.classList.remove('dragging');
          this.draggedItem = null;
        }
      });
    });
  }
  dragOver() {
    this.dropElement.forEach((el) => {
      el.addEventListener('dragover', (e: DragEvent) => e.preventDefault());
    });
  }
  dragEnter() {
    this.dropElement.forEach((el) => {
      el.addEventListener('dragenter', (e) => {
        e.preventDefault();
        el.classList.add('dragover');
      });
    });
  }
  dragLeave() {
    this.dropElement.forEach((el) => {
      el.addEventListener('dragleave', (e: DragEvent) => {
        const relatedTarget = e.relatedTarget as HTMLElement | null;
        if (!el.contains(relatedTarget)) {
          el.classList.remove('dragover');
        }
      });
    });
  }
  dragDrop() {
    this.dropElement.forEach((el) => {
      el.addEventListener('drop', (e: DragEvent) => {
        e.preventDefault();
        el.classList.remove('dragover');
        if (this.draggedItem) {
          el.appendChild(this.draggedItem);
        }
      });
    });
  }
  init() {
    this.dragStart();
    this.dragEnd();
    this.dragOver();
    this.dragEnter();
    this.dragLeave();
    this.dragDrop();
  }
}
