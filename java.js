function stahniJSON(url, callback)
{
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        callback(JSON.parse(xhr.response));
    }
    xhr.open("GET", url);
    xhr.send();
}

