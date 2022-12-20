const fs = require('fs');

const address = process.argv[2];
const isETHAddress = address.substring(0, 2) === '0x';
const isTernoaAddress = address.substring(0, 1) === '5';

if (!isETHAddress && !isTernoaAddress) {
    throw 'Address invalid';
}

const getRowsFromFile = (file) => {
    try {
        const fileName = file.split('.')[0];
        const rows = fs.readFileSync('./csv/' + fileName + '.csv', 'utf-8').split('\n');

        // remove first and last rows of the file
        rows.splice(0, 1);
        rows.splice(-1, 1);

        return rows;
    } catch (error) {
        throw 'file not found';
    }
}

/*
{
    network: 'BSC',
    address: '0x995ef753e42afd7bea8a546fdcd2154feed34ecd',
    ternoaAddress: '5E2Neoiddh5v7F6s9aiPQfYuhQCHyeGn6b4LifSn4fre1wzJ',
    LP: 50,
    tiime: 78
}
*/
const format = (rows) => {
    return rows.map(row => {
        const list = row.split(',');

        return {
            network: list[0],
            address: list[1],
            ternoaAddress: list[2],
            LP: parseInt(list[3], 10),
            tiime: parseInt(list[4], 10)
        }
    });
}

const filterByAddress = (rows) => {
    return rows.filter(row => {
        return new RegExp(address, 'i').test(row);
    });
}

const calculate = () => {
    try {
        const files = fs.readdirSync('./csv');

        const formattedList = files.map(file => {
            const rows = getRowsFromFile(file);
            const list = filterByAddress(rows);
            return format(list);
        });

        const onBothChain = formattedList.flat();

        const onBSC = onBothChain.filter((reward) => {
            return reward.network === 'BSC';
        });

        const onETH = onBothChain.filter((reward) => {
            return reward.network === 'ETH';
        });

        const initialValue = {
            network: '',
            address: '',
            ternoaAddress: '',
            LP: 0,
            tiime: 0
        };

        const totalRewards = onBothChain.reduce((accumulator, currentValue) => {
            return {
                ...accumulator,
                tiime: accumulator.tiime + currentValue.tiime
            }
        }, initialValue);

        const totalRewardsOnBSC = onBSC.reduce((accumulator, currentValue) => {
            return {
                ...accumulator,
                tiime: accumulator.tiime + currentValue.tiime
            }
        }, initialValue);

        const totalRewardsOnETH = onETH.reduce((accumulator, currentValue) => {
            return {
                ...accumulator,
                tiime: accumulator.tiime + currentValue.tiime
            }
        }, initialValue);

        return {
            totalRewards: totalRewards.tiime,
            totalRewardsOnBSC: totalRewardsOnBSC.tiime,
            totalRewardsOnETH: totalRewardsOnETH.tiime
        }
    } catch (error) {
        console.log(error);
        throw 'Something went wrong with the calculation';
    }
}

/*
{ 
    totalRewards: 3470, 
    totalRewardsOnBSC: 3167, 
    totalRewardsOnETH: 303 }
*/
console.log(calculate());
/*
command : node calculateByAddress.js YOUR_ADDRESS
*/