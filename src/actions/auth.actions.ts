'use server'
import db from '@/db'
import { cookies } from 'next/headers'
import { lucia } from '@/auth'
import { redirect } from 'next/navigation'
import { compare } from 'bcryptjs'
import { z } from 'zod'
import { LoginSchema } from '@/schemas/auth.schema'

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) return { error: 'Campos inválidos' }

  const { data } = validatedFields

  try {
    const exists = await db.user.findUnique({
      where: { username: data.username },
    })
    if (!exists) return { error: 'Ocurrió un error, revise sus credenciales.' }

    if (!exists.password)
      return { error: 'Ocurrió un error, revise sus credenciales.' }
    const isPasswordValid = await compare(data.password, exists.password)

    if (!isPasswordValid)
      return { error: 'Ocurrió un error, revise sus credenciales.' }

    const session = await lucia.createSession(exists.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return redirect('/')
  } catch (error) {
    console.log(error)
    if (error instanceof Error) return { error: error.message }

    return { error: 'Internal Server Error' }
  }
}
