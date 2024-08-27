const zod=require("zod")

const createtodo= zod.object({
    title: zod.string(),
    description: zod.string(),
    status: zod.boolean()
})

const updatetodo= zod.object({
    id: zod.string()
})

const signupValidate= zod.object({
    name: zod.string(),
    password: zod.string().min(8),
    email: zod.string().email(),
    phone: zod.string().min(10)
})

const signInValidate = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
})

module.exports={createtodo, updatetodo,signupValidate, signInValidate}