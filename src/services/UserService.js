import axios from "axios"


const instance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
    },
  });

function getMainData(use_id) {
    return instance.get(`/user/${use_id}`)
}

function getActivity(use_id) {
    return instance.get(`/user/${use_id}/activity`)
}

function getAverageSession(use_id) {
    return instance.get(`/user/${use_id}/average-sessions`)
}

function getPerformance(use_id) {
    return instance.get(`/user/${use_id}/performance`)
}

export default {
    getMainData,
    getActivity,
    getAverageSession,
    getPerformance
}