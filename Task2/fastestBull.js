const race = (bulls) => {
    // Simulating a race. It randomly orders the bulls.
    return bulls.sort(() => Math.random() - 0.5);
}

const findTop3Bulls = (bulls) => {
    let preliminaryRacesResults = [];

    // Races #1 to #5
    for (let i = 0; i < 5; i++) {
        let result = race(bulls.slice(i * 5, i * 5 + 5));
        preliminaryRacesResults.push(result);
    }

    // Race #6: Racing the winners of each group.
    let winners = preliminaryRacesResults.map(group => group[0]);
    let winnersResult = race(winners);
    
    let top1 = winnersResult[0];
    
    // For Race #7: 
    // 2nd and 3rd bulls from the winner's preliminary race.
    let contendersFromWinner = preliminaryRacesResults[Math.ceil(bulls.indexOf(top1) / 5)].slice(1, 3);
    
    // 2nd and 3rd bulls from the 2nd and 3rd place of Race #6
    let contendersFromSecond = preliminaryRacesResults[winners.indexOf(winnersResult[1])].slice(1, 3);
    let contendersFromThird = preliminaryRacesResults[winners.indexOf(winnersResult[2])].slice(1, 3);

    let race7Contenders = [...contendersFromWinner, ...contendersFromSecond, ...contendersFromThird];
    let finalRaceResult = race(race7Contenders).slice(0, 2); // We only need the top 2 from this race.

    // Return the results
    return [top1, ...finalRaceResult];
}

const letsRaceAndFindOut = async () => {
    // Sample bulls.
    let bulls = await Array.from({ length: 25 }, (_, i) => `Bull${i + 1}`);
    let top3 = await findTop3Bulls(bulls);
    console.log("Top 3 Fastest Bulls:", top3);
};

letsRaceAndFindOut();
