import { useEffect } from 'react';

declare global {
  interface Window {
    PREFERRED_SOURCE?: Array<(api: { init: () => void }) => void> | {
      push: (callback: (api: { init: () => void }) => void) => void;
    };
  }
}

export function PreferredSourceButton() {
  useEffect(() => {
    const preferredSource = window.PREFERRED_SOURCE ?? [];
    window.PREFERRED_SOURCE = preferredSource;
    preferredSource.push(api => api.init());
  }, []);

  return <div {...{ 'google-add-preferred-source-btn': '' }} />;
}