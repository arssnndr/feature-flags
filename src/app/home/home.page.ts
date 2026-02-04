import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { featureDefaults } from '../feature-flags';
import { growthbookConfig } from '../growthbook.config';
import { GrowthbookService } from '../growthbook.service';

type QuickAction = {
  id: string;
  title: string;
  description: string;
  meta: string;
  iconClass: string;
};

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  private readonly growthbook = inject(GrowthbookService);

  protected readonly configured = this.growthbook.configured;
  protected readonly status = this.growthbook.status;
  protected readonly errorMessage = this.growthbook.errorMessage;

  protected readonly heroVariant = computed(() => {
    const variant = this.growthbook.featureValue('hero_variant', featureDefaults.hero_variant) as string;
    return variant === 'studio' ? 'studio' : 'launch';
  });

  protected readonly heroAccent = computed(() => {
    return this.heroVariant() === 'studio' ? 'var(--teal-500)' : 'var(--coral-500)';
  });

  protected readonly heroCopy = computed(() => {
    if (this.heroVariant() === 'studio') {
      return {
        eyebrow: 'Studio mode',
        title: 'Design experiments that keep learning',
        subtitle:
          'Turn product ideas into controlled rollouts, audience splits, and instant rollbacks without touching deployments.',
        badge: 'Experiment-ready'
      };
    }

    return {
      eyebrow: 'Launch mode',
      title: 'Ship faster with instant feature control',
      subtitle:
        'Release new workflows, throttle rollouts, and coordinate launches from one place without redeploying.',
      badge: 'Release-ready'
    };
  });

  protected readonly showQuickActions = computed(() =>
    this.growthbook.isOn('quick_actions', featureDefaults.quick_actions)
  );

  protected readonly showTestimonials = computed(() =>
    this.growthbook.isOn('show_testimonials', featureDefaults.show_testimonials)
  );

  protected readonly statusLabel = computed(() => {
    if (!this.configured) {
      return 'Add client key';
    }

    const status = this.status();

    if (status === 'loading') {
      return 'Syncing';
    }

    if (status === 'ready') {
      return 'Connected';
    }

    if (status === 'error') {
      return 'Error';
    }

    return 'Idle';
  });

  protected readonly statusTone = computed(() => {
    if (!this.configured) {
      return 'idle';
    }

    return this.status();
  });

  protected readonly refreshIntervalLabel = computed(() => {
    if (growthbookConfig.refreshIntervalMs <= 0) {
      return 'Auto refresh off';
    }

    return `Auto refresh every ${Math.round(growthbookConfig.refreshIntervalMs / 1000)}s`;
  });

  protected readonly quickActions = computed(() => {
    if (!this.showQuickActions()) {
      return [];
    }

    return this.quickActionItems;
  });

  protected readonly flagRows = computed(() => [
    {
      key: 'hero_variant',
      label: 'Hero variant',
      type: 'string',
      value: this.heroVariant(),
      fallback: featureDefaults.hero_variant
    },
    {
      key: 'quick_actions',
      label: 'Quick actions',
      type: 'boolean',
      value: this.showQuickActions() ? 'on' : 'off',
      fallback: featureDefaults.quick_actions ? 'on' : 'off'
    },
    {
      key: 'show_testimonials',
      label: 'Testimonials',
      type: 'boolean',
      value: this.showTestimonials() ? 'on' : 'off',
      fallback: featureDefaults.show_testimonials ? 'on' : 'off'
    }
  ]);

  protected refreshFlags(): void {
    void this.growthbook.refreshFeatures();
  }

  protected readonly quickActionItems: QuickAction[] = [
    {
      id: 'guardrails',
      title: 'Guarded releases',
      description: 'Lock, unlock, and roll back experiments without waiting for deploys.',
      meta: 'Average rollback in 45s',
      iconClass: 'icon icon--guard'
    },
    {
      id: 'audiences',
      title: 'Precision audiences',
      description: 'Target by plan, region, or team size with rule-based segments.',
      meta: '5 live segments',
      iconClass: 'icon icon--target'
    },
    {
      id: 'learning',
      title: 'Learning loops',
      description: 'Track outcomes and keep the winning variant on.',
      meta: 'Live metrics',
      iconClass: 'icon icon--signal'
    }
  ];

  protected readonly testimonials: Testimonial[] = [
    {
      id: 'atlas',
      quote: 'We shipped a phased launch in one afternoon with full rollback controls.',
      name: 'Maya Ortiz',
      role: 'Product Lead',
      company: 'Atlas Health'
    },
    {
      id: 'rove',
      quote: 'Our growth team can now test pricing without waiting for engineering.',
      name: 'Shawn Lee',
      role: 'Head of Growth',
      company: 'Rove Logistics'
    },
    {
      id: 'clara',
      quote: 'The new guardrails cut our incident response time in half.',
      name: 'Dani Cho',
      role: 'Platform Manager',
      company: 'Clara AI'
    }
  ];
}
