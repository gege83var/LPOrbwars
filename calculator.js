const fs = require('fs');

allFiles = fs.readdirSync('./csv');
tiimeDrop = {
    "Total":0,
    "OnETH":0,
    "OnBSC":0,
    "HighestDrop":0,
    "AverageDropPerDay":0
};

allFiles.forEach(file => {
    const fileName = file.split('.')[0];
    const fich = fs.readFileSync('./csv/'+fileName+'.csv','utf-8').split('\n');
    fich.splice(0,1);
    fich.splice(-1,1);

    for(let i=0;i<fich.length;i++){
        fich[i]=fich[i].split(',');
    }

    values = {
        "Date":fileName,
        "Users":
            {   
                "Total":fich.length,
                "OnETH":0,
                "OnBSC":0
            },
        "Tiime":
            {
                "Total":0,
                "OnETH":0,
                "OnBSC":0,
                "HighestDrop":0
            },
        "LP":
            {
                "Total":0,
                "OnETH":0,
                "OnBSC":0
            }
    }

    fich.forEach(line => {
        if(line[0] == 'BSC'){
            values.Users.OnBSC += 1;
            values.Tiime.OnBSC += Number(line[4]);
            values.LP.OnBSC += Number(line[3]);
        }else if(line[0] == 'ETH'){
            values.Users.OnETH += 1;
            values.Tiime.OnETH += Number(line[4]);
            values.LP.OnETH += Number(line[3]);
        }else{
            console.error('[ERROR] UNKNOWN BLOCKCHAIN : '+line[0]);
        }

        values.Tiime.Total = values.Tiime.OnBSC + values.Tiime.OnETH;
        values.LP.Total = values.LP.OnBSC + values.LP.OnETH;

        if(Number(line[4]) > values.Tiime.HighestDrop){values.Tiime.HighestDrop = Number(line[4]);}

    });

    tiimeDrop.Total += values.Tiime.Total;
    tiimeDrop.OnETH += values.Tiime.OnETH;
    tiimeDrop.OnBSC += values.Tiime.OnBSC;
    if(tiimeDrop.HighestDrop < values.Tiime.HighestDrop){tiimeDrop.HighestDrop = values.Tiime.HighestDrop;};

    fs.writeFileSync('./json/'+fileName+'.json',JSON.stringify(values));
    
});

tiimeDrop.AverageDropPerDay = tiimeDrop.Total/allFiles.length;

fs.writeFileSync('Total.json',JSON.stringify(tiimeDrop));
