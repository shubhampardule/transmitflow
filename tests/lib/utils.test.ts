import { describe, it, expect } from 'vitest';
import { cn } from '../../src/lib/utils';

describe('utils', () => {
    describe('cn', () => {
        it('merges class names correctly', () => {
             const result = cn('c1', 'c2');
             expect(result).toBe('c1 c2');
        });

        it('handles conditional class names', () => {
            const condition = true;
            const result = cn('c1', condition && 'c2', !condition && 'c3');
            expect(result).toBe('c1 c2');
        });

        it('merges tailwind classes correctly using tailwind-merge behavior', () => {
            // p-4 should overwrite p-2
            const result = cn('p-2', 'p-4');
            expect(result).toBe('p-4');
        });

        it('handles undefined and null inputs gracefully', () => {
            const result = cn('c1', undefined, null, 'c2');
            expect(result).toBe('c1 c2');
        });
    });
});
