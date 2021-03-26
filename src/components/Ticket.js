import { FaTimes } from 'react-icons/fa';

const Ticket = ({ ticket, onDelete, onToggle }) => {
   return (
      <div
         className={`ticket ${ticket.reminder ? 'reminder' : ''}`}
         onDoubleClick={() => onToggle(ticket.id)}
      
       >
         <FaTimes
               style={{ color: 'red', cursor: 'pointer' }}
               onClick={() => onDelete(ticket.id)}
            />
            <p>From: {ticket.origin}</p>
            <p>To: {ticket.destination}</p>
            <p>Date: {ticket.date}</p>
           
         {/* <h3>
            {ticket.origin}
            <FaTimes
               style={{ color: 'red', cursor: 'pointer' }}
               onClick={() => onDelete(ticket.id)}
            />
         </h3>
         <p>{ticket.destination}</p> */}

      </div>
   );
};

export default Ticket;
