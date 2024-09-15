import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config_env } from './src/config_env/config_env.js'
import authRoutes from './src/routes/auth.routes.js'
import cultivosRoutes from './src/routes/cultivos.routes.js'
import fincasRoutes from './src/routes/fincas.routes.js'
import parametrizadosRoutes from './src/routes/parametrizados.routes.js'
import slidersRoutes from './src/routes/sliders.routes.js'
import usuariosRoutes from './src/routes/usuarios.routes.js'
import menuRoutes from './src/routes/menu.routes.js'
import'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url';

// Obtener __filename y __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express()
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use("/api/v1",authRoutes)
app.use("/api/v1",cultivosRoutes)
app.use("/api/v1",fincasRoutes)
app.use("/api/v1",parametrizadosRoutes)
app.use("/api/v1",slidersRoutes)
app.use("/api/v1",slidersRoutes)
app.use("/api/v1",usuariosRoutes)
app.use("/api/v1",menuRoutes)


app.listen(config_env.PORT,()=>{
    console.log(`server listening on port ${config_env.PORT}`)
})