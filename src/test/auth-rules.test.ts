import { describe, expect, it } from 'vitest';
import { recoveryRedirect, isRecoveryHash, passwordError } from '@/lib/auth-rules';
describe('Password recovery', () => {
  it('returns users to the public reset-password page', () => { expect(recoveryRedirect('https://jsp.example')).toBe('https://jsp.example/reset-password'); });
  it('distinguishes password recovery from ordinary sign-in', () => { expect(isRecoveryHash('#type=recovery&access_token=example')).toBe(true); expect(isRecoveryHash('#type=signup')).toBe(false); });
  it('requires matching passwords', () => { expect(passwordError('abcdef', 'abcdeg')).toBe('As senhas não coincidem.'); expect(passwordError('abcdef', 'abcdef')).toBeNull(); });
});