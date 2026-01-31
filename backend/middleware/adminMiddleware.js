

export const adminonly = (req,res,next)=>{
   try{
     if(req.user.role!=='admin'){
        return res.status(403).json({message:"Access Denied , Admin only"})

    }
    next()
   }catch(err){
    return res.status(403).json({message:"Unauthorized"})
   }

}