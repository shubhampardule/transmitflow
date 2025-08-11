export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(1));
  
  // Show appropriate precision based on size
  if (i === 0) return `${bytes} ${sizes[i]}`; // Bytes - no decimal
  if (i === 1 && size >= 100) return `${Math.round(size)} ${sizes[i]}`; // KB >= 100 - no decimal
  if (i >= 2 && size >= 100) return `${Math.round(size)} ${sizes[i]}`; // MB/GB >= 100 - no decimal
  
  return `${size} ${sizes[i]}`;
};

export const generateRoomCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const downloadFile = (file: File): void => {
  console.log('downloadFile called with:', file.name, file.size, 'bytes');
  
  try {
    // Create URL for the file
    const url = URL.createObjectURL(file);
    console.log('Created object URL:', url);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    
    // Make sure the download attribute is properly set
    if (!link.download) {
      console.error('Download attribute not supported or not set properly');
      // Fallback: try to open in new window
      window.open(url, '_blank');
      return;
    }
    
    console.log('Created download link - href:', link.href, 'download:', link.download);
    
    // Style the link to be invisible but present
    link.style.position = 'fixed';
    link.style.top = '-1000px';
    link.style.left = '-1000px';
    link.style.visibility = 'hidden';
    
    // Add to document
    document.body.appendChild(link);
    console.log('Link added to document body');
    
    // Force the download
    if (typeof link.click === 'function') {
      link.click();
      console.log('Link clicked successfully');
    } else {
      // Fallback for older browsers
      const event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      link.dispatchEvent(event);
      console.log('Click event dispatched');
    }
    
    // Clean up after a delay
    setTimeout(() => {
      try {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        URL.revokeObjectURL(url);
        console.log('Cleanup completed successfully');
      } catch (cleanupError) {
        console.warn('Cleanup error (non-critical):', cleanupError);
      }
    }, 200);
    
  } catch (error) {
    console.error('Download failed:', error);
    
    // Last resort: try to open the file in a new tab
    try {
      const url = URL.createObjectURL(file);
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        console.log('Opened file in new window as fallback');
      } else {
        console.error('Failed to open file - popup blocker may be active');
      }
    } catch (fallbackError) {
      console.error('All download methods failed:', fallbackError);
    }
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const calculateTransferSpeed = (
  bytesTransferred: number,
  startTime: number
): number => {
  const elapsed = (Date.now() - startTime) / 1000; // seconds
  return elapsed > 0 ? bytesTransferred / elapsed : 0;
};

export const estimateTimeRemaining = (
  bytesTransferred: number,
  totalBytes: number,
  speed: number
): number => {
  if (speed === 0) return Infinity;
  const remainingBytes = totalBytes - bytesTransferred;
  return remainingBytes / speed;
};

export const formatTime = (seconds: number): string => {
  if (!isFinite(seconds)) return '∞';
  
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hrs > 0) return `${hrs}h ${mins}m`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
};
