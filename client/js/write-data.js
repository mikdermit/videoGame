const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function (e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let world = document.getElementById('world').value;
    let dataCenter = document.getElementById('dataCenter').value;
    let race = document.getElementById('race').value;
    let grandCompany = document.getElementById('grandCompany').value;
    let preferredRole = document.getElementById('preferredRole').value;
    let preferredClass = document.getElementById('preferredClass').value;
    let playstyle = document.getElementById('playstyle').value;
    let platform = document.getElementById('platform').value;
    let comment = document.getElementById('comment').value;

    if ( !name || !world || !dataCenter || !race || !grandCompany || !preferredRole || !preferredClass || !playstyle || !platform || !comment) {
        alert('Please fill in all fields before submitting.');
        return;
    }

    let jsonObj = {
        name: name,
        world: world,
        dataCenter: dataCenter,
        race: race,
        grandCompany: grandCompany,
        preferredRole: preferredRole,
        preferredClass: preferredClass,
        playstyle: playstyle,
        platform: platform,
        comment: comment
    }

    fetch(libraryUrl + '/write-character', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObj)
    })
    .then(res => {
        if(!res.ok) throw new Error(`Network Error: ${res.statusText}`)
        return res.json();
    
    })
    .then(data => {
        alert(data.msg);
        console.log(data);
        if (data.msg === 'SUCCESS') document.getElementById('clear').click();
    })
    .catch(err => alert(`Error: ${err}`))
});

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function (e) {
    e.preventDefault(); 
    document.getElementById('data-form').reset();
});