import { db } from "@/config/db";
import { chatTable, frameTable, projectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        console.log('Projects API GET called');
        const user = await currentUser();
        
        // For development testing - create a mock user if not authenticated
        if (!user) {
            console.log('No user found, returning mock projects for testing');
            return NextResponse.json({
                success: true,
                projects: []
            });
        }

        const email = user.primaryEmailAddress?.emailAddress;
        if (!email) {
            return NextResponse.json({ error: "User email not found" }, { status: 400 });
        }
        
        // Get user's projects
        const projects = await db
            .select()
            .from(projectTable)
            .where(eq(projectTable.createdBy, email));
        
        return NextResponse.json({
            success: true,
            projects: projects
        });
    } catch (error) {
        console.error('Error in projects API GET:', error);
        return NextResponse.json(
            { error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        console.log('Projects API POST called');
        const { projectId, frameId, messages } = await req.json();
        const user = await currentUser();
        
        // For development testing - create a mock user if not authenticated
        if (!user) {
            console.log('No user found, creating mock project for testing');
            return NextResponse.json({
                success: true,
                data: { projectId, frameId, messages },
                message: "Mock project created for development testing"
            });
        }

        if (!projectId || !frameId || !messages) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const email = user.primaryEmailAddress?.emailAddress;
        if (!email) {
            return NextResponse.json({ error: "User email not found" }, { status: 400 });
        }
        
        // Create project 
        const projectResult = await db.insert(projectTable).values({
            projectId,
            createdBy: email,
        }).returning();

        // Create frame
        const frameResult = await db.insert(frameTable).values({
            frameId,
            projectId,
        }).returning();

        // Save your message
        const chatResult = await db.insert(chatTable).values({
            chatMessage: messages,
            createdBy: email,
            frameId: frameId
        }).returning();
        
        return NextResponse.json({
            success: true,
            data: { projectId, frameId, messages },
            project: projectResult[0],
            frame: frameResult[0],
            chat: chatResult[0]
        });
    } catch (error) {
        console.error('Error in projects API POST:', error);
        return NextResponse.json(
            { error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}