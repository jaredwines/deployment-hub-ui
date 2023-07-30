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
        // mode: 'cors'
        mode: 'no-cors'
    })
        // .then((response) => response.json())
        // .then((response) => response.text())
        .then(async (data) => {
            debugger;
            const json = await data.json()
            // const json = await data.text()
            return json;
        })
}