import JSZip from 'jszip';
import {
  getStoredProjects,
  getStoredCurrently,
  getStoredNotes,
  getStoredSocials,
  getStoredCustomLogo,
} from './portfolioStorage';

// Dynamically capture all source code files for full repository snapshot
const sourceFiles: Record<string, string> = import.meta.glob(
  [
    '/src/**/*.{ts,tsx,css}',
    '/package.json',
    '/tailwind.config.js',
    '/vite.config.ts',
    '/index.html',
    '/tsconfig*.json',
  ],
  { query: '?raw', import: 'default', eager: true }
);

export async function generateFullBackupZip(): Promise<Blob> {
  const zip = new JSZip();

  // 1. Add all project source files to zip
  for (const [path, content] of Object.entries(sourceFiles)) {
    // Clean leading slash for zip relative paths (e.g. /src/App.tsx -> src/App.tsx)
    const relativePath = path.startsWith('/') ? path.slice(1) : path;
    if (typeof content === 'string') {
      zip.file(relativePath, content);
    }
  }

  // 2. Add live database / local data exports
  const dataFolder = zip.folder('live-data-export');
  if (dataFolder) {
    dataFolder.file('projects.json', JSON.stringify(getStoredProjects(), null, 2));
    dataFolder.file('currently.json', JSON.stringify(getStoredCurrently(), null, 2));
    dataFolder.file('contact-inbox-notes.json', JSON.stringify(getStoredNotes(), null, 2));
    dataFolder.file('social-handles.json', JSON.stringify(getStoredSocials(), null, 2));
    dataFolder.file('custom-logo.txt', getStoredCustomLogo() || 'Default VB Monogram');
    dataFolder.file(
      'backup-manifest.json',
      JSON.stringify(
        {
          exportedAt: new Date().toISOString(),
          generator: 'Vedant Portfolio Admin Studio',
          systemVersion: 'v4.0.0',
          totalProjects: getStoredProjects().length,
          totalNotes: getStoredNotes().length,
          totalSocials: getStoredSocials().length,
        },
        null,
        2
      )
    );
  }

  // 3. Add README with setup instructions
  zip.file(
    'BACKUP_README.md',
    `# Vedant Portfolio — Full Backup Archive
Generated on: ${new Date().toLocaleString()}
System Version: v4.0.0 (Confidential)

## Contents of this Archive
1. Complete Project Source Code (\`src/\`, configs, build files)
2. Live Data Export (\`live-data-export/\`):
   - projects.json (All project showcases)
   - social-handles.json (Custom social links)
   - currently.json (Currently learning/building)
   - contact-inbox-notes.json (Received contact notes)
   - custom-logo.txt
   - backup-manifest.json

## Quick Start
1. Extract all files to a local directory on your PC.
2. Open terminal in the extracted directory.
3. Run \`npm install\` to install dependencies.
4. Run \`npm run dev\` to launch the development server.
5. Run \`npm run build\` for production compilation.
`
  );

  return await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
