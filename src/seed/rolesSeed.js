import prisma from '../utils/prismaConfig.js'
async function importRoles() {
    try {
      // Leer el archivo JSON con los roles
      const rolesData=[
        { "nombre": "Administrador" },
        { "nombre": "Usuario" }
      ]
  
      // Crear los roles en la base de datos
      for (const role of rolesData) {
        // Verificar si el rol ya existe
        const existingRole = await prisma.rol.findUnique({
          where: { nombre: role.nombre }
        });
  
        if (!existingRole) {
          await prisma.rol.create({
            data: role
          });
          console.log(`Rol creado: ${role.nombre}`);
        } else {
          console.log(`El rol '${role.nombre}' ya existe.`);
        }
      }
  
      console.log('Importación de roles completada.');
    } catch (error) {
      console.error('Error al importar roles:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  // Ejecutar la función
  importRoles();