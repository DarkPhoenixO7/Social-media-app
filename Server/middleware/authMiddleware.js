import jtw from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const srecret = process.env.JWT_KEY
const authMiddleware = async(req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        if (token){
            const decode = jtw.verify(token, srecret)
            console.log(decode)
            req.body._id=decode?.id
        }
        next()
    } catch (error) {
        console.log(error)
    }
}
export default authMiddleware