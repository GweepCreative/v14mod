const { PermissionsBitField,Client,CommandInteraction,EmbedBuilder } = require("discord.js");
const model = require("../models/guild");
module.exports = {
  name: "link-engel",
  description: "Sunucudaki Linkleri Engeller",
  type:1,
  options: [
    {
      type: 3,
      name: "durum",
      description: "Sistemin Aktif/Pasif Durumunu Ayarlar",
      required: true,
      choices:[{name:"Aktif",value:"aktif"},{name:"Pasif",value:"pasif"}]
    },
  ],
  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   * @returns 
   */
  run: async (client, interaction) => { 
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
      return interaction.reply({content: `Bu komutu kullanamazsın.`, ephemeral: true});
    const durum = interaction.options.get("durum").value;
    const guild = interaction.guild;
    if(durum === "aktif"){
      await model.updateOne({GuildID:guild.id},{lnkEngl:true},{upsert:true});
      interaction.reply({ embeds:[new EmbedBuilder().setTitle("Link Engelleme Sistemi Aktif").setColor("Green").setDescription(`Link Engelleme Sistemi Yönetici Ttarafından aktif edildi artık linkler engellenecek.`)] });
    }else if(durum === "pasif"){
      await model.updateOne({GuildID:guild.id},{lnkEngl:false},{upsert:true});
      interaction.reply({ embeds:[new EmbedBuilder().setTitle("Link Engelleme Sistemi Pasif").setColor("Red").setDescription(`Link Engelleme Sistemi Yönetici Ttarafından devre dışı bırakıldı artık linkler engelenmeyecek.`)] });

    }
  }
};