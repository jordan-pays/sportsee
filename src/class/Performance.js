class Performance {
    constructor(data, kind) {
        let realKind = {};
        for (const [key, value] of Object.entries(kind)) {
            let realValue;
            switch (value) {
                case "cardio":
                    realValue = "Cardio";
                    break;
                case "energy":
                    realValue = "Energie";
                    break;
                case "endurance":
                    realValue = "Endurance";
                    break;
                case "strength":
                    realValue = "Force";
                    break;
                case "speed":
                    realValue = "Vitesse";
                    break;
                case "intensity":
                    realValue = "Intensité";
                    break;

                default:
                    realValue = value;
                    break;
            }
            realKind[key] = realValue;
        }
        let realData = []
        for (let i = 0; i < data.length; i++) {
            const perf = data[i];
            const obj = {
                value: perf.value,
                kind: realKind[perf.kind]
            }
            realData.push(obj)
        }
        this.performance = realData;
    }
}

function initPerformance(data) {
    const performance = new Performance(data.data, data.kind);
    return performance;
}

export default initPerformance
