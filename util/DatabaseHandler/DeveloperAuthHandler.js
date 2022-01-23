const { db } = require("./MainDatabase");

const devIDCollection = db.collection("devAuth");

async function dbFindDevId(userId) {
    const user = await devIDCollection.findOne({
        userId: userId,
    });

    return user;
}

async function dbAddDevId(userId) {
    await devIDCollection.insertOne({
        userId: userId,
    });
}

async function dbDeleteDevId(userId) {
    await devIDCollection.findOneAndDelete({
        userId: userId,
    });
}

module.exports = {
    dbFindDevId: dbFindDevId,
    dbAddDevId: dbAddDevId,
    dbDeleteDevId: dbDeleteDevId,
};
