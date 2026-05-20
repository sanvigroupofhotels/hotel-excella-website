export type QueryResult<T> = Promise<{ data: T | null; error: { message: string } | null }>

type Row = Record<string, any>

const store = {
  quotes: [] as Row[],
  quote_activities: [] as Row[],
}

function tableApi(table: keyof typeof store) {
  return {
    select() {
      return {
        order() { return this },
        limit() { return Promise.resolve({ data: store[table], error: null }) },
        eq(key: string, val: any) { return Promise.resolve({ data: store[table].find((r) => r[key] === val) ?? null, error: null }) },
        then: undefined,
      }
    },
    insert(payload: Row) {
      const row = { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...payload }
      store[table].push(row)
      return { select: () => ({ single: () => Promise.resolve({ data: row, error: null }) }) }
    },
    update(values: Row) {
      return {
        eq(key: string, val: any) {
          const idx = store[table].findIndex((r) => r[key] === val)
          if (idx >= 0) store[table][idx] = { ...store[table][idx], ...values, updated_at: new Date().toISOString() }
          return Promise.resolve({ data: null, error: null })
        },
      }
    },
  }
}

export const createClient = () => ({
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      if (!email || !password) return { error: { message: "Email/password required" } }
      if (typeof document !== "undefined") document.cookie = "sb-local-auth-token=1; path=/"
      return { error: null }
    },
  },
  from: (table: keyof typeof store) => tableApi(table),
  channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
  removeChannel: () => {},
})
