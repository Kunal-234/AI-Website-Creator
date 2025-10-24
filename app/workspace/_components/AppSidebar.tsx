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
import { UserDetailContext } from "@/context/UserDetailContext"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useContext, useState } from "react"

export function AppSidebar() {
    const [projectlist, setProjectList] = useState([])
    const {userDetail,setUserDetail} = useContext(UserDetailContext)

    return (
        <Sidebar>
            <SidebarHeader >
                <div className="flex items-center gap-2 mt-3">
                    <Image className="ml-3" src={'/logo.svg'} width={50} height={50} alt="logo" />
                    <h2 className=" text-2xl text-gray-700">NextBuilder</h2>
                </div>
                <Link href={'/workspace'} className="mt-5 w-full" >
                    <Button className="w-full">
                        + Add New Project
                    </Button>
                </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    {projectlist.length === 0 &&
                        <h2 className="text-sm px-2 text-gray-500">No Project Found</h2>}
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter >
                <div className="p-3 border rounded-xl space-y-3 bg-secondary">
                    <h2 className="flex justify-between items-center">Remaining Credits <span className="font-bold">{userDetail?.credits}</span></h2>
                    <Progress value={32}/>
                    <Button className="w-full">
                        Upgrade to Unlimited
                    </Button>
                </div>
                <div className="flex items-center gap-2 mt-2 justify-center">
                    <UserButton/>
                    <Button variant={"ghost"} className="font-semibold">Settings</Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}