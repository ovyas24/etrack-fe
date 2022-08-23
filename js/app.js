const main = document.getElementById('main');
const details = document.getElementById('details-page');
const loader = document.getElementById('loader');
const msg = document.getElementById('msgBlock');

let loading = false;
const toggleLoader = () => {
    if(loading) {
        loading = false;
        loader.style.display = 'none';
    }  else {
        loading = true;
        loader.style.display = 'block'
    }
}

const showMsg = (msg, code) =>  {
    msg.innerHTML = '';
    msg.innerHTML = msg;
    msg.style.display = 'block';

    setTimeout(() =>  msg.style.display = 'none', 2000)
}

const showTrackingDetails = (number) => {
    const url = `https://etrackapi.herokuapp.com/track?trackingId=${number}`;
    toggleLoader();
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            toggleLoader();
            if(data.code != 200) {
                showMsg(data.msg, 'err');
            }
            const {status, merchant, trackingId, product, reciverName, edd} = data.order;
            const trackingDetails = data.order.tracking_details;
            if(trackingDetails.length > 0) {
                main.style.display = 'none';
                details.style.display = 'flex';
            }
            console.log(trackingDetails);
            const trackingDetailsTable = document.getElementById('tracking_details_table');
            trackingDetailsTable.innerHTML = '';
            trackingDetails.reverse().forEach(detail => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${detail.date}</td>
                    <td>${detail.time}</td>
                    <td>${detail.location}</td>
                    <td>${detail.status}</td>
                `;
                trackingDetailsTable.appendChild(row);
            }
            );
        }
    );
}

showTrackingDetails();

const searchMyOrder = () => {
    const trackMainNumber = document.getElementById('search_track_id').value;
    showTrackingDetails(trackMainNumber);
}

const searchMyOrder2 = () => {
    const trackMainNumber2 = document.getElementById('search_track_id_2').value;
    showTrackingDetails(trackMainNumber2);
}