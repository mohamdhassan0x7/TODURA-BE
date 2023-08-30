import nodeoutlook from 'nodejs-nodemailer-outlook'


export const confirmationMail = (dest , subject , messege)=>{

nodeoutlook.sendEmail({
    auth: {
        user: "todura.confirmation@outlook.com",
        pass: "01094762709Mm"
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