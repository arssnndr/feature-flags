import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type SettingSection = {
  id: string;
  title: string;
  description: string;
  items: SettingItem[];
};

type SettingItem = {
  id: string;
  label: string;
  description: string;
  type: 'toggle' | 'select' | 'input';
  value: string | boolean;
  options?: string[];
};

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage {
  private readonly router = inject(Router);

  readonly isSettingsEnabled = signal(true);

  readonly sections = signal<SettingSection[]>([
    {
      id: 'general',
      title: 'General Settings',
      description: 'Basic application preferences',
      items: [
        {
          id: 'app_name',
          label: 'Application Name',
          description: 'Display name for your application',
          type: 'input',
          value: 'Flagship Studio'
        },
        {
          id: 'language',
          label: 'Language',
          description: 'Select your preferred language',
          type: 'select',
          value: 'English',
          options: ['English', 'Indonesian', 'Spanish', 'French']
        },
        {
          id: 'timezone',
          label: 'Timezone',
          description: 'Set your local timezone',
          type: 'select',
          value: 'UTC+7',
          options: ['UTC+0', 'UTC+7', 'UTC+8', 'UTC-5', 'UTC-8']
        }
      ]
    },
    {
      id: 'features',
      title: 'Feature Flags',
      description: 'Control which features are enabled',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard Analytics',
          description: 'Enable advanced analytics dashboard',
          type: 'toggle',
          value: true
        },
        {
          id: 'profile',
          label: 'User Profiles',
          description: 'Enable user profile management',
          type: 'toggle',
          value: true
        },
        {
          id: 'notifications',
          label: 'Notification Center',
          description: 'Enable notification system',
          type: 'toggle',
          value: false
        },
        {
          id: 'dark_mode',
          label: 'Dark Mode',
          description: 'Enable dark theme across the app',
          type: 'toggle',
          value: false
        }
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Connect with external services',
      items: [
        {
          id: 'slack',
          label: 'Slack Integration',
          description: 'Send notifications to Slack channels',
          type: 'toggle',
          value: true
        },
        {
          id: 'datadog',
          label: 'Datadog Monitoring',
          description: 'Send metrics to Datadog',
          type: 'toggle',
          value: false
        },
        {
          id: 'sentry',
          label: 'Sentry Error Tracking',
          description: 'Track errors with Sentry',
          type: 'toggle',
          value: true
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      description: 'Manage security settings',
      items: [
        {
          id: 'two_factor',
          label: 'Two-Factor Authentication',
          description: 'Require 2FA for all users',
          type: 'toggle',
          value: false
        },
        {
          id: 'session_timeout',
          label: 'Session Timeout',
          description: 'Auto logout after inactivity',
          type: 'select',
          value: '30 minutes',
          options: ['15 minutes', '30 minutes', '1 hour', '4 hours', 'Never']
        },
        {
          id: 'audit_log',
          label: 'Audit Logging',
          description: 'Log all user actions',
          type: 'toggle',
          value: true
        }
      ]
    }
  ]);

  updateSetting(sectionId: string, itemId: string, value: string | boolean): void {
    this.sections.update(sections =>
      sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items.map(item =>
              item.id === itemId ? { ...item, value } : item
            )
          };
        }
        return section;
      })
    );
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }

  saveSettings(): void {
    // Simulate save
    alert('Settings saved successfully!');
  }

  resetSettings(): void {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      alert('Settings reset to defaults!');
    }
  }
}
