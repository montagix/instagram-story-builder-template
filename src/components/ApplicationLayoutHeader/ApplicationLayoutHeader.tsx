import Button from '../Button';
import './ApplicationLayoutHeader.styles.scss';
import { useState } from 'react';

interface ApplicationLayoutHeaderProps {
  onSave: () => Promise<string | null>;
}
const ApplicationLayoutHeader = (props: ApplicationLayoutHeaderProps) => {
  const [isLoading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);

    try {
      const now = Date.now();
      const result = await props.onSave();

      if (result == null) {
        alert('Failed to render');
        return;
      }

      alert(`Duration: ${Date.now() - now}ms`);

      downloadFile(result, 'video.mp4');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="app-layout-header">
      <Button
        value={isLoading ? 'Rendering' : 'Save'}
        disabled={isLoading}
        onClick={handleSave}
      />
    </div>
  );
};

export default ApplicationLayoutHeader;

function downloadFile(objectUrl: string, fileName: string) {
  const a = document.createElement('a');

  a.href = objectUrl;
  a.download = fileName || 'download';

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(objectUrl);
}
