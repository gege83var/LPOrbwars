const func = require('../functions.js');
const { defaultValues } = require('../config.json');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const file = require('../Total.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('infos')
    .setDescription('Give informations about LP farm'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute (interaction) {

        try{
            console.log("Infos");

            const embedMessage = new EmbedBuilder()
                .setTitle('Orbwars')
                .setDescription('How to join LP')
                .setThumbnail(defaultValues.defaultThumbnail)
                .setURL('https://www.theorbwars.com/')
                .setFooter({ text: defaultValues.footerText, iconURL: defaultValues.footerIcon })
                .setColor(defaultValues.defaultColor)
    
            embedMessage.addFields({name: 'All informations', value:'https://hackmd.io/ab9jM7p8SAavL-oUOHSa9A'});
            embedMessage.addFields({name: 'Rewards file', value:'https://twitter.theorbwars.com/orbwars/lprewards/'});

            interaction.reply({ embeds: [embedMessage], ephemeral:defaultValues.ephemeral + ' $Tiime'});
        }catch(e){
            console.log(e);
        }
        
    }
}
