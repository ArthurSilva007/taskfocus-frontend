import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  selectedTheme: 'dark' | 'light' = 'dark';
  emailNotifications: boolean = true;
  newCategory: string = '';

  private themeSubscription?: Subscription;

  constructor(
    private renderer: Renderer2
    // private authService: AuthService
  ) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      this.selectedTheme = savedTheme;
    }
    this.applyTheme();
  }

  onThemeChange(): void {
    localStorage.setItem('theme', this.selectedTheme);
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.selectedTheme === 'light') {
      this.renderer.addClass(document.body, 'light-theme');
    } else {
      this.renderer.removeClass(document.body, 'light-theme');
    }
  }

  /**
   * CORRIGIDO: O nome do método agora corresponde ao HTML.
   */
  onNotificationsToggle(): void {
    console.log('Preferência de notificação salva:', this.emailNotifications);
    // Lógica para chamar this.userService.updatePreferences(...)
  }

  addCategory(): void {
    if (this.newCategory.trim()) {
      alert(`Categoria "${this.newCategory}" adicionada!`);
      // Lógica para chamar this.categoryService.add(...)
      this.newCategory = '';
    }
  }

  deleteAccount(): void {
    const confirmation = prompt('ATENÇÃO: Esta ação é irreversível. Para confirmar, digite "EXCLUIR" abaixo:');
    if (confirmation === 'EXCLUIR') {
      alert('Conta excluída com sucesso. Você será desconectado.');
      // Lógica para chamar this.authService.deleteAccountAndLogout();
    } else {
      alert('Exclusão cancelada.');
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'light-theme');
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
