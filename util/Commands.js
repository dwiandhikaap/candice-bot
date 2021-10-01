require('dotenv').config();

const clientToken = process.env.CLIENT_TOKEN;
const clientId = process.env.CLIENT_ID;

const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder } = require('@discordjs/builders');

const rest = new REST({ version: '9' }).setToken(clientToken);

const { Client, Guild } = require('discord.js');

const { help } = require('../commands/Help');
const { register } = require('../commands/Register');
const { unreg } = require('../commands/Unreg');
const { profile } = require('../commands/Profile');
const { makul } = require('../commands/Makul');
const { khs } = require('../commands/Khs');
const { transkrip } = require('../commands/Transkrip');
const { presensi } = require('../commands/Presensi');
const { info } = require('../commands/Info');
const { togglePresensiChannel } = require('../commands/TogglePresensiChannel');

const commands = [
    new SlashCommandBuilder()
        .setName('info')
        .setDescription('Show this bot\'s info'),

	new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show commands help menu'),

	new SlashCommandBuilder()
        .setName('register')
        .setDescription('Link your discord account to an AMIKOM account')
        .addStringOption(nim => nim
            .setName('nim')
            .setDescription('NIM/NPM Mahasiswa (Example: 20.61.6969)')
            .setRequired(true))
        .addStringOption(password => password
            .setName('password')
            .setDescription('Password Mahasiswa (Example: 69420)')
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
            .setDescription('Academic Year (Example: 2020/2021)')
            .setRequired(true)),
    
    new SlashCommandBuilder()
        .setName('khs')
        .setDescription('Show your AMIKOM Khs (Kartu Hasil Studi)')
        .addStringOption(tahunAkademik => tahunAkademik
            .setName('tahunakademik')
            .setDescription('Academic Year (Example: 2020/2021)')
            .setRequired(true)),
    
    new SlashCommandBuilder()
        .setName('transkrip')
        .setDescription('Show your AMIKOM transcript'),

    new SlashCommandBuilder()
        .setName('presensi')
        .setDescription('Submit your lecture presence')
        .addStringOption(token => token
            .setName('token')
            .setDescription('Token Presensi (Example: abC12)')
            .setRequired(true)),

    new SlashCommandBuilder()
        .setName('togglepresensichannel')
        .setDescription('Toggle a channel\'s presence channel status'),
    ]
	.map(command => command.toJSON());

/**
* @param {Guild[]} guilds Guilds Collection
*/
async function createCommands(guilds){
    for(const guild of guilds){
        try{
            await rest.put(
                Routes.applicationGuildCommands(clientId, guild.id),
                {body: commands},
            );
            
            console.log(`${guild.name} [${guild.id}] - OK!`);
        } catch(err){
            console.log(err);
        }
    }       
}

/**
* @param {Interaction} interaction User message
* @param {Client} client This bot's client object
*/
async function interactionHandler(interaction, client){
    if (interaction.isCommand()){
        const { commandName } = interaction;

        switch(commandName){
            case 'info':{
                await info(interaction, client);
                break;
            }

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

            case 'khs':{
                await khs(interaction);
                break;
            }

            case 'transkrip':{
                await transkrip(interaction);
                break;
            }

            case 'presensi':{
                await presensi(interaction);
                break;
            }

            case 'togglepresensichannel':{
                await togglePresensiChannel(interaction);
                break;
            }
        }
    }
}

module.exports = {
    createCommands : createCommands,
    interactionHandler : interactionHandler
}