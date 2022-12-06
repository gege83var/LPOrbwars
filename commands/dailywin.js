const func = require('../functions.js');
const { defaultValues } = require('../config.json');
const fs = require('fs');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()

    .setName('daily_win')
    .setDescription('Give rewards for a specific day')
    .addStringOption(option =>
        option.setName('date')
        .setDescription('Enter a date (YYYY-MM-DD)')
        .setRequired(false)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute (interaction) {
        let date = interaction.options.getString('date');
        let yourDate = new Date().toISOString().split('T')[0];

        allFiles = fs.readdirSync('./csv');

        if(date == null || !allFiles.includes(date+'.csv')){date = yourDate;}

        try{
            console.log("Daily date  "+date);

            const todayDrop = require('../json/'+date+'.json');

            const embedMessage = new EmbedBuilder()
                .setTitle('Orbwars')
                .setDescription('The ' + date + ' drop.')
                .setThumbnail(defaultValues.defaultThumbnail)
                .setURL('https://www.theorbwars.com/')
                .setFooter({ text: defaultValues.footerText, iconURL: defaultValues.footerIcon })
                .setColor(defaultValues.defaultColor)
    
            embedMessage.addFields({name: ':people_hugging: Total users', value:func.changeIntForm(todayDrop.Users.Total)});
            embedMessage.addFields({name: ':one: Total users on BSC', value:func.changeIntForm(todayDrop.Users.OnBSC)});
            embedMessage.addFields({name: ':two: Total users on ETH', value:func.changeIntForm(todayDrop.Users.OnETH)});

            embedMessage.addFields({name: ':moneybag: Total drop', value: func.changeFloatForm(todayDrop.Tiime.Total) + ' $Tiime'});
            embedMessage.addFields({name: ':one: On BSC', value: func.changeFloatForm(todayDrop.Tiime.OnBSC) + ' (' + func.changeFloatForm(todayDrop.Tiime.OnBSC/todayDrop.Tiime.Total*100) + ' %)'});
            embedMessage.addFields({name: ':two: On ETH', value: func.changeFloatForm(todayDrop.Tiime.OnETH) + ' (' + func.changeFloatForm(todayDrop.Tiime.OnETH/todayDrop.Tiime.Total*100) + ' %)'});
            embedMessage.addFields({name: ':money_mouth: Highest drop', value: func.changeFloatForm(todayDrop.Tiime.HighestDrop) + ' $Tiime'});
  
    
            interaction.reply({ embeds: [embedMessage], ephemeral:defaultValues.ephemeral});
        }catch(e){
            console.log(e);
        }
  
    }
}