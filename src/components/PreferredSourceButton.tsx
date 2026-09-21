import { useEffect } from 'react';

declare global {
  interface Window {
    preferredSource?: {
      init: () => void;
    };
  }
}

export function PreferredSourceButton() {
  useEffect(() => {
    window.preferredSource?.init();
  }, []);

  return <div {...{ 'google-add-preferred-source-btn': '' }} />;
}