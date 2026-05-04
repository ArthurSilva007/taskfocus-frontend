import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// --- Importações Essenciais ---
import { Task } from '../../models/task.model';
import { TaskFormModalComponent } from '../../components/task-form-modal/task-form-modal.component';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    TaskFormModalComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  allTasks: Task[] = [];
  filteredTasks: Task[] = [];

  // Propriedades dos filtros
  searchTerm: string = '';
  filterByStatus: 'TODOS' | 'A_FAZER' | 'EM_PROGRESSO' | 'CONCLUIDO' = 'TODOS';
  filterByPriority: 'TODAS' | 'ALTA' | 'MEDIA' | 'BAIXA' = 'TODAS';

  // Controle do modal
  isTaskFormVisible = false;
  taskToEdit: Task | null = null;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Carrega as tarefas do backend.
   */
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.applyFilters(); // Aplica os filtros assim que os dados chegam
      },
      error: () => this.toastr.error('Falha ao carregar tarefas do servidor.')
    });
  }

  /**
   * Filtra a lista de tarefas com base nos seletores da interface.
   */
  applyFilters(): void {
    let tempTasks = [...this.allTasks];

    // Filtro por termo de busca
    if (this.searchTerm) {
      tempTasks = tempTasks.filter(task =>
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filtro por status
    if (this.filterByStatus !== 'TODOS') {
      tempTasks = tempTasks.filter(task => task.status === this.filterByStatus);
    }

    // Filtro por prioridade
    if (this.filterByPriority !== 'TODAS') {
      tempTasks = tempTasks.filter(task => task.priority === this.filterByPriority);
    }

    this.filteredTasks = tempTasks;
  }

  /**
   * Recebe os dados do modal e decide se cria ou atualiza uma tarefa.
   */
  handleFormSubmission(task: Task): void {
    const operation = task.id
      ? this.taskService.updateTask(task.id, task)
      : this.taskService.createTask(task);

    const message = task.id ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!';

    operation.subscribe({
      next: () => {
        this.toastr.success(message);
        this.loadTasks(); // Recarrega a lista para obter os dados mais recentes
        this.closeTaskForm();
      },
      error: () => this.toastr.error('Ocorreu um erro ao salvar a tarefa.')
    });
  }

  /**
   * Altera o status de uma tarefa entre 'A_FAZER' e 'CONCLUIDO'.
   */
  toggleStatus(task: Task): void {
    const newStatus = task.status === 'CONCLUIDO' ? 'A_FAZER' : 'CONCLUIDO';
    this.taskService.updateTask(task.id!, { ...task, status: newStatus }).subscribe({
      next: () => {
        this.toastr.info(`Tarefa marcada como ${newStatus === 'CONCLUIDO' ? 'concluída' : 'a fazer'}.`);
        this.loadTasks();
      },
      error: () => this.toastr.error('Falha ao atualizar status da tarefa.')
    });
  }

  /**
   * Exclui uma tarefa após a confirmação do usuário.
   */
  deleteTask(taskId: number): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa? Esta ação é irreversível.')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.toastr.success('Tarefa excluída com sucesso.');
          this.loadTasks();
        },
        error: () => this.toastr.error('Falha ao excluir a tarefa.')
      });
    }
  }

  /**
   * Retorna a classe CSS correspondente à prioridade para estilização.
   */
  getPriorityClass(priority?: 'ALTA' | 'MEDIA' | 'BAIXA'): string {
    if (!priority) return '';
    return `priority-${priority.toLowerCase()}`;
  }

  // --- Funções de Controle do Modal ---

  openTaskForm(task: Task | null = null): void {
    this.taskToEdit = task;
    this.isTaskFormVisible = true;
  }

  closeTaskForm(): void {
    this.isTaskFormVisible = false;
    this.taskToEdit = null;
  }
}
