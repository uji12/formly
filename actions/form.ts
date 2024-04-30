'use server'
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
class UserNotFoundErr extends Error{}
export async function GetFormStats(){
    const user = await currentUser();
    if(!user) throw new  UserNotFoundErr();
    const stats = await prisma.form.aggregate({
        where:{
         userId:user.id
        },
        _sum:{
            visits:true,
            submisions:true
        }
    }) 
    const visits = stats._sum.visits ||0;
    const submissions = stats._sum.submisions||0;
    let submisionRate =0;
    if(visits>0){
        submisionRate = (submissions/visits)*100;
    }
    const bounceRate = 100 - submisionRate;
    return{
        visits,
        submissions,
        submisionRate,
        bounceRate
    }
}