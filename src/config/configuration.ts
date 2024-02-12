export default () =>({
    database:{
        type:process.env.DATABASE_TYPE,
        host:process.env.DATABASE_HOST,
        port:process.env.DATABASE_PORT,
        username:process.env.DATABASE_USER,
        password:process.env.DATABASE_PASS,
        name:process.env.DATABASE_NAME
    },
})