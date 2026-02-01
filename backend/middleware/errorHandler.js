export const errorHandler=(err,req,res,next)=>{
    console.log(err)
    res.status(500).json({message:'Our server is having a moment. Please try again shortly'})

}