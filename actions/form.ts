'use server'
//jay maababa
import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";
class UserNotFoundErr extends Error{}
export async function GetFormStats(){
    const user = await currentUser();
    if(!user) throw new  UserNotFoundErr();
    const stats = await prisma.form.aggregate({
        where: {
          userId: user.id,
        },
        _sum: {
          visits: true,
          submisions: true,
        },
      });
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
export async function CreateForm(data:formSchemaType){
    const validation = formSchema.safeParse(data);
    if (!validation.success) {
     throw new Error("form not valid");
  }
  const {name,description} = data;
  const user = await currentUser();
  if(!user) throw new  UserNotFoundErr();
  const form = await prisma.form.create({
    data:{
        userId:user.id,
        name,
        description
    }

  })
  if(!form) throw new Error('Something Went Wrong!!');
  return form.id;
}

export async function GetForms(){
    const user = await currentUser();
    if(!user) throw new  UserNotFoundErr();
    return await prisma.form.findMany({
        where:{
            userId:user.id
        },
        orderBy:{
           createdAt:"desc"
        }
    })
}

export  const GetFormById= async(id:number)=>{
  const user = await currentUser();
  if(!user) throw new  UserNotFoundErr();
  return await prisma.form.findUnique({
    where:{
        userId :user.id,
        id
    }
  })
}

export async function UpdateFormContent(id:number,jsonContent:string){
    const user = await currentUser();
    if(!user) throw new  UserNotFoundErr();
    return await prisma.form.update({
        where:{
            userId:user.id,
            id,
        },
        data:{
            content:jsonContent
        }
    })
}
export async function PublishForm(id:number){
    const user = await currentUser();
    if(!user) throw new  UserNotFoundErr();
    return await prisma.form.update({
        where:{
            userId:user.id,
            id,
        },
        data:{
           published:true
        }
    })
}
export async function GetFormContebtByUrl(formurl:string){
    return await prisma.form.update({
       where:{
        shareURL:formurl,
       },
       select:{
        content:true
    },
     data:{
        visits:{
            increment:1
        }
     }
    })
}
export async function submitForm(formurl:string,content:string){
    return await prisma.form.update({
        data:{
            submisions:{
                increment:1
            },
          FormSubmissions:{
            create:{
                content
            }
          }
        },
        where:{
            shareURL:formurl,
            published:true
        }
    })
}
export async function GetFormWithSubmissions(id:number) {
    const user = await currentUser();
    if(!user) throw new  UserNotFoundErr();
    return await prisma.form.findUnique({
        where:{
            userId:user.id,
            id
        },
        include:{
            FormSubmissions:true
        }
    })
}