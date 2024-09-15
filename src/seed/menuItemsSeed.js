import prisma from '../utils/prismaConfig.js';

async function importMenuItems() {
    try {
        // Leer el archivo JSON con los elementos del menú
        const menuItemsData = [
            { "nombre": "Cultivos", "url": "", "orden": 1 },
            { "nombre": "Fincas", "url": "/fincas", "orden": 2 },
            { "nombre": "Perfil", "url": "/perfil", "orden": 3 },
            { "nombre": "Carrusel", "url": "/carrusel", "orden": 4 },
            { "nombre": "Usuarios", "url": "/usuarios", "orden": 5 }
        ];
      // Crear los elementos del menú en la base de datos
      for (const item of menuItemsData) {
        // Verificar si el elemento del menú ya existe por nombre
        const existingItem = await prisma.menuItem.findUnique({
          where: { nombre: item.nombre }
        });
  
        if (!existingItem) {
          await prisma.menuItem.create({
            data: item
          });
          console.log(`Elemento del menú creado: ${item.nombre}`);
        } else {
          console.log(`El elemento del menú '${item.nombre}' ya existe.`);
        }
      }
  
      console.log('Importación de elementos del menú completada.');
    } catch (error) {
      console.error('Error al importar elementos del menú:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  // Ejecutar la función
  importMenuItems();