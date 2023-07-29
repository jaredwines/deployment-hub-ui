export const submitCommand = async (data: Inputs) => {
    if (!data.project || !data.action) {
        return
    }
    let url = 'http://192.168.0.216:5000/' + data.project + '/' + data.action;

    if (data.branch !== 'none') {
        url += '/' + data.branch;
    }

    return fetch(url, {
        method: "GET",
        mode: 'no-cors'
    })
}