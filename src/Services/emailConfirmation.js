import nodeoutlook from 'nodejs-nodemailer-outlook'


export const confirmationMail = (dest , subject , messege)=>{

nodeoutlook.sendEmail({
    auth: {
        user: process.env.confirmMail,
        pass: process.env.confirmMailPassword
    },
    from: process.env.confirmMail,
    to: dest,
    subject,
    html: messege,
    
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
}


);
}