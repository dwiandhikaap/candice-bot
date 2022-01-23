const { user_db } = require("./MainDatabase");

const devIDCollection = user_db.collection("devAuth");

async function dbIsUserDev(userId) {
    if (await dbFindDevId(userId)) {
        return true;
    }

    return false;
}

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
    dbIsUserDev: dbIsUserDev,
    dbFindDevId: dbFindDevId,
    dbAddDevId: dbAddDevId,
    dbDeleteDevId: dbDeleteDevId,
};
