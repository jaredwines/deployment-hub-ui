export const submitCommand = async (data: Inputs) => {
    if (!data.project || !data.action) {
        return
    }
    let url = 'http://0.0.0.0:5555/' + data.project + '/' + data.action;

    if (data.branch !== 'none') {
        url += '/' + data.branch;
    }

    return fetch(url, {
        method: 'GET',
        mode: 'cors'
    })
        .then((response) => response.json())
        .then((json)=>JSON.parse(JSON.stringify(json)))//clone
}