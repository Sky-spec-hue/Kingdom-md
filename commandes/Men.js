
const moment = require('moment-timezone');

/**
 * Sends a menu with buttons to the user.
 * @param {object} client - Messaging client with sendButtonMsg method.
 * @param {object} m - Message object (should have .chat and .sender).
 * @param {string} prefix - Command prefix (e.g., '!')
 */
async function sendMenuWithButtons(client, m, prefix = '!') {
    // Get time and greeting
    const now = moment.tz('Africa/Nairobi');
    const time = now.format('HH:mm:ss');
    const greeting =
        time < '05:00:00' ? 'Good Morning 🌉'
        : time < '11:00:00' ? 'Good Morning 🌄'
        : time < '15:00:00' ? 'Good Afternoon 🏙'
        : time < '18:00:00' ? 'Good Evening 🌅'
        : time < '19:00:00' ? 'Good Evening 🌃'
        : time < '23:59:00' ? 'Good Night 🌌'
        : 'Good Night 🌌';

    // Menu text
    const menuText = `
╭──❍「 *KINGDOM-MD MENU* 」❍
│• ${prefix}help
│• ${prefix}info
│• ${prefix}fun
│• ${prefix}tools
╰──────❍
`;

    // Buttons
    const buttons = [
        { buttonId: `${prefix}help`, buttonText: { displayText: 'Help' }, type: 1 },
        { buttonId: `${prefix}allmenu`, buttonText: { displayText: 'All Menu' }, type: 1 },
        { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner' }, type: 1 }
    ];

    // Send the menu
    await client.sendButtonMsg(m.chat, {
        text: `Hello @${m.sender.split('@')[0]}\n${menuText}`,
        footer: greeting,
        mentions: [m.sender],
        buttons: buttons
    }, { quoted: m });
}

module.exports = sendMenuWithButtons;
