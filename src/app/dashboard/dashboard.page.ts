import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type MetricCard = {
  id: string;
  title: string;
  value: string;
  change: string;
  positive: boolean;
};

type ChartData = {
  label: string;
  value: number;
};

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  private readonly router = inject(Router);

  readonly isDashboardEnabled = signal(true);

  readonly chartType = signal<'line' | 'bar'>('line');

  readonly metrics: MetricCard[] = [
    {
      id: '1',
      title: 'Total Users',
      value: '12,543',
      change: '+23.5%',
      positive: true
    },
    {
      id: '2',
      title: 'Active Features',
      value: '28',
      change: '+12.3%',
      positive: true
    },
    {
      id: '3',
      title: 'Experiments Running',
      value: '7',
      change: '-5.2%',
      positive: false
    },
    {
      id: '4',
      title: 'Success Rate',
      value: '94.2%',
      change: '+8.7%',
      positive: true
    }
  ];

  readonly chartData: ChartData[] = [
    { label: 'Mon', value: 450 },
    { label: 'Tue', value: 520 },
    { label: 'Wed', value: 490 },
    { label: 'Thu', value: 680 },
    { label: 'Fri', value: 750 },
    { label: 'Sat', value: 640 },
    { label: 'Sun', value: 580 }
  ];

  readonly maxValue = computed(() =>
    Math.max(...this.chartData.map(d => d.value))
  );

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
