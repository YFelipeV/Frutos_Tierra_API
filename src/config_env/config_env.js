import'dotenv/config'

export const config_env={
    PORT : process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ||  "2h",
}

 