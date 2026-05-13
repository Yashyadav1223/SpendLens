import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    env: {
      NODE_ENV: 'test',
    },
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.ts'],
  },
})
