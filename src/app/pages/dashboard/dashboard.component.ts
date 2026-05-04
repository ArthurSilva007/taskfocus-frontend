import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

// --- Importações Essenciais ---
import { HeaderComponent } from '../../components/header/header.component';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '../../components/charts/pie-chart/pie-chart.component';
import { TaskFormModalComponent } from '../../components/task-form-modal/task-form-modal.component';
import { Task } from '../../models/task.model'; // CORREÇÃO: Importando do local certo
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import {CommonModule, DatePipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    HeaderComponent,
    BarChartComponent,
    PieChartComponent,
    TaskFormModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userName: string = 'Anderson';
  tasks: Task[] = [];
  isTaskFormVisible = false;
  taskToEdit: Task | null = null;

  // Indicadores (poderiam vir de um DashboardService)
  habitsCompleted: number = 78;
  dailyAverage: number = 5.2;
  monthlyExpenses: number = 1500.50;
  financialSummary: number = 3565;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        this.toastr.error('Não foi possível carregar as tarefas.', 'Erro de Conexão');
        console.error(err);
      }
    });
  }

  handleFormSubmission(task: Task): void {
    const operation = task.id
      ? this.taskService.updateTask(task.id, task)
      : this.taskService.createTask(task);

    operation.subscribe({
      next: () => {
        this.toastr.success('Operação realizada com sucesso!');
        this.loadTasks();
        this.closeTaskForm();
      },
      error: () => this.toastr.error('Falha ao salvar a operação.')
    });
  }

  openTaskForm(task: Task | null = null): void {
    this.taskToEdit = task;
    this.isTaskFormVisible = true;
  }

  closeTaskForm(): void {
    this.isTaskFormVisible = false;
    this.taskToEdit = null;
  }

  deleteTask(taskId: number): void {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.toastr.success('Item excluído com sucesso!');
          this.loadTasks();
        },
        error: () => this.toastr.error('Falha ao excluir o item.')
      });
    }
  }

  getPriorityClass(priority?: 'ALTA' | 'MEDIA' | 'BAIXA'): string {
    if (!priority) return '';
    return `priority-${priority.toLowerCase()}`;
  }
}
