const zod=require("zod")

const createtodo= zod.object({
    title: zod.string(),
    description: zod.string(),
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

module.exports={createtodo,signupValidate, signInValidate}