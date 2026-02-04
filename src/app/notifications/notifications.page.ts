import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'warning' | 'info' | 'error';
};

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.page.html',
  styleUrl: './notifications.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsPage {
  private readonly router = inject(Router);

  readonly isNotificationsEnabled = signal(true);

  readonly isRealtimeEnabled = signal(true);

  readonly notifications = signal<Notification[]>([
    {
      id: '1',
      title: 'Feature Flag Updated',
      message: 'Dashboard feature has been enabled for all users',
      time: '5 minutes ago',
      read: false,
      type: 'success'
    },
    {
      id: '2',
      title: 'Rollout Warning',
      message: 'New checkout flow at 45% - monitoring conversion rate',
      time: '1 hour ago',
      read: false,
      type: 'warning'
    },
    {
      id: '3',
      title: 'Experiment Started',
      message: 'A/B test for pricing page is now live',
      time: '3 hours ago',
      read: true,
      type: 'info'
    },
    {
      id: '4',
      title: 'Critical Alert',
      message: 'Error rate spike detected in payment service',
      time: '5 hours ago',
      read: true,
      type: 'error'
    },
    {
      id: '5',
      title: 'Rollout Complete',
      message: 'User profile v2 successfully rolled out to 100%',
      time: '1 day ago',
      read: true,
      type: 'success'
    },
    {
      id: '6',
      title: 'System Update',
      message: 'GrowthBook SDK updated to version 2.1.0',
      time: '2 days ago',
      read: true,
      type: 'info'
    }
  ]);

  readonly unreadCount = computed(() =>
    this.notifications().filter(n => !n.read).length
  );

  markAsRead(id: string): void {
    this.notifications.update(notifications =>
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead(): void {
    this.notifications.update(notifications =>
      notifications.map(n => ({ ...n, read: true }))
    );
  }

  deleteNotification(id: string): void {
    this.notifications.update(notifications =>
      notifications.filter(n => n.id !== id)
    );
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
