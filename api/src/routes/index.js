const { Router } = require('express');
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get("https://restcountries.com/v3/all")
    const apiInfo = await apiUrl.data.map(el => {
        return {
            nombre: el.name.common,
            imagen: el.flags[1],
            continente: el.continents[0],
            capital: el.capital? el.capital[0] : "capital no encontrado",
            subregion: el.subregion? el.subregion : "subregion no encontrada",
            area: el.area,
            poblacion: el.population
        };
    });
    return apiInfo;
};
const getDbInfo = async () => {
    return await Country.findAll({
        include: {
            model: Activity,
            attributes: ["id", "nombre", "dificltad", "duracion", "temporada"],
            through:{
                attributes: [],
            },
        }
    })
} 

module.exports = router;
