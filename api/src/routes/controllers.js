const axios = require('axios');
const {Activity,Country}=require('../db.js')
const { Op } = require('sequelize');

const getCountries = async () => {
    const dbCountries = await Country.findAll({
        include: [Activity]
    })///En nuestra tabla country  buscamos todos los paises que tengan activity(en un inicio  no econtrara nada ya que la base de datos estara vacia)

    try {
        if(dbCountries.length === 0) {//si no tenemos nada  haremos lo siguiente
            const { data } = await axios.get('https://restcountries.com/v3/all');//obtenemos de la api ,la info de todos los paises
            
            const countries = data.map((country) => {///de esa info nos quedamos con las propiedades que nos importa de cada pais
                return {
                    id: country.cca3,
                    name: country.name.common,
                    flags: country.flags[1],
                    continents: country.continents[0],
                    capital: country.capital ? country.capital[0] : 'Undefined capital city',
                    subregion: country.subregion ? country.subregion : 'Undefinded Subregion',
                    area: country.area,
                    population: country.population
                };
            })
        
            countries.forEach((country) => {//Una vez creado el array countries con todo el objeto de la api con la info filtrada..
                Country.findOrCreate({//hacemos un for each(una accion por cada indice del array countries),donde
                    where: { id: country.id },//en el id de la info le pondremos el id del pais(3 letras)
                    defaults: {// y creamos  el siguiente objeto por cada pais  y guardamos al mismo tiempo en nuestra db
                        id: country.id,
                        name: country.name,
                        flags: country.flags,
                        continents: country.continents,
                        capital: country.capital,
                        subregion: country.subregion,
                        area: country.area,
                        population: country.population,
                    }
                })
            });
            dbCountries = await Country.findAll({
                include: [Activity]
            })/// Nos quedamos con toda la info nueva de nuestra base de datos.
        }
        return dbCountries// y la retornamos
    } catch(error){
        console.log(error)
    }
}

const getCountriesByName = async (name) => {
    try {
        const byNameCountries = await Country.findAll({///buscamos en nuestra base de datos todos los paises 
            where: {//donde
                name: {// la propiedad name
                    [Op.iLike] : `%${name}%`/// sea igual al name que le pasamos por parametro
                }
            },
            include: [Activity]// y que incluya activity
        })
        return byNameCountries// retornamos lo encontrado
    } catch (error) {
        console.log(error)
    }
}

const getCountryById = async (id) => {
    try {
        return await Country.findByPk(id, {///buscamos por id en nuestra base de datos, los paises que tengan la misma id que le pasamos por parametro
            include: [Activity]///y que incluyan actvities
        })
    } catch (error) {
        console.log(error)
    }
}

///////////////////////////////////////////////////
const byActivities = async () => {///
    try {
        const byActivities = await Activity.findAll({
        });//nos quedamos con todas las actividades
        return byActivities// y la retornamos
    } catch (error) {
        console.log(error)
    }
};


const postActivity = async (name, difficulty, duration, season, countries) => {//recibimos por parametro las propiedades que llegan desde el front(Los nombres de las propiedades deben ser igual al de los modelos)
    try {
        console.log('linea 91',name, difficulty, duration, season, countries)///ignorar o usar para ver que llega
        const newActivity = await Activity.create({///creamos la actividad con las propiedades que recibimos
            name,
            difficulty,
            duration,
            season
        });

        const selectCountries = await Country.findAll({///nos quedamos con los paises que recibimos por parametro
            where: {
                name: countries
            }
        });
        console.log('linea 104',selectCountries)
        return newActivity.addCountry(selectCountries) ///aqui es donde se hacen las relaciones de modelo//aqui unimos los paises con las actividades
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getCountries,
    getCountriesByName,
    getCountryById,
    byActivities,
    postActivity
};