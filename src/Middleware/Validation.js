const methods = ['body' , 'params' , 'headers','query']

export const validation = (schema)=>{
    return (req,res,next)=>{
        const validationErrs = []
        methods.forEach(key=>{
           if(schema[key]){
            const validationRes = schema[key].validate(req[key] , {abortEarly : false})
            if(validationRes?.error?.details)validationErrs.push(validationRes.error.details)
           }
        })
        if(validationErrs.length){
            res.status(422).json({messege:"Validation Error" , errors : validationErrs})
        }else{
            next()
        }
    }
}