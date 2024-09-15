import prisma from '../utils/prismaConfig.js';


export const getMenuForUser = async (req, res) => {
    try {
        const { userId } = req.params; // Asegúrate de obtener el ID del usuario de la solicitud

        // Obtener roles del usuario
        const usuarioRoles = await prisma.usuarioRol.findMany({
            where: { usuarioId: parseInt(userId) },
            include: { rol: { include: { permisos: { include: { menuItem: true } } } } }
        });

        // Construir el menú basado en permisos
        const menu = usuarioRoles.flatMap((usuarioRol) => 
            usuarioRol.rol.permisos.map((permiso) => ({
                nombre: permiso.menuItem.nombre,
                url: permiso.menuItem.url,
                orden: permiso.menuItem.orden
            }))
        );

        // Devolver el menú ordenado por el campo 'orden'
        res.json({data:menu.sort((a, b) => a.orden - b.orden), status:true});
    } catch (error) {
        console.error('Error al obtener el menú:', error);
        res.status(500).json({ error: 'Error al obtener el menú.',status:false });
    }
};
