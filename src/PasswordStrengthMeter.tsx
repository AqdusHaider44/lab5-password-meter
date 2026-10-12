import { useState } from "react";

function calculateScore(password: string): number {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
}

export default function PasswordStrengthMeter() {
  const [password, setPassword] = useState("");

  const score = calculateScore(password);

  const label =
    password.length === 0
      ? "Enter a password"
      : password.length < 8 || score <= 2
        ? "Weak"
        : score <= 4
          ? "Medium"
          : "Strong";

  return (
    <section>
      <label htmlFor="strength-password">Password</label>

      <input
        id="strength-password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="new-password"
      />

      <progress
        value={password.length < 8 ? 0 : score}
        max={5}
        aria-label="Password strength"
      />

      <p>{label}</p>
    </section>
  );
}