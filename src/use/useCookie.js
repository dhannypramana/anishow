import Cookies from 'js-cookie';

export const useCookie = () => {
    const setCookie = (name, value, options = {}) => {
        const defaultOptions = { sameSite: 'Lax' }; // Atur default SameSite attribute menjadi Lax
        const cookieOptions = { ...defaultOptions, ...options };
        Cookies.set(name, value, cookieOptions);
    };

    const getCookie = (name) => {
        return Cookies.get(name);
    };

    const removeCookie = (name) => {
        Cookies.remove(name);
    };

    return {
        setCookie, getCookie, removeCookie
    }
}