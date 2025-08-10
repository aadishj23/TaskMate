const express= require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const bcrypt = require("bcryptjs")
const jwt=  require("jsonwebtoken")
const {auth} = require("./middleware/auth")
const {TodoData,User}=require("./database")
const {createtodo,signupValidate,signInValidate}=require("./validation")

dotenv.config()
const app= express()
const port=process.env.PORT || 3000
const jwtSecret = process.env.JWT_SECRET

app.use(cors())
app.use(express.json())
app.use((err,req,res,next)=>{
    res.json({
        'msg': 'something went wrong '
    })
})

app.get("/",(req,res)=>{
    res.send("Hello TaskMate User")
})

app.post("/create", auth,async (req,res) => {
    const {title,description,userID}= req.body
    const parsedpayload=createtodo.safeParse(req.body)
    if (!parsedpayload.success){
        res.status(403).json({
            msg: "invalid format"
        })
    } else{
        try{
            const data = await TodoData.create({
                userid: userID,
                title: title,
                description: description,
            })
            res.status(200).json({
                data,
                msg: "todo created"
            })
        } catch {
            res.status(400).json({
                msg: "error occured"
            })
        }
    }
})

app.put("/updatestatus/:id", auth, async (req,res) => {
    const {id}= req.params
    const {userID}= req.body
        try{
            const data = await TodoData.updateOne({
                _id: id,
                userid: userID
            },{
                status: true
            })
            res.status(200).json({
                data,
                msg: "todo updated"
            })
        } catch {
            res.status(400).json({
                msg: "error occured"
            })
        }
})

app.put("/updatedata/:id", auth, async (req,res) => {
    const {id}= req.params
    const {userID,title,description}= req.body
    const parsedpayload=createtodo.safeParse(req.body)
    if (!parsedpayload.success){
        res.status(403).json({
            msg: "invalid format"
        })
    } else{
        try{
            const data = await TodoData.updateOne({
                _id: id,
                userid: userID
            },{
                title: title,
                description: description
            })
            res.status(200).json({
                data,
                msg: "todo updated"
            })
        } catch {
            res.status(400).json({
                msg: "error occured"
            })
        }
    }
})

app.delete("/delete/:id", auth, async (req,res) => {
    const {id}= req.params
    const {userID}= req.body
    try{
        const data = await TodoData.deleteOne({
            _id: id,
            userid: userID
        })   
        res.status(200).json({
            data,
            msg: "todo deleted"
        })
    } catch {
        res.status(400).json({
            msg: "error occured"
        })
    }
})


app.get("/view" , auth , async (req,res)=>{
    const data= await TodoData.find({userid: req.body.userID})
    res.status(200).json({
        data
    })
})

app.post("/signup", async(req,res)=> {
    const {name,password,email,phone}= req.body
    const signUpParse = signupValidate.safeParse(req.body)
    if (!signUpParse.success){
        res.status(403).json({
            "message" : "Invalid Data Entered"
        })
    } else {
        const hashedPassword = await bcrypt.hash(password,10)
            const user= await User.create({
                name,
                password: hashedPassword,
                email,
                phone
            })
            res.status(200).json({
                "message" : "User Created Successfully",
                "User": user
            })
    }
})

app.post("/signin", async(req,res)=> {
    const {email,password} = req.body
    const signInParse = await signInValidate.safeParse(req.body)
    if (!signInParse.success){
        res.status(403).json({
            "message" : "Invalid Email or Password"
        })
    }
    else{
        const user= await User.findOne({email})
        if(user){
            const isPasswordValid = await bcrypt.compare(password,user.password)
            if(isPasswordValid){
                if(jwtSecret){
                    const token= jwt.sign({
                        userid: user._id
                    },jwtSecret,{ expiresIn: '10d' })
                    res.status(200).json({
                        token,
                        name: user.name
                    })
                } else{
                    res.status(400).send("JWT SECRET not defined")
                }
            } else{
                res.status(400).send("Invalid Password")
            }
        } else{
            res.send(400).send("User doesn't exist")
        }
    }
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})