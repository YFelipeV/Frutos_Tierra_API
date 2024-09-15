import prisma from '../utils/prismaConfig.js';


export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany()
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
}

export const getUsuariosId = async (req, res) => {
  try {
    const { id } = req.params
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: parseInt(id)
      },
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
}
export const updateUsuarioEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  // Verificar si el usuario existe
  const existingUser = await prisma.usuario.findUnique({
    where: { id: parseInt(id) }
  });
  if (!existingUser) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  try {
    const usuario = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { estado },
    });

    res.status(200).json({usuario,status:true});
  } catch (error) {
    console.error('Error updating estado:', error);
    res.status(500).json({ error: 'Error updating estado' });
  }
};



