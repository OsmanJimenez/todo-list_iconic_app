export const TASKS_CONFIG = Object.freeze({
  TEXTS: {
    NO_CATEGORY_TEXT: 'Sin Categoría',
    DELETE_CONFIRM_HEADER: 'Confirmar Eliminación',
    DELETE_CONFIRM_MESSAGE:
      '¿Estás seguro de que deseas eliminar la Actividad "{title}" en la categoría "{category}"?',
    DELETE_CANCELLED: 'Eliminación cancelada',
  },
  BUTTONS: {
    DELETE_TASK: {
      TEXT: 'Eliminar',
      SLOT: 'end',
      COLOR: 'danger',
    },
    CANCEL: {
      TEXT: 'Cancelar',
    },
  },
  CHECKBOX: {
    COMPLETION: {
      SLOT: 'start',
    },
  },
  STATUSES: {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED',
  },
});
