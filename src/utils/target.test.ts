import { renderHook, act } from '@testing-library/react-hooks';
import { jest, describe } from '@jest/globals';
import useThrottleFn from '../hooks/useThrottleFn';

describe('useThrottleFn', () => {
    jest.useFakeTimers();

    it('should throttle the function call', () => {
        const mockFn = jest.fn();
        const { result } = renderHook(() => useThrottleFn(mockFn, { wait: 500 }));

        act(() => {
            result.current();
            result.current();
            jest.advanceTimersByTime(400);
            result.current();
            jest.advanceTimersByTime(600);
            result.current();
        });

        expect(mockFn).toHaveBeenCalledTimes(2);
    })
})