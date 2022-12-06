const func = require('../functions.js');
const { defaultValues } = require('../config.json');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const file = require('../Total.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Give stats for LP'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute (interaction) {

        try{
            console.log("Stats");

            const embedMessage = new EmbedBuilder()
                .setTitle('Orbwars')
                .setDescription('Statistics for LP')
                .setThumbnail(defaultValues.defaultThumbnail)
                .setURL('https://www.theorbwars.com/')
                .setFooter({ text: defaultValues.footerText, iconURL: defaultValues.footerIcon })
                .setColor(defaultValues.defaultColor)
    
            embedMessage.addFields({name: ':moneybag: Total drop', value: func.changeFloatForm(file.Total) + ' $Tiime'});
            embedMessage.addFields({name: ':one: On BSC', value: func.changeFloatForm(file.OnBSC) + ' (' + func.changeFloatForm(file.OnBSC/file.Total*100) + ' %)'});
            embedMessage.addFields({name: ':two: On ETH', value: func.changeFloatForm(file.OnETH) + ' (' + func.changeFloatForm(file.OnETH/file.Total*100) + ' %)'});
            embedMessage.addFields({name: ':scales: Average per day', value: func.changeFloatForm(file.AverageDropPerDay) + ' $Tiime'});
            embedMessage.addFields({name: ':money_mouth: Highest drop', value: func.changeFloatForm(file.HighestDrop) + ' $Tiime'});
            interaction.reply({ embeds: [embedMessage], ephemeral:defaultValues.ephemeral + ' $Tiime'});
        }catch(e){
            console.log(e);
        }
        
    }
}
