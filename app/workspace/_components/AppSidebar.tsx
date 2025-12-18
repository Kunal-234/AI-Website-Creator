'use client'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { UserDetailContext } from "@/context/UserDetailContext"
import { UserButton } from "@clerk/nextjs"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"

export function AppSidebar() {
    const [projectlist, setProjectList] = useState([])
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        GetProjectList()
    }, [])

    const GetProjectList = async () => {
        setLoading(true)
        const result = await axios.get('/api/get-all-projects')
        console.log(result.data)
        setProjectList(result.data)
        setLoading(false)
    }
    return (
        <Sidebar >
            <SidebarHeader >
                <div className="flex items-center gap-2 mt-3">
                    <Image className="ml-3" src={'/logo1.svg'} width={50} height={50} alt="logo" />
                    <h2 className=" text-2xl">WaveForge AI</h2>
                </div>
                {/* <Link href={'/workspace'} className="mt-5 w-full" >
                    <Button className="w-full">
                        + Add New Project
                    </Button>
                </Link> */}
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-sm">Your Projects</SidebarGroupLabel>
                    {!loading && projectlist.length === 0 &&
                        <h2 className="text-sm px-2 text-gray-500">No Project Found</h2>}
                    {/* //project list here */}
                    <div>
                        {(!loading && projectlist.length > 0) ? projectlist.map((project: any, index) => (
                            <Link href={`/playground/${project.projectId}?frameId=${project.frameId}`} key={index} className="my-1 mx-2 p-2 hover:bg-secondary cursor-pointer">
                                <h2 className="line-clamp-1 text-sm">{project.chats[0]?.chatMessage[0]?.content}</h2>
                            </Link>
                        )) :
                            [1, 2, 3, 4, 5].map((_, index) => (
                                <Skeleton key={index} className="w-full h-10 bg-cyan-950 rounded-lg mt-2 " />
                            ))
                        }
                    </div>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter >
                <div className="p-3 border rounded-xl space-y-3 bg-gradient-to-br from-cyan-950  to-transparent">
                    <h2 className="flex justify-between items-center">Remaining Credits <span className="font-bold">{userDetail?.credits}</span></h2>
                    <Progress value={32} />
                    <Button className="w-full">
                        Upgrade to Unlimited
                    </Button>
                </div>
                <div className="flex items-center mt-2 justify-center">
                    <UserButton />
                    <Button variant={"ghost"} className="font-semibold">Settings</Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}