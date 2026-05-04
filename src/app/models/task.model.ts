// A palavra 'export' torna esta interface disponível para toda a aplicação.
export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate: string;
  status: 'A_FAZER' | 'EM_PROGRESSO' | 'CONCLUIDO';
  priority?: 'ALTA' | 'MEDIA' | 'BAIXA';
  value?: number;
  category?: string;
  currency?: string;
}
