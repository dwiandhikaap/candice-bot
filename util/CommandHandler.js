const { help } = require("../commands/Help");
const { profile } = require("../commands/Profile");
const { register } = require("../commands/Register");
const { unreg } = require("../commands/Unreg");

require("../commands/Register");

module.exports = {
    Handle : function(msg) { 
        const args = msg.content.split(" ");

        switch(args[1]){
            case 'reg':{
                register(msg);
                break;
            }
            case 'unreg':{
                unreg(msg);
                break;
            }
            case 'profile':{
                profile(msg);                   
                break;
            }
            case 'help':{
                help(msg);
                break;
            }
            default:{
                help(msg);
                break;
            }
        }
    }
}