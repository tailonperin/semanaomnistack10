const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res){
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude} = req.body;
        
        let dev = await Dev.findOne({github_username});

        const response = await axios.get(`https://api.github.com/users/${github_username}`)

        let {name, login, avatar_url, bio} = response.data;
        if(!name)
            name = login;
        
        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        if(!dev){
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });    
        }else{
            dev.name = name;
            dev.avatar_url = avatar_url;
            dev.bio = bio;
            dev.techs = techsArray;
            dev.location = location;
            
            await Dev.updateOne(dev);
        }

        return res.json(dev);
    }
}