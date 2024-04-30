import { GetFormStats } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import { Suspense } from "react";
import { LuView } from "react-icons/lu";
import {FaWpforms} from "react-icons/fa"
import {HiCursorClick} from "react-icons/hi"
import {TbArrowBounce} from "react-icons/tb"
import CreateFormBtn from "@/components/CreateFormBtn";
export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true}/>}>
         <CardStatWrapper/>
      </Suspense>
      <Separator className="my-6"/>
        <h2 className="text-4xl font-bold col-span-2">Your forms </h2>
        <Separator className="my-6"/>
      <CreateFormBtn/>
    </div>
  );
}

interface StatsCardProps{
  data ?: Awaited<ReturnType<typeof GetFormStats>>
  loading : boolean
}
async function CardStatWrapper(){
  const stats = await GetFormStats();
  return <StatsCards loading ={false} data ={stats}/>
}
function StatsCards({data,loading}:StatsCardProps){
   return <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
     <StatsCard 
        title="Total visits"
        icon = {<LuView className="text-blue-600"/>}
        helpertext ="All time form visits"
        value ={data?.visits.toLocaleString() ||""}
        loading ={loading}
        className='shadow-md shadow-blue-600'
     />
      <StatsCard 
        title="Total submissions"
        icon = {<FaWpforms className="text-yellow-600"/>}
        helpertext ="All time form visits"
        value ={data?.visits.toLocaleString() ||""}
        loading ={loading}
        className='shadow-md shadow-yellow-600'
     />
      <StatsCard 
        title="Submissions rate"
        icon = {<HiCursorClick className="text-green-600"/>}
        helpertext ="Visits that result in form submissions"
        value ={data?.visits.toLocaleString()+"%"||""}
        loading ={loading}
        className='shadow-md shadow-green-600'
     />
      <StatsCard 
        title="Bounce rate"
        icon = {<TbArrowBounce className="text-red-600"/>}
        helpertext ="Visits that leaves without interacting"
        value ={data?.visits.toLocaleString()+"%" ||""}
        loading ={loading}
        className='shadow-md shadow-red-600'
     />
   </div>
}
interface StatProp{
  title : string
  icon : React.ReactNode
  helpertext : string
  value : string 
  loading : boolean
  className : string
}
function StatsCard({title,icon,helpertext,value,loading,className}:StatProp){
  return <Card className={className}>
   <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    {icon}
   </CardHeader>
   <CardContent>
    <div className="text-2xl font-bold">
      {
         loading && (
          <Skeleton>
          <span>0</span>
        </Skeleton>
      )}
      {!loading && value}
    </div>
    <p className="text-xs text-muted-foreground pt-1">{helpertext}</p>
   </CardContent>
  </Card>
}
