const baseUrl = 'https://auth.nomoreparties.co';

const makeRequest = (endpoint, method, body = undefined, token = undefined) => {
    const headers = {
        "Accept" : "application/json",
        "Content-Type": "application/json",
    }
    
    const config = {
        method: method,
        headers: headers,
    }

    if (token !== undefined) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (body !== undefined) {
        config.body = JSON.stringify(body)
    }

    return fetch(`${baseUrl}/${endpoint}`, config)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res.status);
            }
        })
}

export const register = (email, password) => {
    return makeRequest('signup', 'POST', {email, password});
}

export const login = (email, password) => {
    return makeRequest('signin', 'POST', {email, password});
}

export const getUserEmail = (token) => {
    return makeRequest('users/me', 'GET', undefined, token)
}