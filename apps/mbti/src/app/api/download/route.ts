
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { dataUrl, filename } = await req.json();

        if (!dataUrl || !filename) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        // Base64 데이터 추출
        const base64Data = dataUrl.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');

        // 서버의 권한으로 파일명과 확장자가 포함된 헤더를 설정하여 반환
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
            },
        });
    } catch (error) {
        console.error('Download API Error:', error);
        return NextResponse.json({ error: 'Failed to process download' }, { status: 500 });
    }
}
