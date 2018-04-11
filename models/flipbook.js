const knex = require('../db/knex');
const Canvas = require('canvas');
const canvas = new Canvas(600, 600);
const ctx = canvas.getContext('2d');
const Image = Canvas.Image;
const axios = require('axios');
const BaseURL = `http://localhost:8000/`;

function getAllFlipbooksByQuery (queryObj) {

    let { user_id, searchStr } = queryObj;
    if (user_id) {
        return knex('flipbooks')
            .where({ user_id: user_id})
            .returning('*');
    }
    return [];
}

function getFlipbookByName (name, frameCnt) {
    
    if (frameCnt) {
        return knex('flipbooks')
            .where({ name: name })
            .first()
            .then(flipbook => {
                return knex('frames')
                    .where({ flipbook_id: flipbook.id })
                    .max('index');
            });
    }
    return knex('flipbooks')
        .where({ name: name })
        .first();
    
}

function createNewFlipbook (reqBody) {
    return knex('flipbooks')
        .where({ user_id: reqBody.user_id})
        .insert(reqBody)
        .returning('*');
}

function deleteFlipbook (name) {
    return getFlipbookByName(name)
        .then(flipbook => {
            let user_id = flipbook.user_id;
            return knex('flipbooks')
                .where({ name: name })
                .andWhere({ user_id: user_id})
                .del()
                .returning('*');
        })
}

function getAllFramesByFlipBook (name) {
    return getFlipbookByName(name)
        .then(flipbook => {
            return knex('frames')
                .where({ flipbook_id: flipbook.id })
                .orderBy('index', 'asc')
        })
        .then(frames => {
            return axios.post(BaseURL, { name, frames } )
        })
        .then(res => {
            console.log(res.data);
            return res.data;
        })
}

function getFrameById (name, frame_index, lightBox) {
    if (lightBox) {
        return getFlipbookByName(name)
            .then(flipbook => {
                let frame_indexParse = parseInt(frame_index);
                let lightBoxParse = parseInt(lightBox);
                
                return knex('frames')
                    .where({ flipbook_id: flipbook.id })
                    // .andWhere('index', frame_index)
                    .andWhere('index', '<', frame_indexParse+lightBoxParse+1)
                    .andWhere('index', '>', frame_indexParse-lightBoxParse-1)
                    .returning('*');
                    
            }) 
            .then(frames => {
                
                return frames.filter(frame => {
                    console.log(frame.index);
                    let baseIndex = parseInt(frame_index);
                    if (frame.index !== baseIndex) {
                        let alphaFactor = 0.1 * Math.abs(baseIndex - frame.index);
                        ctx.globalAlpha = 0.6 - alphaFactor;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        const img = new Image;
                        img.src = frame.imgURL;
                        ctx.drawImage(img, 0, 0, 600, 600);
                        let data = canvas.toDataURL();
                        frame.imgURL = data;
                        
                        return frame;
                    }
                })
            })
    } else {
        return getFlipbookByName(name)
            .then(flipbook => {
                return knex('frames')
                    .where({ flipbook_id: flipbook.id })
                    .andWhere({ index: frame_index })
                    .first();
            })
    }
}

function updateFrame(flipbookName, imgURL, frame_index) {
    
    return getFlipbookByName(flipbookName)
        .then(flipbook => {
            return knex('frames')
                .where({ flipbook_id: flipbook.id })
                .andWhere({ index: frame_index })
                .update({ imgURL: imgURL })
                .returning('*');
        })
}

function createNewFrame (flipbookName, requestBody) {
    let flipbookId;
    return getFlipbookByName(flipbookName)
        .then(flipbook => {
            flipbookId = flipbook.id;
            return knex.raw(
                `UPDATE frames SET index = index + 1 WHERE flipbook_id = ${flipbook.id} AND index > ${requestBody.index-1}`);
        })
        .then(frame => {
            return knex('frames')
                .where({ flipbook_id: flipbookId })
                .insert(requestBody)
                .returning('*');
        })
}

function deleteFrameById(flipbookName, frame_index) {
    let flipbookId;
    return getFlipbookByName(flipbookName)
        .then(flipbook => {
            flipbookId = flipbook.id;
            return knex('frames')
                .where({ flipbook_id: flipbookId })
                .andWhere({ index: frame_index })
                .del()
                .returning('*');
            
        })
        .then(res => {
            return knex.raw(
                `UPDATE frames SET index = index - 1 WHERE flipbook_id = ${flipbookId} AND index > ${frame_index}`);
        });
}

module.exports = {
    getFrameById,
    getAllFramesByFlipBook,
    createNewFrame,
    updateFrame,
    deleteFrameById,
    getFlipbookByName,
    getAllFlipbooksByQuery,
    createNewFlipbook,
    deleteFlipbook
};