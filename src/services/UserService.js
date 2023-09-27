import axios from "axios"
import initUser from "../class/User"
import initPerformance from "../class/Performance";

const instance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Content-Type": "application/json",
    },
});

async function getMainData(use_id) {
    return await instance.get(`/user/${use_id}`).then((res) => {
        const user = initUser(res.data.data)
        return { ...res, user: user }
    }).catch((err) => {
        window.location.href = `/error/${err.response.status}`
    })
}

async function getActivity(use_id) {
    return await instance.get(`/user/${use_id}/activity`).catch((err) => {
        window.location.href = `/error/${err.response.status}`
    })
}

async function getAverageSession(use_id) {
    return await instance.get(`/user/${use_id}/average-sessions`).catch((err) => {
        window.location.href = `/error/${err.response.status}`

    })
}

async function getPerformance(use_id) {
    return await instance.get(`/user/${use_id}/performance`).then((res) => {
        const performance = initPerformance(res.data.data)
        return { ...res, data: performance }
    }).catch((err) => {
        window.location.href = `/error/${err.response.status}`
    })
}

export default {
    getMainData,
    getActivity,
    getAverageSession,
    getPerformance
}