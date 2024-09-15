import prisma from '../utils/prismaConfig.js';



export const getAllSlider = async (req, res) => {
  try {
    const sliders = await prisma.slider.findMany({
      orderBy: {
        fecha_creacion: 'desc'
      },
    });
    res.json({sliders,status:true});
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los sliders', error,status:false });
  }
}
export const getAllSliderHome = async (req, res) => {
  try {
    const sliders = await prisma.slider.findMany({
      orderBy: {
        fecha_creacion: 'desc'
      },
      where:{
        estado:true
      }
    });
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los sliders', error });
  }
}

export const createSliderItem = async (req, res) => {
    try {
      // Verificamos si se han subido archivos
      if (req.files && req.files.length > 0) {
        // Recorremos los archivos y creamos un slider para cada imagen
        const slidersPromises = req.files.map(file => {
          return prisma.slider.create({
            data: {
              nombre:file.originalname || "Imagen",
              url: file.path, 
            }
          });
        });
  
        // Esperamos a que todas las promesas se resuelvan
        const slidersCreados = await Promise.all(slidersPromises);
  
        // Enviamos la respuesta con los sliders creados
        return res.status(201).json({ sliders: slidersCreados, status: true });
      } else {
        return res.status(400).json({ message: 'No se han subido archivos', status: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al registrar el slider', error });
    }
  };

export const updateSliderState = async (req, res) => {
    try {
      const { id } = req.params; 
      const { estado } = req.body; 
  
      // Validamos que se haya enviado un estado válido
      if (typeof estado !== 'boolean') {
        return res.status(400).json({ message: 'El estado debe ser un valor booleano', status: false });
      }
  
      // Actualizamos el estado del slider
      const sliderActualizado = await prisma.slider.update({
        where: { id: parseInt(id) },  
        data: { estado }             
      });
  
      return res.status(200).json({ slider: sliderActualizado, message: 'Estado del slider actualizado exitosamente', status: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al actualizar el estado del slider', error });
    }
  };

