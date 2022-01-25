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
const { jadwal } = require('../commands/Jadwal');
const { developerCommand } = require('../commands/Developer');
const { mhs } = require('../commands/Mhs');
const { group } = require('../commands/Group');

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
        .setName('jadwal')
        .setDescription('Show lecture schedule'),

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

    new SlashCommandBuilder()
        .setName('dev')
        .setDescription('Commands for this bot developer/maintainer')
        .addSubcommand(subcommand => subcommand
            .setName('login')
            .setDescription('Authenticate your Discord account as the developer of this bot')
            .addStringOption(password => password
                .setName('devpassword')
                .setDescription('Password used to login as the developer (Example: j3NzZblKYq)')
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('logout')
            .setDescription('Unlink your Discord account from the developer status')
        )
        .addSubcommand(subcommand => subcommand
            .setName('config')
            .setDescription('Configure candice-bot settings')
            .addStringOption(year => year
                .setName('year')
                .setDescription('Set current academic year (Example: 2021/2022)')
                .setRequired(false))
            .addStringOption(semester => semester
                .setName('semester')
                .setDescription('Set current semester')
                .setRequired(false))
            .addStringOption(jadwal => jadwal
                .setName('jadwal')
                .setDescription('Set jadwal from string formatted in JSON')
                .setRequired(false))
            .addStringOption(mahasiswa => mahasiswa
                .setName('mahasiswa')
                .setDescription('Set mahasiswa list from string formatted in JSON')
                .setRequired(false))
        ),
    new SlashCommandBuilder()
        .setName('mhs')
        .setDescription('Show all the students name and nim'),

    new SlashCommandBuilder()
        .setName('group')
        .setDescription('Create groups of students')
        .addBooleanOption(student => student
            .setName('student')
            .setDescription('Create groups with N members. If false, N-group will be created instead')
            .setRequired(true)
        )
        .addIntegerOption(value => value
            .setName('count')
            .setDescription('How many groups or members per group')
            .setRequired(true)
        )
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
*/
async function interactionHandler(interaction){
    if (interaction.isCommand()){
        const { commandName } = interaction;

        switch(commandName){
            case 'info':{
                await info(interaction);
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

            case 'jadwal':{
                await jadwal(interaction);
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

            case 'dev' : {
                await developerCommand(interaction);
                break;
            }

            case 'mhs' : {
                await mhs(interaction);
                break;
            }

            case 'group' : {
                await group(interaction);
                break;
            }
        }
    }
}

module.exports = {
    createCommands : createCommands,
    interactionHandler : interactionHandler
}