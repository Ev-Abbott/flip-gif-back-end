const knex = require('../db/knex');

function getFlipbookByName (name) {
    return knex('flipbooks')
        .where({ name: name})
        .first();
}

function getFrameById (frame_id) {
    return knex('frames')
        .where({ id: frame_id })
        .first();
}

function createNewFrame (flipbookName, requestBody) {
    return getFlipbookByName(flipbookName)
        .then(flipbook => {
            return knex('frames')
                .where({'flipbook_id': flipbook.id})
                .insert(requestBody)
                .returning('*');
        });
}

function updateFrame(flipbookName, requestBody, frame_id) {
    return knex('frames')
        .where({ id: frame_id })
        .update(requestBody)
        .returning('*');
}

function deleteFrameById(flipbookName, frame_id) {
    return knex('frames')
        .where({ id: frame_id })
        .del();
}

module.exports = {
    getFrameById,
    createNewFrame,
    updateFrame,
    deleteFrameById,
    getFlipbookByName
};