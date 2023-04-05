const baseUrl = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    })
}

export const login = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    })
}

export const getUserEmail = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    })
}