export async function POST(request: Request) {
    const requestBody = await request.json()

    return new Response(JSON.stringify(requestBody), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}