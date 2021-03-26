import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tickets from './components/Tickets';
import AddTicket from './components/AddTicket';
import About from './components/About';
import Navbar from './components/Navbar';
import Jumbotron from './components/Jumbotron';

function App() {
   const [showAddTicket, setShowAddTicket] = useState(false);
   const [tickets, setTickets] = useState([]);

   useEffect(() => {
      const getTickets = async () => {
         const ticketsFromServer = await fetchTickets();
         setTickets(ticketsFromServer);
      };
      getTickets();
   }, []);

   // Fetch Tasks
   const fetchTickets = async () => {
      const res = await fetch('http://localhost:5001/tickets');
      const data = await res.json();

      return data;
   };

   // Add Task
   const addTicket = async (ticket) => {
      const res = await fetch('http://localhost:5001/tickets', {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(ticket),
      });

      const data = await res.json();

      setTickets([...tickets, data]);
   };

   //  const addPrice = async (id ) =>{
   //    await fetch(`http://localhost:5001/tasks/${id}`, {
   //      method: 'POST',
   //      headers: {
   //        'Con'
   //      }
   //    })
   //  }

   // Delete Task
   const deleteTicket = async (id) => {
      await fetch(`http://localhost:5001/tickets/${id}`, {
         method: 'DELETE',
      });
      setTickets(tickets.filter((ticket) => ticket.id !== id));
   };

   return (
      <div className='main'>
         <Navbar />
         <Jumbotron />
         <Router>
            <div className='container'>
               <Header
                  onAdd={() => setShowAddTicket(!showAddTicket)}
                  showAdd={showAddTicket}
               />
               <Route
                  path='/'
                  exact
                  render={(props) => (
                     <>
                        {showAddTicket && <AddTicket onAdd={addTicket} />}
                        {tickets.length > 0 ? (
                           <Tickets tickets={tickets} onDelete={deleteTicket} />
                        ) : (
                           'No Tickets To Show'
                        )}
                     </>
                  )}
               />
               <Route path='/about' component={About} />
               <Footer />
            </div>
         </Router>
      </div>
   );
}

export default App;
