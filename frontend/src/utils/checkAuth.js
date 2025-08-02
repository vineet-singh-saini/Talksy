

export const isAuth = ()=> {
    const token = sessionStorage.getItem('token');
    return !!token;
}


