import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET() {
    try {
        const data = await prisma.received.findMany();
        console.log(data)
        return NextResponse.json(data);
    } catch (error) {
        console.error('Database query failed:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { address, index, amount, timeStamp } = await request.json();

        const test = await prisma.received.create({
            data: {
                address,
                index,
                amount: amount.toString(),
                timeStamp
            },
        });

        return NextResponse.json({ message: "post created", data: test }, { status: 200 });
    } catch (error) {
        console.error('Error creating record:', error);
        return NextResponse.json({ message: "internal server problem" }, { status: 500 });
    }
}


