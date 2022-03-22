const BASE_API = 'http://localhost:5000/api'

export const API = {
    USER: {
        register: `${BASE_API}/user/register`,
        login: `${BASE_API}/user/login`,
        email: `${BASE_API}/user/email`,
        me: `${BASE_API}/user/me`,
        logout: `${BASE_API}/user/logout`
    },
    FOODSPACE: {
        base: `${BASE_API}/foodSpace`,
        admin: `${BASE_API}/foodSpace/admin`,
        create: `${BASE_API}/foodSpace/create`,
        addItem: `${BASE_API}/foodSpace/add-item`,
        removeItem: `${BASE_API}/foodSpace/remove-item`,
        updateItem: `${BASE_API}/foodSpace/update-item`,
        delete: `${BASE_API}/foodSpace/admin/delete`,
        addArea: `${BASE_API}/foodSpace/admin/add-area`,
        addUser: `${BASE_API}/foodSpace/admin/add-user`,
        removeUser: `${BASE_API}/foodSpace/admin/remove-user`,
    }
}




