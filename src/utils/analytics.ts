declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function sendEvent(eventName: string, eventData: Record<string, unknown> = {}) {
  const payload = { event: eventName, ...eventData };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  if (import.meta.env.DEV) {
    console.log('[analytics]', payload);
  }
}
