/**
 * Helper to parse and convert Google Drive sharing links into directly viewable image or embeddable video streams.
 */

export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;
  
  // Match https://drive.google.com/file/d/{ID}/view...
  const matchFile = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFile && matchFile[1]) return matchFile[1];

  // Match id={ID} query parameter
  const matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) return matchId[1];

  // Match https://drive.google.com/open?id={ID}
  const matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
  if (matchOpen && matchOpen[1]) return matchOpen[1];

  // Match lh3.googleusercontent.com/d/{ID}
  const matchLh3 = url.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (matchLh3 && matchLh3[1]) return matchLh3[1];

  // If the string itself is a 28-40 char Google Drive ID
  if (/^[a-zA-Z0-9_-]{28,45}$/.test(url.trim())) {
    return url.trim();
  }

  return null;
}

export function formatMediaUrl(url: string, mediaType: 'image' | 'video' = 'image'): string {
  if (!url) return '';
  const driveId = extractGoogleDriveId(url);
  if (!driveId) return url;

  if (mediaType === 'video') {
    // For video files on Google Drive, the preview iframe embed is standard and reliable
    return `https://drive.google.com/file/d/${driveId}/preview`;
  }

  // For images, Google UserContent direct CDN link works best without CORS or login issues
  return `https://lh3.googleusercontent.com/d/${driveId}`;
}

export function getDriveThumbnailUrl(url: string): string {
  const driveId = extractGoogleDriveId(url);
  if (!driveId) return url;
  return `https://drive.google.com/thumbnail?id=${driveId}&sz=w800`;
}

export function isGoogleDriveEmbedVideo(url: string): boolean {
  return url.includes('drive.google.com') && url.includes('/preview');
}
