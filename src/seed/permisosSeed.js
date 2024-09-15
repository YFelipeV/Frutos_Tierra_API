import prisma from '../utils/prismaConfig.js';

async function importPermisos() {
  try {
    // Leer el archivo JSON con los permisos

    // permisos Admin
    const permisosData = [
      { "nombre": "Cultivos", "menuItemId": 1, "rolId": 2 },
      { "nombre": "Fincas", "menuItemId": 2, "rolId": 2 },
      { "nombre": "Perfil", "menuItemId": 3, "rolId": 2 },
      { "nombre": "Carrusel", "menuItemId": 4, "rolId": 1 },
      { "nombre": "Usuarios", "menuItemId": 5, "rolId": 1 },
    ];
    // permisos Usuario


    // Crear los permisos en la base de datos
    for (const permiso of permisosData) {
      // Verificar si el permiso ya existe
      const existingPermiso = await prisma.permiso.findUnique({
        where: { nombre: permiso.nombre }
      });

      if (!existingPermiso) {
        await prisma.permiso.create({
          data: {
            nombre: permiso.nombre,
            menuItemId: permiso.menuItemId,
            rolId: permiso.rolId
          }
        });
        console.log(`Permiso creado: ${permiso.nombre}`);
      } else {
        console.log(`El permiso '${permiso.nombre}' ya existe.`);
      }
    }

    console.log('Importación de permisos completada.');
  } catch (error) {
    console.error('Error al importar permisos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la función
importPermisos();
