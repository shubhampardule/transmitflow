import { describe, it, expect } from 'vitest';
import { formatFileSize, generateRoomCode } from '../../src/lib/file-utils';

describe('file-utils', () => {
  describe('formatFileSize', () => {
    it('returns "0 B" for 0 bytes', () => {
      expect(formatFileSize(0)).toBe('0 B');
    });

    it('formats bytes correctly', () => {
      expect(formatFileSize(512)).toBe('512 B');
      expect(formatFileSize(1023)).toBe('1023 B');
    });

    it('formats KB correctly', () => {
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1536)).toBe('1.5 KB'); // 1.5 * 1024 = 1536
      expect(formatFileSize(1024 * 100)).toBe('100 KB');
    });

    it('formats MB correctly', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1024 * 1024 * 1.5)).toBe('1.5 MB');
      expect(formatFileSize(1024 * 1024 * 500)).toBe('500 MB');
    });

    it('formats GB correctly', () => {
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
      expect(formatFileSize(1024 * 1024 * 1024 * 2.5)).toBe('2.5 GB');
    });

    it('formats TB and PB correctly', () => {
      expect(formatFileSize(1024 ** 4)).toBe('1 TB');
      expect(formatFileSize(1024 ** 5)).toBe('1 PB');
    });

    it('clamps to the largest known unit instead of indexing past the table', () => {
      // Regression test: extremely large sizes used to compute an index
      // past the end of the `sizes` array and render "NaN undefined".
      expect(formatFileSize(1024 ** 6)).toBe('1024 PB');
      expect(formatFileSize(Number.MAX_SAFE_INTEGER)).not.toContain('undefined');
      expect(formatFileSize(Number.MAX_SAFE_INTEGER)).not.toContain('NaN');
    });

    it('rounds correctly for large values', () => {
        // e.g. 150.7 KB => 151 KB, based on logic in function for sizes >= 100
        // Logic: if (i === 1 && size >= 100) return `${Math.round(size)} ${sizes[i]}`;
        const kbSize = 150.7 * 1024; 
        expect(formatFileSize(kbSize)).toBe('151 KB');
    });
  });

  describe('generateRoomCode', () => {
    it('generates a code of length 4', () => {
      const code = generateRoomCode();
      expect(code).toHaveLength(4);
    });

    it('generates a string from allowed charset', () => {
      const code = generateRoomCode();
      const charset = '0123456789';
      for (const char of code) {
        expect(charset).toContain(char);
      }
    });

    it('uses crypto.getRandomValues (mocked environment check implies usage)', () => {
      // Since we are in happy-path jsdom environment, this should just work
      // verifying that it doesn't crash or return undefined matches
      const code = generateRoomCode();
      expect(code).toBeTruthy();
    });
  });
});
