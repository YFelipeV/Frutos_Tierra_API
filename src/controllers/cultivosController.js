import prisma from '../utils/prismaConfig.js';


export const getAllCultivosAll = async (req, res) => {
  try {
    const cultivos = await prisma.cultivo.findMany({
      where: {
        estado: true
      },
      include: {
        finca: true,
        usuario: true,
        imagenes: {
          where: {
            estado: true
          }
        }
      }
    });
    res.json(cultivos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cultivos', error });
  }
}
export const getAllCultivos = async (req, res) => {
  try {
    console.log(req.user)
    const {userId}=req.user
    const cultivos = await prisma.cultivo.findMany({
      where: {
        estado: true,
        usuarioId:userId
      },
      include: {
        finca: true,
        usuario: true,
        imagenes: {
          where: {
            estado: true
          }
        }
      }
    });
    res.json(cultivos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cultivos', error });
  }
}

export const getCultivoId = async (req, res) => {
  try {
    const { id } = req.params
    const cultivos = await prisma.cultivo.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        finca: true,
        usuario: true,
        imagenes:{
          where:{
            estado:true
          }
        }
      }
    });
    res.json(cultivos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cultivos', error });
  }
}


export const createCultivo = async (req, res) => {
  try {
    const {
      nombreProducto,
      fechaInicio,
      fechaFinalizacion,
      proyeccion,
      finca,
      descripcionCorta,
      descripcionLarga,
      usuarioId,
      categoria,
      cantidad
    } = req.body;

    const fecha_inicio = new Date(fechaInicio) || "";
    const fecha_finalizacion = new Date(fechaFinalizacion) || "";

    // Crear el cultivo primero
    const nuevoCultivo = await prisma.cultivo.create({
      data: {
        nombre: nombreProducto,
        fecha_inicio,
        fecha_finalizacion,
        proyeccion,
        cantidad,
        descripcion_corta: descripcionCorta,
        descripcion_larga: descripcionLarga,
        usuarioId: parseInt(usuarioId),
        fincaId: parseInt(finca),
        categoria
      }
    });

    let imagenes = [];
    if (req.files && req.files.length > 0) {
      // Luego, crea los registros de imágenes y los asocia con el cultivo recién creado
      const imagenesPromises = req.files.map(file => {
        return prisma.imagen.create({
          data: {
            nombre: file.originalname,
            url: file.path,
            cultivo: {
              connect: { id: nuevoCultivo.id } // Asocia cada imagen con el cultivo recién creado
            }
          }
        });
      });
      imagenes = await Promise.all(imagenesPromises);
    }

    // Actualizar el cultivo con las imágenes si es necesario
    const cultivoConImagenes = await prisma.cultivo.update({
      where: { id: nuevoCultivo.id },
      data: {
        imagenes: {
          connect: imagenes.map(imagen => ({ id: imagen.id }))
        }
      }
    });

    return res.status(201).json({ cultivoConImagenes, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al registrar el cultivo', error });
  }
};

export const updateCultivo = async (req, res) => {
  try {
    const {
      nombreProducto,
      fechaInicio,
      fechaFinalizacion,
      proyeccion,
      finca,
      descripcionCorta,
      descripcionLarga,
      usuarioId,
      imagenesAEliminar,  // array de IDs de imágenes a eliminar
    } = req.body;

    const fecha_inicio = new Date(fechaInicio) || "";
    const fecha_finalizacion = new Date(fechaFinalizacion) || "";
    const imagenesELiminar = imagenesAEliminar && JSON.parse(imagenesAEliminar) || []
    // Actualiza el cultivo
    const cultivoActualizado = await prisma.cultivo.update({
      where: { id: parseInt(req.params.id) },
      data: {
        nombre: nombreProducto,
        fecha_inicio,
        fecha_finalizacion,
        proyeccion,
        cantidad: "2000 metros",
        descripcion_corta: descripcionCorta,
        descripcion_larga: descripcionLarga,
        usuarioId: parseInt(usuarioId),
        fincaId: parseInt(finca),
      },
    });

    // Elimina las imágenes que tienen estado "I"
    if (imagenesELiminar && imagenesELiminar.length > 0) {
      await prisma.imagenes.updateMany({
        where: {
          id: {
            in: imagenesELiminar,
          },
        },
        data: {
          estado: false,
        },
      });
    }

    // Agrega las nuevas imágenes
    let imagenes = [];
    if (req.files && req.files.length > 0) {
      const imagenesPromises = req.files.map(file => {
        return prisma.imagenes.create({
          data: {
            nombre: file.originalname,
            url: file.path,
            cultivo: {
              connect: { id: cultivoActualizado.id },
            },
          },
        });
      });
      imagenes = await Promise.all(imagenesPromises);
    }

    // Actualiza el cultivo con las nuevas imágenes
    const cultivoConImagenes = await prisma.cultivo.update({
      where: { id: cultivoActualizado.id },
      data: {
        imagenes: {
          connect: imagenes.map(imagen => ({ id: imagen.id })),
        },
      },
    });

    return res.status(200).json({ cultivoConImagenes, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el cultivo', error });
  }
};

export const deleteCultivo = async (req, res) => {
  const { id } = req.params;

  try {
    // Actualizar el campo 'estado' en lugar de eliminar el registro
    const actualizadoCultivo = await prisma.cultivo.update({
      where: { id: parseInt(id) },
      data: {
        estado: false, // Marcar como inactivo
      },
    });

    res.status(200).json(actualizadoCultivo); // Devolver el cultivo actualizado
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el cultivo', error });
  }
}