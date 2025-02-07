import { NextResponse } from 'next/server';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    
    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      items: JSON.stringify(orderData.items),
      createdAt: new Date()
    });

    return NextResponse.json({ 
      message: 'Order saved successfully',
      orderId: orderRef.id
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Order creation failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}