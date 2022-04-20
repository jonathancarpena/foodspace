const BASE_API = 'http://localhost:5000/api'

export const API = {
    USER: {
        register: `${BASE_API}/user/register`,
        login: `${BASE_API}/user/login`,
        email: `${BASE_API}/user/email`,
        me: `${BASE_API}/user/me`,
        logout: `${BASE_API}/user/logout`,
        myProducts: `${BASE_API}/products/me`,
        deleteMe: `${BASE_API}/user/deleteMe`,
    },
    ADMIN: {
        base: `${BASE_API}/foodSpace/admin`,
        delete: `${BASE_API}/foodSpace/admin/delete`,
        addArea: `${BASE_API}/foodSpace/admin/add-area`,
        removeArea: `${BASE_API}/foodSpace/admin/remove-area`,
        addUser: `${BASE_API}/foodSpace/admin/add-user`,
        removeUser: `${BASE_API}/foodSpace/admin/remove-user`,
    },
    FOODSPACE: {
        base: `${BASE_API}/foodSpace`,
        create: `${BASE_API}/foodSpace/create`,
        addItem: `${BASE_API}/foodSpace/add-item`,
        removeItem: `${BASE_API}/foodSpace/remove-item`,
        updateItem: `${BASE_API}/foodSpace/update-item`
    },
    PRODUCT: {
        base: `${BASE_API}/products`,
        create: `${BASE_API}/products/create`,
        delete: `${BASE_API}/products/delete`,
        update: `${BASE_API}/products/update`,
    }
}




