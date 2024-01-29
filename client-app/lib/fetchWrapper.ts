const baseUrl = 'http://localhost:7000/api/'

async function get(url: string) {

    const response = await fetch(baseUrl + url, {
        method: 'GET',
        headers: await getHeaders(),
        cache: 'no-store',
    });

    return await handleResponse(response);
}

async function post(url: string, body: {}) {
    const requestOption = {
        method: 'POST',
        headers: await getHeaders(),
        body: await JSON.stringify(body),
    }

    const response = await fetch(baseUrl + url, requestOption)

    return await handleResponse(response);
}

async function put(url: string, body: {}) {
    const requestOption = {
        method: 'PUT',
        headers: await getHeaders(),
        body: await JSON.stringify(body),
    }

    const response = await fetch(baseUrl + url, requestOption)

    return await handleResponse(response);
}

async function del(url: string) {
    const requestOption = {
        method: 'DELETE',
        headers: await getHeaders(),
    }

    const response = await fetch(baseUrl + url, requestOption)

    return await handleResponse(response);
}

async function uploadFile(url: string, formData: FormData) {

    const response = await fetch(baseUrl + url, { 
        method: 'POST',
        cache: 'no-store',
        body: formData
    })

    return await handleResponse(response);
}

async function getHeaders() {
    const headers = {
        'content-type': 'application/json',
    } as any
    return headers
}

async function handleResponse(response: Response) {
    const text = await response.text();
    const data = text && await JSON.parse(text);

    if (response.ok) {
        return data || response.statusText
    } else {
        const error = {
            status: response.status,
            message: response.statusText
        }
        return error;
    }
}

export const fetchWrapper = {
    get,
    post,
    put,
    del,
    uploadFile
}
