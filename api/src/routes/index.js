const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { 
    getCountries,
    getCountriesByName,
    getCountryById,
    postActivity,
    byActivities
}= require('../../src/routes/controllers')
const router = Router();


router.get('/', async function(req, res) {
    const { name } = req.query;
    try {
        if(name){
            const byNameCountries = await getCountriesByName(name)
            byNameCountries.length?
            res.status(200).json(byNameCountries):
            res.status(404).json({error:'Server say:Error 404, Pais no encontrado'})
            
        } else {
            const allCountries = await getCountries();
            allCountries?
            res.status(200).send(allCountries):
            res.status(404).json({error:'Server say:Error 404, Pais no encontrado'})          
        }
    } catch (err) {
        res.status(404).json({error:err})
    }
})

router.get('/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const countryByID = await getCountryById(id.toUpperCase());
        countryByID?
        res.status(200).json(countryByID):
        res.status(404).json({error:'Error 404, Pais no encontrado'})
    } catch (err) {
        console.log({error:err})
    }
})


router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countries} = req.body;///controlado desde el front
    console.log(name, difficulty, duration, season, countries)
    try {
        const newActivity = await postActivity(name, difficulty, duration, season, countries)
        console.log(newActivity)
        res.status(200).json(newActivity)
    } catch (err) {
        console.log({error:err})
    }
})

router.get('/', async (req, res) => {
    try {
        const getActivities = await byActivities()
        res.status(200).json(getActivities)
    } catch (err) {
        res.status(404).json({error:err})
    }
});

module.exports = router;
