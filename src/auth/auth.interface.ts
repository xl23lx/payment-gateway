interface User{
    first_name:string;
    last_name:string;
    username:string;
    password:string;
}
interface Login{
    username:string;
    password:string;
}
interface LoginResponse{
    message:string;
    access_token?:string;
}