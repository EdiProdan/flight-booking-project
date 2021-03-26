import Ticket from './Ticket';

const Tickets = ({ tickets, onDelete }) => {
   return (
      <>
         {tickets.map((ticket, index) => (
            <Ticket key={index} ticket={ticket} onDelete={onDelete} />
         ))}
      </>
   );
};

export default Tickets;
