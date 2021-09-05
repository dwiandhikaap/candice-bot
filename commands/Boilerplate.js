/**
* @param {Message} msg User message
*/
async function funcname(msg){
    const args = msg.content.split(" ");
    const sender = msg.author;
    const username = sender.username;
    const userid = sender.id;
}

module.exports = {
    funcname : funcname
}

//delete this file later