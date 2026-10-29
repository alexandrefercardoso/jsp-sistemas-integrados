export function recoveryRedirect(origin: string) {
  return `${origin}/reset-password`;
}

export function isRecoveryHash(hash: string) {
  return new URLSearchParams(hash.replace(/^#/, '')).get('type') === 'recovery';
}

export function passwordError(password: string, confirmation: string) {
  if (password.length < 6) return 'Use uma senha com pelo menos 6 caracteres.';
  if (password !== confirmation) return 'As senhas não coincidem.';
  return null;
}