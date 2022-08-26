const main = document.getElementById('main');
const details = document.getElementById('details-page');
const loader = document.getElementById('loader');
const msg = document.getElementById('msgBlock');

const hasMap = {
    'order placed': 'OP',
    'shipped': 'ITNS',
    'in transit': 'ITNS',
    'out for delivery': 'OFD',
    'delivered': 'D'
}

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
    msg.style.display = 'block';
    msg.innerHTML = '';
    msg.innerHTML = msg;

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
            const tracking_id = document.getElementById('trackingId');
            const merchant_name = document.getElementById('merchant');
            const prod_desc = document.getElementById('product_description');
            const rname = document.getElementById('rname');
            const edd_span = document.getElementById('edd');
            // const [tracking_id, merchant_name, prod_desc, rname, edd_span] = document.querySelectorAll('#trackingId, #merchant, #product_description, #rname, #edd');
            tracking_id.innerHTML = trackingId;
            merchant_name.innerHTML = merchant;
            prod_desc.innerHTML = product;
            rname.innerHTML = reciverName;
            edd_span.innerHTML = edd;
            console.log(edd_span, rname)
            console.log(trackingDetails);
            const trackingDetailsTable = document.getElementById('tracking_details_table');
            trackingDetailsTable.innerHTML = '';
            trackingDetails.reverse().forEach(detail => {
                if(detail.status.toLowerCase() && hasMap[detail.status.toLowerCase()]) {
                    const field = document.getElementById(hasMap[detail.status.toLowerCase()])
                    field.classList.remove('progtrckr-todo');
                    field.classList.add('progtrckr-done')
                }
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