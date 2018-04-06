const knex = require('../db/knex');

function getFlipbookByName (name) {
    return knex('flipbooks')
        .where({ name: name })
        .first();
}

function getFrameById (name, frame_index) {
    return getFlipbookByName(name)
        .then(flipbook => {
            return knex('frames')
                .where({ flipbook_id: flipbook.id })
                .andWhere({ index: frame_index })
                .first();
        })
}

function updateFrame(flipbookName, requestBody, frame_index) {
    // return knex('frames')
    //     .where({ id: frame_id })
    //     .update(requestBody)
    //     .returning('*');
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
                .where({ flipbook_id: flipbook.id })
                .andWhere({ index: frame_index })
                .del()
                .returning('*');
        })
        .then(res => {
            return updateIndexesOfFramesDel(flipbook.id, frame_index+1);
        });
}

function updateIndexesOfFramesDel(flipbook_id, frame_index) {
    return knex('frames')
        .where({ flipbook_id: flipbook_id })
        .andWhere({ index: frame_index })
        .update({ index: frame_index-1 })
        .returning('*')
        .then(frame => {
            if (frame.length) return updateIndexesOfFramesDel(flipbook_id, frame_index+1);
            return;
        });
}

module.exports = {
    getFrameById,
    createNewFrame,
    updateFrame,
    deleteFrameById,
    getFlipbookByName
};