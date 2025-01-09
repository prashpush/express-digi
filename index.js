import 'dotenv/config'
import express from 'express'

const app=express()

const port=process.env.PORT||3000

// app.get("/",(req,res)=>{
//     res.send("hello prashant")
// })
// app.get("/surname",(req,res)=>{
//     res.send("yadav")
// })
// app.get("/address",(req,res)=>{
//     res.send("haryana")
// })

//TO ACCEPT SETTINGS OR DATA FROM FRONTEND

app.use(express.json())

let teaData=[]
let nextId=1

//whenever we want to save the data  we usually use post we can use get too
app.post('/teas',(req,res)=>{
   const {name,price} = req.body
   const newTea = {id:nextId++,name,price}
   teaData.push(newTea)
   res.status(201).send(newTea)
})
// get whole array means getting all the teas
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

//get a speceific tea with id
app.get('/teas/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))

    if(!tea){
        return res.status(404).send('Tea not found')
    }
    else{
        res.status(200).send(tea)
    }
})

//update tea

app.put('/teas/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    else{
        const {name,price}=req.body
        tea.name=name
        tea.price=price
        res.send(200).send(tea)
    }
})

//delete  tea

app.delete('/teas/:id',(req,res)=>{
   const index = teaData.findIndex(t=>t.id===parseInt(req.params.id))
   if(index===-1){
    return res.status(404).send('Tea not found')
   }
   else{
    teaData.splice(index,1)
    return res.status(200).send('deleted')
   }
})

app.listen(port,()=>{
    console.log(`Server is running at port : ${port}...`)
})