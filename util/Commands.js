require('dotenv').config();

const clientToken = process.env.CLIENT_TOKEN;
const clientId = process.env.CLIENT_ID;

const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');

const rest = new REST({ version: '9' }).setToken(clientToken);

const { help } = require('../commands/Help');
const { register } = require('../commands/Register');
const { unreg } = require('../commands/Unreg');
const { profile } = require('../commands/Profile');
const { makul } = require('../commands/Makul');

const commands = [
	new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show commands help menu'),

	new SlashCommandBuilder()
        .setName('register')
        .setDescription('Link your discord account to an AMIKOM account')
        .addStringOption(nim => nim
            .setName('nim')
            .setDescription('NIM/NPM Mahasiswa')
            .setRequired(true))
        .addStringOption(password => password
            .setName('password')
            .setDescription('Password Mahasiswa')
            .setRequired(true)),

    new SlashCommandBuilder()
        .setName('unreg')
        .setDescription('Unlink your AMIKOM account from your discord account'),

    new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Show your AMIKOM user profile'),
    
    new SlashCommandBuilder()
        .setName('makul')
        .setDescription('Show your AMIKOM subjects')
        .addStringOption(tahunAkademik => tahunAkademik
            .setName('tahunakademik')
            .setDescription('NIM/NPM Mahasiswa')
            .setRequired(true))
    ]
	.map(command => command.toJSON());

async function createCommands(guilds){
    for(const guild of guilds){
        try{
            await rest.put(
                Routes.applicationGuildCommands(clientId, guild),
                {body: commands},
            );
            
            console.log(guild, "- OK!");
        } catch(err){
            console.log(err);
        }
    }       
}

/**
* @param {Interaction} interaction User message
*/
async function interactionHandler(interaction){
    if (interaction.isCommand()){
        const { commandName } = interaction;

        switch(commandName){
            case 'help':{
                await help(interaction);
                break;
            }

            case 'register':{
                await register(interaction);
                break;
            }

            case 'unreg':{
                await unreg(interaction);
                break;
            }

            case 'profile':{
                await profile(interaction);
                break;
            }

            case 'makul':{
                await makul(interaction);
                break;
            }
        }
    }
}

module.exports = {
    createCommands : createCommands,
    interactionHandler : interactionHandler
}