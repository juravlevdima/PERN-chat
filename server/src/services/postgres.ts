import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export let sequelize: Sequelize

if (process.env.DATABASE_ENV === 'uri') {
  sequelize = new Sequelize(
    // @ts-ignore
    process.env.DATABASE_URL,
    {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }
  )
} else if (process.env.DATABASE_ENV === 'local') {
  sequelize = new Sequelize(
    //@ts-ignore
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      logging: false
    }
  )
}

const dbConnect = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('DB is successfully connected')
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'DB unknown error'
    console.log('DB connect ERROR\n', message)
  }
}

export default dbConnect
