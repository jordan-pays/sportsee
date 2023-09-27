class User {
    constructor(data) {
        this.id = data.id;
        this.firstName = data.userInfos.firstName;
        this.todayScore = data?.todayScore ? data.todayScore : data.score;
        this.calorieCount = (data.keyData.calorieCount / 1000).toFixed(3).replace(".",",");
        this.proteinCount = data.keyData.proteinCount;
        this.carbohydrateCount = data.keyData.carbohydrateCount;
        this.lipidCount = data.keyData.lipidCount;
    }
}

function initUser(data) {
    const user = new User(data)
    return user
}

export default initUser