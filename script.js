document.getElementById('reservation-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        guests: document.getElementById('guests').value
    };

    try {
        const response = await fetch('http://localhost:5000/reserve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Reservation successful!');
            document.getElementById('reservation-form').reset();
        } else {
            alert('Failed to reserve a table.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
