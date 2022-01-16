const express = require('express')
const axios = require('axios')
const router = express.Router();
const config = require('config');
const res = require('express/lib/response');
const { urlencoded } = require('body-parser');


const api_key = config.get('api_key')

router.get('/', async (req, res) => {
    try {
        const newsApi = await axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api_key}`)
        res.render('news', { news: newsApi.data.results })

    } catch (error) {
        if (error.response) {
            res.render('news', { news: null })
            console.log(error.response.data)
            console.log(error.response.status)
            //    console.log(error.response.headers)
        } else if (error.request) {
            res.render('news', { news: null })
            console.log(error.request)
        } else {
            res.render('news', { news: null })
            console.error(error.message)
        }
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id

    try {
        const newsApi = await axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api_key}`)
        res.render('news-detail', { news: newsApi.data.results[id] })
    } catch (error) {
        if (error.response) {
            res.render('news', { news: null })
            console.log(error.response.data)
            console.log(error.response.status)
            //    console.log(error.response.headers)
        } else if (error.request) {
            res.render('news', { news: null })
            console.log(error.request)
        } else {
            res.render('news', { news: null })
            console.error(error.message)
        }
    }
})

router.post('', async (req, res) => {
    let search = req.body.search;

    try {
        const searchApi = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&type=blogpost,multimedia&sort=newest&api-key=${api_key}`)
        res.render('search', { news: searchApi.data.response.docs, search: search })
    } catch (error) {
        if (error.response) {
            res.render('news', { news: null })
            console.log(error.response.data)
            console.log(error.response.status)
        } else if (error.request) {
            res.render('news', { news: null })
            console.log(error.request)
        } else {
            res.render('news', { news: null })
            console.error(error.message)
        }
    }
})

router.get('/search/:search/:id', async (req, res) => {
    let id = req.params.id;
    let search = req.params.search;

    try {
        const searchApi = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&type=blogpost,multimedia&sort=newest&api-key=${api_key}`)
        res.render('search-detail', { news: searchApi.data.response.docs[id] })
    } catch (error) {
        if (error.response) {
            res.render('news', { news: null })
            console.log(error.response.data)
            console.log(error.response.status)
        } else if (error.request) {
            res.render('news', { news: null })
            console.log(error.request)
        } else {
            res.render('news', { news: null })
            console.error(error.message)
        }
    }
})




module.exports = router;