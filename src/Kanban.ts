interface Tarefa {
  id: string;
  conteudo: string;
  status: 'todo' | 'doing' | 'done';
}
let tarefas: Tarefa[] = [];
export default class Kanban {
  dragElement: HTMLElement[];
  dropElement: HTMLElement[];
  draggedItem: HTMLElement | null;
  buttonModal: HTMLButtonElement[];
  closeButtonModal: HTMLButtonElement | null;
  constructor(
    dragElement: HTMLElement[],
    dropElement: HTMLElement[],
    buttonModal: HTMLButtonElement[],
  ) {
    this.dragElement = dragElement;
    this.dropElement = dropElement;
    this.buttonModal = buttonModal;
    this.draggedItem = null;
    this.closeButtonModal = document.querySelector('.close-modal-btn');
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
          const statusColumn = el.id as 'todo' | 'doing' | 'done';
          const idTarefa = this.draggedItem.id;
          const reduce = tarefas.find((item) => item.id === idTarefa);
          if (reduce) {
            reduce.status = statusColumn;
            const json = JSON.stringify(tarefas);
            localStorage.setItem('tarefa', json);
            this.renderTask();
          }
        }
      });
    });
  }
  handleForm(): void {
    const form = document.getElementById('formulario') as HTMLFormElement;
    const modalForm = document.querySelector('.modal-form') as HTMLFormElement;
    const input = document.getElementById('title') as HTMLInputElement;
    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newObject: Tarefa = {
          id: Date.now().toString(),
          conteudo: input.value,
          status: 'todo',
        };
        tarefas.push(newObject);
        this.renderTask();
        input.value = '';
        modalForm.classList.remove('active');
        const json = JSON.stringify(tarefas);
        localStorage.setItem('tarefa', json);
        this.closeModal();
      });
    }
  }
  renderTask() {
    this.dropElement.forEach((card) => (card.innerHTML = ''));
    tarefas.forEach((tarefa) => {
      const parentDiv = document.getElementById(tarefa.status) as HTMLElement;
      const newCard = document.createElement('div');
      newCard.classList.add('kanban-item');
      newCard.id = tarefa.id;
      newCard.setAttribute('draggable', 'true');
      newCard.textContent = tarefa.conteudo;
      parentDiv.appendChild(newCard);
    });
    this.rebindDragEvents();
  }
  rebindDragEvents() {
    this.dragElement = Array.from(
      document.querySelectorAll('.kanban-item'),
    ) as HTMLElement[];
    this.dragStart();
    this.dragEnd();
  }
  openModal() {
    this.buttonModal.forEach((button) => {
      button.addEventListener('click', () => {
        const modalForm = document.querySelector(
          '.modal-form',
        ) as HTMLFormElement;
        modalForm.classList.add('active');
      });
    });
  }
  closeModal() {
    if (this.closeButtonModal) {
      this.closeButtonModal.addEventListener('click', () => {
        const modalForm = document.querySelector(
          '.modal-form',
        ) as HTMLFormElement;
        modalForm.classList.remove('active');
      });
    }
  }

  init() {
    const dataLocalStorage = localStorage.getItem('tarefa');
    if (dataLocalStorage) {
      const data = JSON.parse(dataLocalStorage);
      if (data) {
        tarefas = data;
      }
    }
    this.dragStart();
    this.dragEnd();
    this.dragOver();
    this.dragEnter();
    this.dragLeave();
    this.dragDrop();
    this.handleForm();
    this.openModal();
    this.closeModal();
    this.renderTask();
  }
}
