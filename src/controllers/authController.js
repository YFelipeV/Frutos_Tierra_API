import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config_env } from '../config_env/config_env.js'
import prisma from '../utils/prismaConfig.js';


export const getProfileAll = async (req, res) => {
    try {
        const cultivos = await prisma.usuario.findMany();
        return res.json(cultivos);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los cultivos', error });
    }
}

export const getProfile = async (req, res) => {
    try {
        const { id } = req.params
        const profile = await prisma.usuario.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return res.json({profile,status:true});
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los cultivos', error,status:false });
    }
}


export const registerUser = async (req, res) => {
    try {
        const {
            nombre_completo,
            nombre_comercial,
            razon_social,
            identificacion,
            telefono,
            correo,
            password,
            direccion,
            departamento,
            ciudad,
            roles = [2] 
        } = req.body;

        // Verificar si el correo ya está en uso
        const existingUser = await prisma.usuario.findFirst({ where: { correo } });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está en uso', status: false });
        }

        // Hash del password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Verificar si los roles existen
        const existingRoles = await prisma.rol.findMany({
            where: { id: { in: roles } }
        });

        // Comprobar si todos los roles proporcionados existen
        if (existingRoles.length !== roles.length) {
            return res.status(400).json({ message: 'Uno o más roles no existen', status: false });
        }

        // Crear un nuevo usuario
        const newUser = await prisma.usuario.create({
            data: {
                nombre_completo,
                nombre_comercial,
                razon_social,
                identificacion,
                telefono,
                correo,
                password: hashedPassword,
                direccion,
                departamento,
                ciudad,
            }
        });

        // Insertar los registros en la tabla intermedia UsuarioRol
       await prisma.usuarioRol.createMany({
            data: roles.map(roleId => ({
                usuarioId: newUser.id,
                rolId: roleId
            }))
        });

        return res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser, status: true });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
}



export const login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        // Buscar usuario
        const user = await prisma.usuario.findFirst({
            where: { correo },
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas', status: 400 });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas', status: 400 });
        }
        if(!user.estado ){
            return res.status(401).json({ message: 'Estas inhabilitado ', status: false });

        }

        // Crear token JWT
        const token = jwt.sign({ userId: user.id }, config_env.JWT_SECRET, { expiresIn: config_env.JWT_EXPIRES_IN });

        return res.status(200).json({ message: 'Login exitoso', token, id_usuario: user.id, status: 200 });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el login', error });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const {
        nombre_completo,
        nombre_comercial,
        razon_social,
        identificacion,
        telefono,
        correo,
        password,
        direccion,
        departamento,
        ciudad,
        estado,
        roles
    } = req.body;

    try {
        // Verificar si el usuario existe
        const existingUser = await prisma.usuario.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const updateData = {};
        if (nombre_completo) updateData.nombre_completo = nombre_completo;
        if (nombre_comercial) updateData.nombre_comercial = nombre_comercial;
        if (razon_social) updateData.razon_social = razon_social;
        if (identificacion) updateData.identificacion = identificacion;
        if (telefono) updateData.telefono = telefono;
        if (correo) updateData.correo = correo;
        if (estado) updateData.estado = estado;
        // if (password) updateData.password = await bcrypt.hash(password, 10);
        if (direccion) updateData.direccion = direccion;
        if (departamento) updateData.departamento = departamento;
        if (ciudad) updateData.ciudad = ciudad;
        const updatedUser = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: { roles: true }
        });


        return res.status(200).json({ message: 'Usuario actualizado exitosamente', status: true, user: updatedUser });
    } catch (error) {
        console.error('Error al actualizar usuario:', error); // Log de error para depuración
        return res.status(500).json({ message: 'Error al actualizar usuario', error: error.message }); // Mensaje de error más claro
    }
};