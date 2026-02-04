import { Injectable, signal } from '@angular/core';
import { GrowthBook } from '@growthbook/growthbook';

import { FeatureKey } from './feature-flags';
import { growthbookConfig } from './growthbook.config';

type FeatureLoadStatus = 'idle' | 'loading' | 'ready' | 'error';

@Injectable({ providedIn: 'root' })
export class GrowthbookService {
  private readonly refreshTick = signal(0);
  readonly status = signal<FeatureLoadStatus>('idle');
  readonly errorMessage = signal<string | null>(null);
  readonly configured = isGrowthbookConfigured(growthbookConfig.clientKey);

  private readonly growthbook = new GrowthBook({
    apiHost: growthbookConfig.apiHost,
    clientKey: growthbookConfig.clientKey,
    enableDevMode: growthbookConfig.devMode
  });

  constructor() {
    if (this.configured) {
      void this.init();
      if (growthbookConfig.refreshIntervalMs > 0) {
        globalThis.setInterval(() => {
          void this.refreshFeatures();
        }, growthbookConfig.refreshIntervalMs);
      }
    }
  }

  async refreshFeatures(): Promise<void> {
    if (!this.configured) {
      this.status.set('idle');
      return;
    }

    this.status.set('loading');
    this.errorMessage.set(null);

    try {
      await this.growthbook.refreshFeatures();
      this.status.set('ready');
      this.bump();
    } catch (error) {
      this.status.set('error');
      this.errorMessage.set(this.normalizeError(error));
    }
  }

  featureValue<T>(key: FeatureKey, fallback: T): T {
    this.refreshTick();
    console.log(key, this.growthbook.getFeatureValue(key, fallback));
    return this.growthbook.getFeatureValue(key, fallback) as T;
  }

  isOn(key: FeatureKey, fallback = false): boolean {
    return Boolean(this.featureValue(key, fallback));
  }

  private async init(): Promise<void> {
    this.status.set('loading');
    this.errorMessage.set(null);

    try {
      await this.growthbook.init({ timeout: growthbookConfig.timeoutMs });
      this.status.set('ready');
      this.bump();
    } catch (error) {
      this.status.set('error');
      this.errorMessage.set(this.normalizeError(error));
    }
  }

  private bump(): void {
    this.refreshTick.update((value) => value + 1);
  }

  private normalizeError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Unable to load feature flags.';
  }
}

function isGrowthbookConfigured(clientKey: string): boolean {
  return clientKey.trim().length > 0 && !clientKey.startsWith('YOUR_');
}
