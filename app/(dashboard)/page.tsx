import { GetFormStats } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";
import { LuView } from "react-icons/lu";
export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true}/>}>
         <CardStatWrapper/>
      </Suspense>
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
   <CardHeader>
    <CardTitle>{title}</CardTitle>
    {icon}
   </CardHeader>
   <CardContent>
    <div className="text-2xl font-bold">
      {
        !loading && <Skeleton>
          <span>0</span>
        </Skeleton>
      }
    </div>
   </CardContent>
  </Card>
}
