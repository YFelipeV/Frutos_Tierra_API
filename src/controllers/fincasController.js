import prisma from '../utils/prismaConfig.js';


export const getAllFincas = async (req, res) => {
    try {
        const {userId}=req.user
        const fincas = await prisma.finca.findMany({
            where: {
                estado: true,
                usuarioId:userId
            },
            include: {
                cultivos: true
            }
        });
        res.json(fincas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las fincas', error });
    }
}

export const getFincasId = async (req, res) => {
    try {
        const { id } = req.params
        const finca = await prisma.finca.findMany({
            where: {
                AND: [
                    { usuarioId: parseInt(id) },
                    { estado: true }
                ]
            }
        });
        res.json(finca);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener los cultivos', error });
    }
}


export const createFinca = async (req, res) => {
    try {
        const { nombre, direccion, departamento, ciudad, cantidad, usuarioId } = req.body;
        console.log({ req: req.body })
        // Validar los datos aquí si es necesario
        const nuevaFinca = await prisma.finca.create({
            data: {
                nombre,
                direccion,
                departamento,
                ciudad,
                cantidad,
                usuarioId: parseInt(usuarioId)
            }
        });
        return res.status(201).json({ message: 'Finca creada exitosamente', status: true, finca: nuevaFinca });
    } catch (error) {
        const errorMessage = error.meta?.cause || error.message;
        console.log(error)
        return res.status(500).json({ message: 'Error al registrar la finca', error: errorMessage });
    }
}

export const updateFinca = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, departamento, ciudad, cantidad } = req.body;

    try {
        const fincaActualizada = await prisma.finca.update({
            where: { id: parseInt(id) },
            data: {
                nombre,
                direccion,
                departamento,
                ciudad,
                cantidad
            }
        });

        res.json({ fincaActualizada, status: true });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la finca', error });
    }
}

export const deleteFinca = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.finca.update({
            where: { id: parseInt(id) },
            data: {
                estado: false
            }
        });

        res.status(204).send(); // No hay contenido para enviar
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la finca', error });
    }
}