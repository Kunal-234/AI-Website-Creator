import { db } from "@/config/db";
import { chatTable, frameTable, projectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {projectId,frameId,messages} = await req.json();
    const user = await currentUser();
    
    // Create project 
    const projectResult = await db.insert(projectTable).values({
        projectId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
    })

    // Create frame
    const frameResult = await db.insert(frameTable).values({
        frameId,
        projectId,
    }) 

    // Save your message
    const chatResult = await db.insert(chatTable).values({
        chatMessage: messages,
        createdBy: user?.primaryEmailAddress?.emailAddress,
    })
    
    return NextResponse.json({projectId,frameId,messages})
}