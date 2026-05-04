import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component'; // Reutilizaremos o cabeçalho

// Modelo para uma notificação
interface Notification {
  type: 'task' | 'goal' | 'expense';
  icon: string;
  title: string;
  details: string;
  highlight?: 'red' | 'yellow';
  value?: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  userName: string = 'Anderson'; // Poderia vir de um serviço de usuário
  notifications: Notification[] = [];

  constructor() { }

  ngOnInit(): void {
    // Carregaremos dados mocados para simular uma chamada de API
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notifications = [
      {
        type: 'task',
        icon: 'bi bi-calendar-check', // CORRIGIDO
        title: 'Tarefa Próxima',
        details: 'AMANHÃ • 14:00',
      },
      {
        type: 'goal',
        icon: 'bi bi-x-circle-fill', // CORRIGIDO
        title: 'Meta não batida',
        details: 'Há 3 dias',
        highlight: 'yellow'
      },
      {
        type: 'expense',
        icon: 'bi bi-arrow-down-circle-fill', // CORRIGIDO
        title: 'Despesas excessivas',
        details: 'Dispon',
        highlight: 'red',
        value: '2.500'
      },
      {
        type: 'task',
        icon: 'bi bi-calendar-check-fill', // CORRIGIDO
        title: 'Tarefa Próxima',
        details: 'Hoje - 17:00',
        highlight: 'red',
        value: 'HOJE'
      }
    ];
  }

  getHighlightClass(notification: Notification): string {
    if (notification.highlight === 'red') return 'highlight-red';
    if (notification.highlight === 'yellow') return 'highlight-yellow';
    return '';
  }
}
