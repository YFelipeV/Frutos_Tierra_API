import prisma from '../utils/prismaConfig.js';


export const getAllCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      where: {
        estado: true
      },
    });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cultivos', error });
  }
}