import nodeoutlook from 'nodejs-nodemailer-outlook'

export const confirmationMail = (dest , subject , content)=>{
    try {
        nodeoutlook.sendEmail({
            auth: {
                user: process.env.confirmMail,
                pass: process.env.confirmMailPassword
            },
            from: process.env.confirmMail,
            to: dest,
            subject,
            html: content,
        
            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i)
        }
        )
    } catch (error) {
        res.status(404).json({messege:"email not found" , error})
    }
};