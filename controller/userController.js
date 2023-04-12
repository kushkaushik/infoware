const mongoose  = require('mongoose')
const INFOWARE = mongoose.model("infoware")

const postData = (req,res) =>{
    const {name , lastname , email , phone , location} = req.body;
    if(!name || !email || !phone || !lastname || !location){
      return  res.status(404).json({
            success:false,
            msg:"please fill all the fields"
        })
    }
    else{
        INFOWARE.findOne({email}).then(data=>{
            if(data){
                return res.status(401).json({
                    success:false,
                    msg:"Duplicate Entry"
                })
            }
            else{
                const dataSaver = new INFOWARE({
                    name, lastname, email, location , phone
                })
                dataSaver.save().then(mydata=>{
                    return res.status(200).json({
                        success:true,
                        msg:"Saved Successfully",
                        mydata
                    })
                })
            }
        })
    }

}

const getData = (req,res) =>{
    INFOWARE.find().sort({name:1}).then(getData=>{
        return res.status(201).json({
            success:true,
            data:getData
        })
    })
}

const updateData = (req,res) =>{
    INFOWARE.findByIdAndUpdate(req.params._id,req.body).then(data=>{
        if(!data) return res.status(301).json({success:true,msg:"Something Wrong"})
        res.status(201).json({success:true,data});
    })
}

const deleteData = (req,res) =>{
    INFOWARE.findByIdAndDelete(req.params._id).then(mydata=>{
        if(!mydata){
            return res.status(404).json({
                success:false,
                msg:"not found"
            })
        }
        return res.status(200).json({
            success:true,
            msg:"delete Successfully"
        })
    })
}


module.exports = {postData,getData,updateData,deleteData}