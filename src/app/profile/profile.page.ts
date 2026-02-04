import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type UserInfo = {
  name: string;
  email: string;
  role: string;
  joinDate: string;
  avatar: string;
};

type ActivityItem = {
  id: string;
  action: string;
  timestamp: string;
  type: 'feature' | 'experiment' | 'rollout';
};

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage {
  private readonly router = inject(Router);

  readonly isProfileEnabled = signal(true);

  readonly profileTheme = signal<'light' | 'dark'>('dark');

  readonly userInfo = signal<UserInfo>({
    name: 'Sarah Anderson',
    email: 'sarah.anderson@flagship.dev',
    role: 'Product Manager',
    joinDate: 'January 2024',
    avatar: 'SA'
  });

  readonly activities: ActivityItem[] = [
    {
      id: '1',
      action: 'Enabled new checkout flow feature',
      timestamp: '2 hours ago',
      type: 'feature'
    },
    {
      id: '2',
      action: 'Started A/B test for pricing page',
      timestamp: '5 hours ago',
      type: 'experiment'
    },
    {
      id: '3',
      action: 'Rolled out dashboard v2 to 50%',
      timestamp: '1 day ago',
      type: 'rollout'
    },
    {
      id: '4',
      action: 'Disabled legacy navigation',
      timestamp: '2 days ago',
      type: 'feature'
    },
    {
      id: '5',
      action: 'Updated user profile experiment',
      timestamp: '3 days ago',
      type: 'experiment'
    }
  ];

  readonly stats = [
    { label: 'Features Managed', value: '24' },
    { label: 'Active Experiments', value: '8' },
    { label: 'Rollouts Completed', value: '15' },
    { label: 'Team Members', value: '12' }
  ];

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
