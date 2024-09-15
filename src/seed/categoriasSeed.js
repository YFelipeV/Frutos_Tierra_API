import prisma from '../utils/prismaConfig.js'
async function importCategorias() {
    try {
        // Leer el archivo JSON con los roles
        const categoriasData = [
            { nombre: 'Tomate' },
            { nombre: 'Piña' },
            { nombre: 'Maíz' },
            { nombre: 'Café' },
            { nombre: 'Arroz' },
            { nombre: 'Fresa' },
            { nombre: 'Papa' },
            { nombre: 'Banano' },
            { nombre: 'Uva' },
            { nombre: 'Mango' },
            { nombre: 'Caña de Azúcar' },
            { nombre: 'Algodón' },
            { nombre: 'Soya' },
            { nombre: 'Trigo' },
            { nombre: 'Cebada' },
            { nombre: 'Avena' },
            { nombre: 'Coco' },
            { nombre: 'Yuca' },
            { nombre: 'Aguacate' },
            { nombre: 'Zanahoria' },
            { nombre: 'Lechuga' },
            { nombre: 'Espinaca' },
            { nombre: 'Pepino' },
            { nombre: 'Pimiento' },
            { nombre: 'Sandía' },
            { nombre: 'Melón' },
            { nombre: 'Cilantro' },
            { nombre: 'Perejil' },
            { nombre: 'Chía' },
            { nombre: 'Garbanzo' },
            { nombre: 'Lenteja' },
            { nombre: 'Frijol' },
            { nombre: 'Haba' },
            { nombre: 'Almendra' },
            { nombre: 'Nuez' },
            { nombre: 'Anís' },
            { nombre: 'Té' },
            { nombre: 'Menta' },
            { nombre: 'Lavanda' },
            { nombre: 'Cúrcuma' },
            { nombre: 'Jengibre' },
            { nombre: 'Quinua' },
            { nombre: 'Sésamo' },
            { nombre: 'Chirimoya' },
            { nombre: 'Guayaba' },
            { nombre: 'Papaya' },
            { nombre: 'Granadilla' },
            { nombre: 'Tamarindo' },
            { nombre: 'Lima' },
            { nombre: 'Limón' },
            { nombre: 'Naranja' },
            { nombre: 'Toronja' },
            { nombre: 'Mandarina' },
            { nombre: 'Maracuyá' },
            { nombre: 'Ciruela' },
            { nombre: 'Durazno' },
            { nombre: 'Manzana' },
            { nombre: 'Pera' },
            { nombre: 'Higo' },
            { nombre: 'Otro' },
        ]

        // Crear los roles en la base de datos
        for (const categoria of categoriasData) {
            // Verificar si el rol ya existe
            const existingCategorias = await prisma.categoria.findFirst({
                where: { nombre: categoria.nombre }
            });

            if (!existingCategorias) {
                await prisma.categoria.create({
                    data: categoria
                });
                console.log(`Rol creado: ${categoria.nombre}`);
            } else {
                console.log(`El rol '${categoria.nombre}' ya existe.`);
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
importCategorias();