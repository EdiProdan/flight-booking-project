import { useState } from 'react';

const AddTicket = ({ onAdd }) => {
   const [origin, setOrigin] = useState('');
   const [destination, setDestination] = useState('');
   const [date, setDate] = useState('');

   const onSubmit = (e) => {
      e.preventDefault();

      if (!origin) {
         alert('Please add origin');
         return;
      }

      onAdd({ origin, destination, date });

      setOrigin('');
      setDestination('');
      setDate('');
   };

   let Amadeus = require('amadeus');

   let amadeus = new Amadeus({
      clientId: 'GaF54jgsrNNVMC0R2jkPlUOqzIvLpX5Q',
      clientSecret: 'ZfGqiPJ8JsQ1oi4h',
   });
   amadeus.shopping.flightOffersSearch
      .get({
         originLocationCode: origin,
         destinationLocationCode: destination,
         departureDate: date,
         adults: '2',
      })
      .then(function (response) {
         console.log(response.data);
         console.log(response.data[0]['price']['total']);
      })
      .catch(function (responseError) {
         console.log(responseError.code);
      });

   return (
      <form className='add-form' onSubmit={onSubmit}>
         <div className='form-control'>
            <label>Origin</label>
            <input
               type='text'
               placeholder='Enter origin'
               value={origin}
               onChange={(e) => setOrigin(e.target.value)}
            />
         </div>
         <div className='form-control'>
            <label>Destination</label>
            <input
               type='text'
               placeholder='Enter destination'
               value={destination}
               onChange={(e) => setDestination(e.target.value)}
            />
         </div>
         <div className='form-control'>
            <label>Departure Date</label>
            <input
               type='date'
               placeholder='Pick your departure date'
               value={date}
               onChange={(e) => setDate(e.target.value)}
            />
         </div>

         <input
            type='submit'
            value='Save Reservation'
            className='btn btn-block'
         />
      </form>
   );
};

export default AddTicket;
