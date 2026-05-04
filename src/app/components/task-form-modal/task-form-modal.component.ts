import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss']
})
export class TaskFormModalComponent implements OnInit {
  @Input() taskToEdit: Task | null = null;
  @Output() closeModal = new EventEmitter<void>();
  // O evento agora emite o objeto de tarefa completo
  @Output() formSubmitted = new EventEmitter<Task>();

  taskForm: FormGroup;
  isTransaction: boolean = false;

  // CORREÇÃO: Removemos TaskService e ToastrService daqui
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      type: ['Tarefa', Validators.required],
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      dueTime: ['', Validators.required],
      category: [''],
      priority: ['MEDIA'],
      value: [null]
    });
  }

  ngOnInit(): void {
    // A lógica de preenchimento do formulário continua a mesma...
    this.taskForm.get('type')?.valueChanges.subscribe(type => {
      this.isTransaction = type === 'Transacao';
      this.updateValidators();
    });

    if (this.taskToEdit) {
      this.isTransaction = !!this.taskToEdit.value;
      const [dueDate, dueTime] = this.taskToEdit.dueDate.split('T');

      this.taskForm.patchValue({
        ...this.taskToEdit,
        type: this.isTransaction ? 'Transacao' : 'Tarefa',
        dueDate: dueDate,
        dueTime: dueTime ? dueTime.substring(0, 5) : '12:00',
      });
    }
    this.updateValidators();
  }

  updateValidators(): void {
    // Esta função continua a mesma...
    const priorityControl = this.taskForm.get('priority');
    const valueControl = this.taskForm.get('value');

    if (this.isTransaction) {
      priorityControl?.clearValidators();
      valueControl?.setValidators([Validators.required, Validators.min(0.01)]);
    } else {
      priorityControl?.setValidators(Validators.required);
      valueControl?.clearValidators();
    }
    priorityControl?.updateValueAndValidity();
    valueControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const formValue = this.taskForm.value;
    const taskData: Task = {
      id: this.taskToEdit?.id,
      title: formValue.title,
      description: formValue.description,
      dueDate: `${formValue.dueDate}T${formValue.dueTime}:00`,
      status: this.taskToEdit?.status || 'A_FAZER',
      category: formValue.category,
      priority: this.isTransaction ? undefined : formValue.priority,
      value: this.isTransaction ? formValue.value : undefined,
    };

    // CORREÇÃO: A única responsabilidade é emitir o evento
    this.formSubmitted.emit(taskData);
  }

  close(): void {
    this.closeModal.emit();
  }
}
