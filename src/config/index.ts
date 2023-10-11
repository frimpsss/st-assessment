import mongoose from 'mongoose'
export async function connectDB(){
    try {
        await mongoose.connect(process.env.DB_URI as string)
        console.debug('db connected')
    } catch (error: any) {
        console.error(error?.message)
    }
}